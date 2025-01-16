import {create} from 'zustand';
import {MealType} from '../types/nutrition';
import {getMealType} from '../libs/meal';
import {useMemo} from 'react';
import {UserSettings} from '../constants/settings';
import {RecentSearches} from '../screens/SearchScreen/components/RecentSearches';
import {queryIsValid} from '../libs/products';

export type RecentSearch = {
  search: string;
  date: Date;
  mealType: MealType;
};

type RecentSearchesState = {
  recentSearches: RecentSearch[];
  addRecentSearch: (search: string) => void;
  init: () => Promise<void>;
};

const _limit = 4;

const useRecentSearchesStore = create<RecentSearchesState>()(set => ({
  recentSearches: [],
  addRecentSearch: (search: string) => {
    if (!queryIsValid(search)) return;
    const mealType = getMealType(new Date());
    set(state => {
      if (
        state.recentSearches.find(
          recentSearch =>
            recentSearch.search === search && recentSearch.mealType == mealType,
        )
      ) {
        return state;
      }
      const newState = {
        recentSearches: [
          ...state.recentSearches,
          {search, mealType, date: new Date()},
        ],
      };
      newState.recentSearches.sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      );
      UserSettings.setRecentSearches(newState.recentSearches);
      return newState;
    });
  },
  init: async () => {
    const recentSearches = await UserSettings.getRecentSearches();
    set({recentSearches});
  },
}));

export const useRecentSearchesDispatcher = () => {
  const {addRecentSearch, init} = useRecentSearchesStore(state => state);
  return {addRecentSearch, init};
};

export const useRecentSearchesSelector = () => {
  const mealType = getMealType(new Date());
  const searches = useRecentSearchesStore(state => state.recentSearches);
  const recentSearhes = useMemo(
    () =>
      searches
        .filter(recentSearch => recentSearch.mealType == mealType)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .limit(1),
    [searches, mealType],
  );
  return {
    recentSearches: recentSearhes,
  };
};
