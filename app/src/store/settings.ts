import {create} from 'zustand';
import {UserSettings} from '../constants/settings';
import {UserSettingsProps} from '../types/settings';
import {useUserAuthentication} from './authentication';

export const useUserSettings = create<UserSettingsType>()(set => ({
  theme: 'light',
  language: 'en',
  introduction: true,
  init: async () => {
    const theme = await UserSettings.getTheme();
    const language = await UserSettings.getLanguage();
    const introduction = await UserSettings.getIntroduction();
    set({theme, language, introduction});
  },
  setTheme: async (theme: UserSettingsProps['theme']) => {
    await UserSettings.setTheme(theme);
    set({theme});
  },
  setLanguage: async (language: UserSettingsProps['language']) => {
    await UserSettings.setLanguage(language);
    set({language});
  },
  setIntroduction: async (introduction: boolean) => {
    await UserSettings.setIntroduction(introduction);
    set({introduction});
  },
}));

type UserSettingsType = {
  init: () => Promise<void>;
  setTheme: (theme: UserSettingsProps['theme']) => Promise<void>;
  setLanguage: (language: UserSettingsProps['language']) => Promise<void>;
  setIntroduction: (introduction: boolean) => Promise<void>;
} & UserSettingsProps & {
    introduction: boolean;
  };

export const getLanguageName = () => {
  const language = useUserSettings.getState().language;
  switch (language) {
    case 'en':
      return 'English';
    case 'el':
      return 'Ελληνικά';
    default:
      return 'English';
  }
};
