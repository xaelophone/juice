'use client';

import { useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';
import { GameplanChatMessage, GameplanContent, GameplanRecord } from '@/types';

export type GameplanStatus = 'idle' | 'generating';

interface StoredGameplanState {
  plan: GameplanRecord | null;
  chatHistory: GameplanChatMessage[];
  status?: GameplanStatus;
}

interface ReplacePlanOptions {
  model?: string;
  keepChat?: boolean;
  preserveIdentity?: boolean;
}

const STORAGE_KEY = 'juice-gameplan-v1';
const DEFAULT_GAMEPLAN_MODEL = 'gpt-5';

const INITIAL_STATE: StoredGameplanState = {
  plan: null,
  chatHistory: [],
  status: 'idle'
};

function createId(prefix: string) {
  const random = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${random}`;
}

export function useGameplan() {
  const [state, setState] = useLocalStorage<StoredGameplanState>(STORAGE_KEY, INITIAL_STATE);

  const replacePlan = (content: GameplanContent, options: ReplacePlanOptions = {}) => {
    const timestamp = new Date().toISOString();

    setState(prev => {
      const nextId = options.preserveIdentity && prev.plan ? prev.plan.id : createId('gameplan');
      const model = options.model ?? prev.plan?.model ?? DEFAULT_GAMEPLAN_MODEL;

      return {
        plan: {
          ...content,
          id: nextId,
          generatedAt: timestamp,
          model
        },
        chatHistory: options.keepChat ? prev.chatHistory : [],
        status: 'idle'
      };
    });
  };

  const clearPlan = () => setState(INITIAL_STATE);

  const appendMessage = (message: Omit<GameplanChatMessage, 'id' | 'timestamp'> & Partial<Pick<GameplanChatMessage, 'timestamp'>>) => {
    const timestamp = message.timestamp ?? new Date().toISOString();

    setState(prev => ({
      ...prev,
      status: prev.status ?? 'idle',
      chatHistory: [
        ...prev.chatHistory,
        {
          ...message,
          role: message.role,
          content: message.content,
          id: createId('msg'),
          timestamp
        }
      ]
    }));
  };

  const clearChat = () =>
    setState(prev => ({
      ...prev,
      status: prev.status ?? 'idle',
      chatHistory: []
    }));

  const setChatHistory = (messages: GameplanChatMessage[]) =>
    setState(prev => ({
      ...prev,
      status: prev.status ?? 'idle',
      chatHistory: messages
    }));

  const hasPlan = useMemo(() => Boolean(state.plan), [state.plan]);

  const setStatus = (nextStatus: GameplanStatus) =>
    setState(prev => ({
      ...prev,
      status: nextStatus
    }));

  const status = state.status ?? 'idle';

  return {
    plan: state.plan ?? undefined,
    chatHistory: state.chatHistory,
    hasPlan,
    status,
    replacePlan,
    clearPlan,
    appendMessage,
    clearChat,
    setChatHistory,
    setStatus
  };
}
