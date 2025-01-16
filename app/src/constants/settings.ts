import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserSettingsProps} from '../types/settings';
import {RecentSearch} from '../store/recent_searches';
import {setNutritionPresets} from '../network/user';

type Keys = keyof UserSettingsProps;

type Values = UserSettingsProps[Keys] | null;

const _CUSTOM_KEYS = {
  servingSize: 'serving_size_',
  recentSearches: 'recent_searches',
  nutritionPresets: 'nutrition_presets',
  introduction: 'introduction',
  latestUser: 'latest_user',
};

export class UserSettings {
  static async get(key: Keys): Promise<Values> {
    return (await AsyncStorage.getItem(key)) as Values;
  }

  static async set(key: Keys, value: UserSettingsProps[Keys]): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  static async setServingSize(servingSize: number, code: number) {
    AsyncStorage.setItem(
      `${_CUSTOM_KEYS['servingSize']}${code}`,
      `${servingSize}`,
    );
  }

  static async setTheme(theme: UserSettingsProps['theme']) {
    UserSettings.set('theme', theme);
  }

  static async setLanguage(language: UserSettingsProps['language']) {
    UserSettings.set('language', language);
  }

  static async setIntroduction(intro: boolean) {
    await AsyncStorage.setItem(
      _CUSTOM_KEYS.introduction,
      JSON.stringify(intro),
    );
  }

  static async setRecentSearches(recentSearches: RecentSearch[]) {
    await AsyncStorage.setItem(
      _CUSTOM_KEYS.recentSearches,
      JSON.stringify(recentSearches),
    );
  }

  static async getRecentSearches(): Promise<RecentSearch[]> {
    const recentSearchesString = await AsyncStorage.getItem(
      _CUSTOM_KEYS.recentSearches,
    );
    if (recentSearchesString) {
      const recentSearchesArray = JSON.parse(recentSearchesString);
      return recentSearchesArray.map((recentSearch: any) => {
        return {
          ...recentSearch,
          date: new Date(recentSearch.date),
        };
      });
    }
    return [];
  }

  static async getServingSize(code: number) {
    const size = await AsyncStorage.getItem(
      `${_CUSTOM_KEYS['servingSize']}${code}`,
    );
    if (size) return parseFloat(size);
    return undefined;
  }
  static async getTheme(): Promise<UserSettingsProps['theme']> {
    return (await UserSettings.get('theme')) as UserSettingsProps['theme'];
  }

  static async getLanguage(): Promise<UserSettingsProps['language']> {
    return (await UserSettings.get(
      'language',
    )) as UserSettingsProps['language'];
  }

  static async getIntroduction() {
    const intro = await AsyncStorage.getItem(_CUSTOM_KEYS.introduction);
    if (intro) {
      return JSON.parse(intro) as boolean;
    }
    return true;
  }
}
