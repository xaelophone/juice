import { NextResponse } from 'next/server';
import { adviseOnGameplan } from '@/lib/openai';
import { GameplanContent } from '@/types';

interface AdvisorRequest {
  quarter: string;
  currentPlan: GameplanContent;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  message: string;
}

export async function POST(request: Request) {
  let body: AdvisorRequest;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const { quarter, currentPlan, history = [], message } = body ?? {};

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'A user message is required' }, { status: 400 });
  }

  if (!currentPlan) {
    return NextResponse.json({ error: 'Gameplan context is required' }, { status: 400 });
  }

  try {
    const result = await adviseOnGameplan({
      quarter,
      currentPlan,
      history,
      latestUserMessage: message
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to run gameplan advisor', error);
    return NextResponse.json({ error: 'Unable to update gameplan right now' }, { status: 500 });
  }
}
