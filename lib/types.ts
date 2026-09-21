export type Role = 'admin' | 'trainer' | 'member';

export type MembershipTier = 'base' | 'pro' | 'elite';

export type FitnessGoal = 'muscle_building' | 'fat_loss' | 'strength' | 'endurance';

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  memberId: string; // e.g. "TF-2026-425"
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone: string;
  age: number;
  gender: string;
  tier: MembershipTier;
  goal: FitnessGoal;
  fitnessLevel: FitnessLevel;
  targetWeightKg?: number;
  currentWeightKg?: number;
  joinDate: string;
  expiryDate: string;
  ptSessionsTotal: number;
  ptSessionsRemaining: number;
  guestPassesTotal: number;
  guestPassesRemaining: number;
  assignedTrainerId?: string;
  assignedTrainerName?: string;
  isCheckedIn: boolean;
  lastCheckIn?: string;
  streakDays: number;
  password?: string;
}

export interface GymClass {
  id: string;
  title: string;
  category: 'HIIT' | 'Strength' | 'Recovery' | 'Yoga' | 'CrossFit' | 'Cardio';
  description: string;
  trainerId: string;
  trainerName: string;
  time: string; // e.g. "07:30 AM"
  days: string[]; // e.g. ["Mon", "Wed", "Fri"]
  durationMinutes: number;
  room: string;
  capacity: number;
  enrolledUserIds: string[];
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  tier: MembershipTier;
  timestamp: string;
  type: 'check_in' | 'check_out';
  status: 'granted' | 'denied';
  reason?: string;
}

export interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  targetMuscle: string;
  tips: string;
}

export interface DailyWorkout {
  day: string;
  title: string;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface GoalRecommendation {
  goal: FitnessGoal;
  title: string;
  tagline: string;
  summary: string;
  macroRatio: {
    protein: string;
    carbs: string;
    fats: string;
  };
  caloriesTarget: string;
  hydrationTarget: string;
  weeklySplit: DailyWorkout[];
  nutritionTips: string[];
  recommendedSupplements: string[];
}
