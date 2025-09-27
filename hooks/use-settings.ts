'use client';

import { useLocalStorage } from './use-local-storage';

export interface JuiceSettings {
  currency: 'USD' | 'CAD' | 'GBP';
  fastInputMode: boolean;
}

const DEFAULT_SETTINGS: JuiceSettings = {
  currency: 'USD',
  fastInputMode: true
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<JuiceSettings>('juice-settings-v1', DEFAULT_SETTINGS);

  const updateSetting = <Key extends keyof JuiceSettings>(key: Key, value: JuiceSettings[Key]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
}
