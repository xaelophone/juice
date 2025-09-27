import OpenAI from 'openai';

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getPerkSummary(prompt: string) {
  const response = await openai.responses.create({
    model: 'gpt-5.0-mini',
    input: prompt
  });

  const [message] = response.output_text ? [response.output_text] : [];
  return message ?? '';
}
