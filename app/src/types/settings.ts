export type UserSettingsProps = {
  theme: 'light' | 'dark';
  language: 'en' | 'el';
};

export type UserPresets = {
  daily_calories: number;
  age: number;
  height: number;
  weight: number;
  activity_level: number;
  sex: 'male' | 'female';
};

export type ProgramType =
  | 'Maintenance'
  | 'Cutting'
  | 'Mass-Gain'
  | 'Weight-Loss';

export type Programs = {
  [key in ProgramType]: {
    title: string;
    description: string;
    caloricPercentage: number;
    calories: number;
    carbsPercentage: number;
    carbsKcal: number;
    fatsPercentage: number;
    fatsKcal: number;
    proteinPerKg: number;
    proteinGrams: number;
    program: ProgramType;
  };
};

export type Program = {
  program: ProgramType;
  startDate: Date;
  endDate?: Date;
};

export type ProgramFull = Programs[ProgramType] & Program;
