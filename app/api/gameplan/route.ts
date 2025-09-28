import { NextResponse } from 'next/server';
import { generateGameplan } from '@/lib/openai';
import { GameplanPayloadCard } from '@/types';

interface GenerateGameplanRequest {
  quarter: string;
  cards: GameplanPayloadCard[];
  userGoals?: string;
}

export async function POST(request: Request) {
  let body: GenerateGameplanRequest;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const { quarter, cards, userGoals } = body ?? {};

  if (!quarter || typeof quarter !== 'string') {
    return NextResponse.json({ error: 'Quarter is required' }, { status: 400 });
  }

  if (!Array.isArray(cards) || cards.length === 0) {
    return NextResponse.json({ error: 'At least one card is required to build a gameplan' }, { status: 400 });
  }

  try {
    const plan = await generateGameplan({ quarter, cards, userGoals });
    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Failed to generate gameplan', error);
    return NextResponse.json({ error: 'Unable to generate gameplan right now' }, { status: 500 });
  }
}
