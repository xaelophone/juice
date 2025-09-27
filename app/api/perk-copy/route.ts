import { NextResponse } from 'next/server';
import { getPerkSummary } from '@/lib/openai';

export async function POST(request: Request) {
  const body = await request.json();
  const prompt: string = body?.prompt ?? '';

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    const copy = await getPerkSummary(prompt);
    return NextResponse.json({ copy });
  } catch (error) {
    console.error('Failed to generate perk copy', error);
    return NextResponse.json({ error: 'Unable to generate perk copy' }, { status: 500 });
  }
}
