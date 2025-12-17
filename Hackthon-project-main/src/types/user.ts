// frontend/src/types/user.ts

export type UserPreferences = {
  level: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  aiExperience: 'none' | 'basic' | 'intermediate' | 'advanced';
  hardwareKnowledge: 'basic' | 'intermediate' | 'advanced';
};

export type User = {
  userId: string; // UUID
  email: string;
  name: string;
  preferences: UserPreferences;
};

export type SignupData = {
  email: string;
  password: string;
  name: string;
  preferences: UserPreferences;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthSuccessResponse = {
  message: string;
  token: string;
  user: User;
};

export type ErrorResponse = {
  detail: string;
};