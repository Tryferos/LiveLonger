import Network from '.';
import {API_ROUTES} from '../constants/network';
import {
  Programs,
  ProgramFull,
  UserPresets,
  ProgramType,
  Program,
} from '../types/settings';

export const getNutritionPresets = async () => {
  const presets = await Network.get<UserPresets>({
    url: API_ROUTES.USER.PRESETS,
  });
  return presets;
};

export const setNutritionPresets = async (
  presets: Omit<UserPresets, 'daily_calories'>,
) => {
  const res = await Network.post<Required<UserPresets>>({
    url: API_ROUTES.USER.PRESETS,
    body: presets,
  });
  return res;
};

export const setProgram = async (
  program: ProgramType,
): Promise<Program | null> => {
  const res = await Network.post<Program>({
    body: {program: program},
    url: API_ROUTES.USER.PROGRAMS,
  });
  return res;
};

export const getAvailablePrograms = async () => {
  const res = await Network.get<{
    programs: Programs;
    selectedProgram: ProgramFull | null;
  }>({
    url: API_ROUTES.USER.PROGRAMS,
  });
  return res;
};

export const getSelectedProgramByDate = async ({date}: {date: Date}) => {
  const res = await Network.get<{
    program: ProgramFull | null;
  }>({
    url: API_ROUTES.USER.SELECTED_PROGRAM,
    params: {date: date.getTime()},
  });
  return res;
};
