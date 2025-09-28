import {
  GameplanContent,
  GameplanPayloadCard,
  GameplanTask,
  GameplanTaskPriority
} from '@/types';

const DEFAULT_MODEL = 'gpt-5';
const GAMEPLAN_PRIORITY_VALUES = ['high', 'medium', 'low'] as const satisfies ReadonlyArray<GameplanTaskPriority>;

const OPENAI_API_URL = `${process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1'}/responses`;
const RESPONSES_BETA_HEADER = process.env.OPENAI_RESPONSES_BETA ?? 'responses-2024-05-01';

async function callResponsesAPI(payload: Record<string, unknown>) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'OpenAI-Beta': RESPONSES_BETA_HEADER
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message ?? 'OpenAI Responses API request failed';
    throw new Error(message);
  }

  return data as {
    output?: Array<{
      role?: string;
      content?: Array<{
        type?: string;
        text?: string;
        [key: string]: unknown;
      }>;
    }>;
    output_text?: string[] | string;
  };
}

function extractTextContent(payload: Awaited<ReturnType<typeof callResponsesAPI>>) {
  if (!payload) {
    return '';
  }

  if (Array.isArray(payload.output_text)) {
    return payload.output_text.join('\n');
  }

  if (typeof payload.output_text === 'string') {
    return payload.output_text;
  }

  const textChunks: string[] = [];

  if (Array.isArray(payload.output)) {
    for (const item of payload.output) {
      if (!Array.isArray(item?.content)) continue;
      for (const block of item.content) {
        if (typeof block?.text === 'string') {
          textChunks.push(block.text);
        }
      }
    }
  }

  return textChunks.join('\n');
}

const GAMEPLAN_TASK_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    priority: { type: 'string', enum: GAMEPLAN_PRIORITY_VALUES },
    cardId: { type: ['string', 'null'] },
    perkId: { type: ['string', 'null'] },
    dueBy: { type: ['string', 'null'] },
    expectedValue: { type: ['number', 'null'] }
  },
  required: ['id', 'title', 'description', 'priority', 'cardId', 'perkId', 'dueBy', 'expectedValue']
};

const GAMEPLAN_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    quarter: { type: 'string' },
    tasks: {
      type: 'array',
      items: GAMEPLAN_TASK_SCHEMA,
      minItems: 3
    }
  },
  required: ['summary', 'quarter', 'tasks']
} as const;

const GAMEPLAN_CHAT_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    assistant_message: { type: 'string' },
    updated_plan: {
      type: 'object',
      additionalProperties: false,
      properties: {
        summary: { type: 'string' },
        quarter: { type: 'string' },
        tasks: {
          type: 'array',
          items: GAMEPLAN_TASK_SCHEMA
        }
      },
      required: ['summary', 'quarter', 'tasks']
    }
  },
  required: ['assistant_message']
} as const;

export async function getPerkSummary(prompt: string) {
  const response = await callResponsesAPI({
    model: DEFAULT_MODEL,
    input: `You are a concise copywriter. Summarize the following perk for the Juice app in 2 sentences or fewer.\n\nPerk details:\n${prompt}`
  });

  return extractTextContent(response);
}

function parseJson<T>(payload: string, fallbackMessage: string): T {
  try {
    return JSON.parse(payload) as T;
  } catch (error) {
    console.warn(fallbackMessage, error);
    throw new Error('Failed to parse AI response.');
  }
}

export async function generateGameplan(options: {
  quarter: string;
  cards: GameplanPayloadCard[];
  userGoals?: string;
}) {
  const { quarter, cards, userGoals } = options;

  const planContext = JSON.stringify({ quarter, userGoals, cards }, null, 2);

  const prompt = [
    'You are the Juice AI strategist. Build a quarterly action plan that helps a cardholder maximize every benefit before it expires.',
    'Base your recommendations on the JSON data provided, prioritize high dollar perks, and keep tasks specific and time-bound.',
    'Return strictly valid JSON matching the provided schema. No markdown, no commentary, only JSON.',
    '',
    'Context JSON:',
    planContext
  ].join('\n');

  const response = await callResponsesAPI({
    model: DEFAULT_MODEL,
    input: prompt,
    text: {
      format: {
        type: 'json_schema',
        name: 'gameplan_response',
        schema: GAMEPLAN_RESPONSE_SCHEMA,
        strict: true
      }
    }
  });

  const payload = extractTextContent(response);
  const gameplan = parseJson<GameplanContent>(payload, 'Unable to parse gameplan JSON from OpenAI');

  const normalizedTasks: GameplanTask[] = gameplan.tasks.map(task => ({
    ...task,
    cardId: task.cardId ?? undefined,
    perkId: task.perkId ?? undefined,
    dueBy: task.dueBy ?? undefined,
    expectedValue: task.expectedValue ?? undefined
  }));

  return {
    ...gameplan,
    tasks: normalizedTasks
  } satisfies GameplanContent;
}

export async function adviseOnGameplan(options: {
  quarter?: string;
  currentPlan: GameplanContent;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  latestUserMessage: string;
}) {
  const { quarter, currentPlan, history, latestUserMessage } = options;
  const resolvedQuarter = quarter ?? currentPlan.quarter;
  const planJson = JSON.stringify({ quarter: resolvedQuarter, currentPlan }, null, 2);

  const historyTranscript = history
    .map(entry => `${entry.role.toUpperCase()}: ${entry.content}`)
    .join('\n');

  const prompt = [
    'You are the Juice AI Gameplan Advisor. You update quarterly action plans for credit card perks.',
    'Given the current plan JSON, adjust tasks, priorities, or add/remove items so the user captures the most value without inventing new perks.',
    'Respond with JSON following the schema. Include a natural-language assistant message summarizing the changes.',
    '',
    'Current plan JSON:',
    planJson,
    '',
    historyTranscript ? `Chat history so far:\n${historyTranscript}` : 'Chat history so far: (none yet)',
    '',
    `NEW USER MESSAGE: ${latestUserMessage}`
  ].join('\n');

  const response = await callResponsesAPI({
    model: DEFAULT_MODEL,
    input: prompt,
    text: {
      format: {
        type: 'json_schema',
        name: 'gameplan_chat_response',
        schema: GAMEPLAN_CHAT_RESPONSE_SCHEMA,
        strict: true
      }
    }
  });

  const payload = extractTextContent(response);
  const parsed = parseJson<{
    assistant_message: string;
    updated_plan?: GameplanContent;
  }>(payload, 'Unable to parse gameplan advisor response');

  const normalizedPlan = parsed.updated_plan
    ? {
        ...parsed.updated_plan,
        tasks: parsed.updated_plan.tasks.map(task => ({
          ...task,
          cardId: task.cardId ?? undefined,
          perkId: task.perkId ?? undefined,
          dueBy: task.dueBy ?? undefined,
          expectedValue: task.expectedValue ?? undefined
        }))
      }
    : undefined;

  return {
    assistantMessage: parsed.assistant_message,
    updatedPlan: normalizedPlan
  };
}
