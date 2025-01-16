import {create} from 'zustand';
import {MealType} from '../types/nutrition';
import {
  Program,
  ProgramFull,
  ProgramType,
  Programs,
  UserPresets,
} from '../types/settings';
import {
  getAvailablePrograms,
  getSelectedProgramByDate,
  setProgram,
} from '../network/user';
import {useMemo} from 'react';
import {useUserSettings} from './settings';
import {useNutritionPresets} from './nutrition_presets';

type SelectedProgramState = {
  program: Program | null;
  programs: Programs | null;
  //// selectedProgramByDate: ProgramFull | null;
  selectProgram: (program: ProgramType) => Promise<void>;
  //// getSelectedProgram: ({date}: {date: Date}) => Promise<ProgramFull | null>;
  init: () => Promise<void>;
};

export const useSelectedProgram = create<SelectedProgramState>()(set => ({
  program: null,
  programs: null,
  //// selectedProgramByDate: null,
  selectProgram: async (program: ProgramType) => {
    const res = await setProgram(program);
    set({program: res});
  },
  //// getSelectedProgram: async ({date}) => {
  ////   const program = (await getSelectedProgramByDate({date}))?.program ?? null;
  ////   set({selectedProgramByDate: program});
  ////   return program;
  //// },
  init: async () => {
    set({program: null, programs: null});
    const res = await getAvailablePrograms();
    if (res) {
      set({program: res.selectedProgram ?? null, programs: res.programs});
    } else {
      set({program: null, programs: null});
    }
  },
}));

export const getSelectedProgram = (): {
  selectedProgram: Programs[ProgramType] | null;
  extraCalories: number;
} => {
  const {program, programs} = useSelectedProgram();
  const {presets} = useNutritionPresets();
  return useMemo(() => {
    if (!programs) {
      return {selectedProgram: null, extraCalories: 0};
    } else {
      const key = Object.keys(programs ?? {}).find(
        key => programs[key as ProgramType].program === program?.program,
      );
      const selectedProgram = programs[key as ProgramType];
      const extraCalories =
        (selectedProgram?.calories ?? presets?.daily_calories ?? 0) -
        (presets?.daily_calories ?? 0);
      return {selectedProgram, extraCalories};
    }
  }, [program, programs]);
};
