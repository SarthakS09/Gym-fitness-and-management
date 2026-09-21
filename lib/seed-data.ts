import { User, GymClass, AttendanceRecord, GoalRecommendation } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    memberId: 'TF-ADM-001',
    name: 'System Administrator',
    email: 'admin@titaniumfitness.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98765 43210',
    age: 34,
    gender: 'Male',
    tier: 'elite',
    goal: 'strength',
    fitnessLevel: 'advanced',
    targetWeightKg: 82,
    currentWeightKg: 80,
    joinDate: '2025-01-10',
    expiryDate: '2027-01-10',
    ptSessionsTotal: 8,
    ptSessionsRemaining: 8,
    guestPassesTotal: 999,
    guestPassesRemaining: 999,
    assignedTrainerName: 'Head Trainer',
    isCheckedIn: false,
    streakDays: 45
  },
  {
    id: 'user-member-1',
    memberId: 'TF-2026-1001',
    name: 'Elite Member',
    email: 'elite@titaniumfitness.com',
    password: 'customer123',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 94150 01425',
    age: 24,
    gender: 'Male',
    tier: 'elite',
    goal: 'muscle_building',
    fitnessLevel: 'advanced',
    targetWeightKg: 78,
    currentWeightKg: 72,
    joinDate: '2026-01-15',
    expiryDate: '2027-01-15',
    ptSessionsTotal: 8,
    ptSessionsRemaining: 6,
    guestPassesTotal: 999,
    guestPassesRemaining: 999,
    assignedTrainerId: 'user-trainer-1',
    assignedTrainerName: 'Head Trainer',
    isCheckedIn: true,
    lastCheckIn: 'Today at 08:15 AM',
    streakDays: 14
  },
  {
    id: 'user-member-2',
    memberId: 'TF-2026-1002',
    name: 'Pro Member',
    email: 'pro@titaniumfitness.com',
    password: 'customer123',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    phone: '+91 94150 01417',
    age: 23,
    gender: 'Female',
    tier: 'pro',
    goal: 'fat_loss',
    fitnessLevel: 'intermediate',
    targetWeightKg: 58,
    currentWeightKg: 64,
    joinDate: '2026-02-01',
    expiryDate: '2026-08-01',
    ptSessionsTotal: 2,
    ptSessionsRemaining: 2,
    guestPassesTotal: 2,
    guestPassesRemaining: 2,
    assignedTrainerId: 'user-trainer-2',
    assignedTrainerName: 'Mobility Coach',
    isCheckedIn: false,
    lastCheckIn: 'Yesterday at 05:45 PM',
    streakDays: 9
  },
  {
    id: 'user-member-3',
    memberId: 'TF-2026-1003',
    name: 'Base Member',
    email: 'base@titaniumfitness.com',
    password: 'customer123',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+91 94150 01409',
    age: 22,
    gender: 'Male',
    tier: 'base',
    goal: 'strength',
    fitnessLevel: 'intermediate',
    targetWeightKg: 85,
    currentWeightKg: 79,
    joinDate: '2026-03-01',
    expiryDate: '2026-04-01',
    ptSessionsTotal: 0,
    ptSessionsRemaining: 0,
    guestPassesTotal: 0,
    guestPassesRemaining: 0,
    isCheckedIn: false,
    lastCheckIn: '2 days ago at 11:30 AM',
    streakDays: 5
  },
  {
    id: 'user-member-4',
    memberId: 'TF-2026-1004',
    name: 'Pro Customer 02',
    email: 'pro2@titaniumfitness.com',
    password: 'customer123',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    phone: '+91 94150 01408',
    age: 25,
    gender: 'Male',
    tier: 'pro',
    goal: 'endurance',
    fitnessLevel: 'advanced',
    targetWeightKg: 70,
    currentWeightKg: 71,
    joinDate: '2025-11-20',
    expiryDate: '2026-11-20',
    ptSessionsTotal: 2,
    ptSessionsRemaining: 1,
    guestPassesTotal: 2,
    guestPassesRemaining: 1,
    assignedTrainerId: 'user-trainer-1',
    assignedTrainerName: 'Head Trainer',
    isCheckedIn: true,
    lastCheckIn: 'Today at 09:10 AM',
    streakDays: 18
  },
  {
    id: 'user-trainer-1',
    memberId: 'TF-TRN-001',
    name: 'Head Trainer',
    email: 'trainer@titaniumfitness.com',
    password: 'trainer123',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98111 22334',
    age: 29,
    gender: 'Male',
    tier: 'elite',
    goal: 'strength',
    fitnessLevel: 'advanced',
    joinDate: '2024-06-01',
    expiryDate: '2030-01-01',
    ptSessionsTotal: 0,
    ptSessionsRemaining: 0,
    guestPassesTotal: 0,
    guestPassesRemaining: 0,
    isCheckedIn: true,
    streakDays: 120
  },
  {
    id: 'user-trainer-2',
    memberId: 'TF-TRN-002',
    name: 'Mobility Coach',
    email: 'coach@titaniumfitness.com',
    password: 'trainer123',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98222 33445',
    age: 27,
    gender: 'Female',
    tier: 'elite',
    goal: 'endurance',
    fitnessLevel: 'advanced',
    joinDate: '2024-09-01',
    expiryDate: '2030-01-01',
    ptSessionsTotal: 0,
    ptSessionsRemaining: 0,
    guestPassesTotal: 0,
    guestPassesRemaining: 0,
    isCheckedIn: false,
    streakDays: 95
  },
  {
    id: 'user-member-5',
    memberId: 'TF-2025-0812',
    name: 'Base Member 02',
    email: 'base2@titaniumfitness.com',
    password: 'customer123',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    phone: '+91 97654 32190',
    age: 26,
    gender: 'Male',
    tier: 'base',
    goal: 'muscle_building',
    fitnessLevel: 'beginner',
    targetWeightKg: 75,
    currentWeightKg: 68,
    joinDate: '2025-08-10',
    expiryDate: '2026-03-22', // Expiring soon!
    ptSessionsTotal: 0,
    ptSessionsRemaining: 0,
    guestPassesTotal: 0,
    guestPassesRemaining: 0,
    isCheckedIn: false,
    streakDays: 3
  },
  {
    id: 'user-member-6',
    memberId: 'TF-2025-0419',
    name: 'Expired Member',
    email: 'expired@titaniumfitness.com',
    password: 'customer123',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98321 65498',
    age: 24,
    gender: 'Female',
    tier: 'elite',
    goal: 'fat_loss',
    fitnessLevel: 'intermediate',
    targetWeightKg: 54,
    currentWeightKg: 61,
    joinDate: '2025-04-19',
    expiryDate: '2026-02-15', // EXPIRED!
    ptSessionsTotal: 8,
    ptSessionsRemaining: 0,
    guestPassesTotal: 999,
    guestPassesRemaining: 0,
    isCheckedIn: false,
    streakDays: 0
  }
];

export const INITIAL_CLASSES: GymClass[] = [
  {
    id: 'class-1',
    title: 'Titanium Power HIIT',
    category: 'HIIT',
    description: 'High-intensity interval conditioning designed to torch calories, boost VO2 max, and elevate athletic stamina.',
    trainerId: 'user-trainer-1',
    trainerName: 'Head Trainer',
    time: '06:30 AM',
    days: ['Mon', 'Wed', 'Fri'],
    durationMinutes: 45,
    room: 'Studio Alpha (Main Arena)',
    capacity: 15,
    enrolledUserIds: ['user-member-1', 'user-member-4']
  },
  {
    id: 'class-2',
    title: 'Olympic Barbell Club',
    category: 'Strength',
    description: 'Master compound powerlifting and Olympic lifts with strict velocity-based training and form optimization.',
    trainerId: 'user-trainer-1',
    trainerName: 'Head Trainer',
    time: '05:30 PM',
    days: ['Tue', 'Thu', 'Sat'],
    durationMinutes: 60,
    room: 'Iron Pit Arena',
    capacity: 10,
    enrolledUserIds: ['user-member-1', 'user-member-3']
  },
  {
    id: 'class-3',
    title: 'Sunrise Vinyasa & Core',
    category: 'Yoga',
    description: 'Dynamic breath-to-movement flow with deep fascia release, core stability, and nervous system down-regulation.',
    trainerId: 'user-trainer-2',
    trainerName: 'Mobility Coach',
    time: '07:30 AM',
    days: ['Mon', 'Wed', 'Sat'],
    durationMinutes: 50,
    room: 'Zen Studio (Level 2)',
    capacity: 20,
    enrolledUserIds: ['user-member-2']
  },
  {
    id: 'class-4',
    title: 'CrossFit MetCon Blitz',
    category: 'CrossFit',
    description: 'Heavy kettlebell complexes, assault bike sprints, and gymnastic pull-ups in an all-out metabolic race.',
    trainerId: 'user-trainer-1',
    trainerName: 'Head Trainer',
    time: '07:00 PM',
    days: ['Mon', 'Thu'],
    durationMinutes: 55,
    room: 'Turf & Rig Arena',
    capacity: 12,
    enrolledUserIds: ['user-member-4']
  },
  {
    id: 'class-5',
    title: 'Zone 2 Endurance & Spin',
    category: 'Cardio',
    description: 'Precision heart-rate zone training for mitochondrial biogenesis, lactate threshold tuning, and fat oxidation.',
    trainerId: 'user-trainer-2',
    trainerName: 'Mobility Coach',
    time: '06:00 PM',
    days: ['Tue', 'Fri'],
    durationMinutes: 45,
    room: 'Spin Theater',
    capacity: 16,
    enrolledUserIds: ['user-member-2', 'user-member-4']
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    userId: 'user-member-1',
    userName: 'Elite Member',
    tier: 'elite',
    timestamp: '2026-09-19 08:15 AM',
    type: 'check_in',
    status: 'granted'
  },
  {
    id: 'att-2',
    userId: 'user-member-4',
    userName: 'Pro Customer 02',
    tier: 'pro',
    timestamp: '2026-09-19 09:10 AM',
    type: 'check_in',
    status: 'granted'
  },
  {
    id: 'att-3',
    userId: 'user-member-3',
    userName: 'Base Member',
    tier: 'base',
    timestamp: '2026-09-18 11:30 AM',
    type: 'check_in',
    status: 'granted'
  },
  {
    id: 'att-4',
    userId: 'user-member-3',
    userName: 'Base Member',
    tier: 'base',
    timestamp: '2026-09-18 06:45 PM',
    type: 'check_in',
    status: 'denied',
    reason: 'Off-Peak Tier Violation: Check-in attempted at 6:45 PM. Base tier valid only 9:00 AM - 4:00 PM.'
  },
  {
    id: 'att-5',
    userId: 'user-member-2',
    userName: 'Pro Member',
    tier: 'pro',
    timestamp: '2026-09-18 05:45 PM',
    type: 'check_in',
    status: 'granted'
  },
  {
    id: 'att-6',
    userId: 'user-member-6',
    userName: 'Expired Member',
    tier: 'elite',
    timestamp: '2026-09-17 07:00 PM',
    type: 'check_in',
    status: 'denied',
    reason: 'Membership Expired: Renewal required to enter facility.'
  }
];

export const GOAL_RECOMMENDATIONS: Record<string, GoalRecommendation> = {
  muscle_building: {
    goal: 'muscle_building',
    title: 'Titanium Hypertrophy Protocol (PPL Split)',
    tagline: 'Maximize Mechanical Tension & Myofibrillar Hypertrophy',
    summary: 'A 5-day periodized resistance training regimen engineered for continuous progressive overload, maximizing metabolic stress, and stimulating myofibrillar hypertrophy with optimal recovery.',
    macroRatio: {
      protein: '35% (2.0g - 2.2g per kg bodyweight)',
      carbs: '45% (Complex slow-digesting fuel)',
      fats: '20% (Healthy essential fats & hormone synthesis)'
    },
    caloriesTarget: 'Slight surplus of +300 to +450 kcal above TDEE',
    hydrationTarget: '3.8 Litres daily (1L during session with electrolytes)',
    nutritionTips: [
      'Consume 30-40g high-bioavailability protein within 90 minutes post-workout.',
      'Prioritize complex carbs (oats, brown rice, sweet potato) 2 hours before training.',
      'Maintain consistent sleep of 7.5 - 8.5 hours for anabolic hormone release (HGH & Testosterone).',
      'Distribute protein evenly across 4-5 feedings every 3-4 hours.'
    ],
    recommendedSupplements: [
      'Creatine Monohydrate (5g daily)',
      'Whey Protein Isolate',
      'L-Citrulline Malate (pre-workout vasodilation)',
      'Zinc + Magnesium (ZMA for deep recovery)'
    ],
    weeklySplit: [
      {
        day: 'Monday',
        title: 'Push Day (Chest, Shoulders, Triceps)',
        focus: 'Heavy Horizontal Pressing & Overhead Deltoids',
        exercises: [
          { name: 'Barbell Incline Bench Press', sets: '4 sets', reps: '6-8 reps', rest: '2.5 mins', targetMuscle: 'Upper Pectorals', tips: 'Lower to clavicle with a controlled 3-second eccentric.' },
          { name: 'Dumbbell Flat Bench Press', sets: '3 sets', reps: '8-10 reps', rest: '2 mins', targetMuscle: 'Mid Pectorals', tips: 'Squeeze pecs at peak contraction; avoid flaring elbows 90 degrees.' },
          { name: 'Standing Overhead Barbell Press', sets: '4 sets', reps: '6-8 reps', rest: '2 mins', targetMuscle: 'Anterior Deltoids', tips: 'Brace core and lock glutes throughout drive.' },
          { name: 'Cable Lateral Raises (Behind Back)', sets: '4 sets', reps: '12-15 reps', rest: '90 secs', targetMuscle: 'Lateral Deltoids', tips: 'Constant cable tension at bottom of movement.' },
          { name: 'Overhead Rope Tricep Extension', sets: '3 sets', reps: '10-12 reps', rest: '90 secs', targetMuscle: 'Long Head Triceps', tips: 'Full elbow flexion for maximum stretch.' }
        ]
      },
      {
        day: 'Tuesday',
        title: 'Pull Day (Back, Rear Delts, Biceps)',
        focus: 'Vertical Lat Width & Heavy Horizontal Thickness',
        exercises: [
          { name: 'Weighted Neutral-Grip Pull-Ups', sets: '4 sets', reps: '6-8 reps', rest: '2.5 mins', targetMuscle: 'Latissimus Dorsi', tips: 'Drive elbows down into back pockets.' },
          { name: 'Chest-Supported T-Bar Row', sets: '4 sets', reps: '8-10 reps', rest: '2 mins', targetMuscle: 'Rhomboids & Mid Traps', tips: 'Pause 1 second at full scapular retraction.' },
          { name: 'Seated Cable Lat Pulldown', sets: '3 sets', reps: '10-12 reps', rest: '90 secs', targetMuscle: 'Upper/Lower Lats', tips: 'Avoid swinging torso backward.' },
          { name: 'Face Pulls with External Rotation', sets: '4 sets', reps: '15 reps', rest: '75 secs', targetMuscle: 'Rear Delts & Rotator Cuff', tips: 'Pull rope toward eyes and separate hands.' },
          { name: 'Incline Dumbbell Bicep Curls', sets: '3 sets', reps: '10-12 reps', rest: '90 secs', targetMuscle: 'Biceps Brachii', tips: 'Full supination and deep stretch at bottom.' }
        ]
      },
      {
        day: 'Wednesday',
        title: 'Legs & Calves (Quad Dominant)',
        focus: 'Knee Flexion & Posterior Chain Foundation',
        exercises: [
          { name: 'Barbell Back Squat', sets: '4 sets', reps: '6-8 reps', rest: '3 mins', targetMuscle: 'Quadriceps & Glutes', tips: 'Hit parallel depth with knees tracking over toes.' },
          { name: 'Romanian Deadlift (Dumbbell)', sets: '4 sets', reps: '8-10 reps', rest: '2 mins', targetMuscle: 'Hamstrings & Glutes', tips: 'Hinge back at hips while keeping shins vertical.' },
          { name: 'Leg Press (Close Stance)', sets: '3 sets', reps: '12-15 reps', rest: '90 secs', targetMuscle: 'Vastus Lateralis', tips: 'Smooth cadence; no lockout pause at the top.' },
          { name: 'Lying Hamstring Leg Curls', sets: '3 sets', reps: '10-12 reps', rest: '75 secs', targetMuscle: 'Hamstring Semitendinosus', tips: 'Keep hips pressed firmly into pad.' },
          { name: 'Standing Calf Raises', sets: '4 sets', reps: '15-20 reps', rest: '60 secs', targetMuscle: 'Gastrocnemius', tips: 'Full 2-second hold at top stretch.' }
        ]
      },
      {
        day: 'Thursday',
        title: 'Active Recovery & Core Mobility',
        focus: 'Fascial Decompression & Aerobic Flush',
        exercises: [
          { name: 'Cryotherapy / Sauna Contrast Bath', sets: '3 rounds', reps: '15 mins', rest: '5 mins', targetMuscle: 'Systemic Recovery', tips: 'Available in Titanium Elite Lounge.' },
          { name: 'Thoracic Spine Foam Rolling & Stretches', sets: '1 set', reps: '20 mins', rest: 'None', targetMuscle: 'Mobility', tips: 'Focus on diaphragmatic breathing.' }
        ]
      },
      {
        day: 'Friday',
        title: 'Upper Body Power & Pump',
        focus: 'Hypertrophy Density & Symmetry',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: '4 sets', reps: '8-10 reps', rest: '2 mins', targetMuscle: 'Upper Chest', tips: '30-degree bench angle.' },
          { name: 'Meadows Single-Arm Landmine Row', sets: '3 sets', reps: '10-12 reps', rest: '90 secs', targetMuscle: 'Lat Insertion', tips: 'Full elbow elevation.' },
          { name: 'Dumbbell Hammer Curls Supersetted with Dips', sets: '3 sets', reps: '12 reps', rest: '90 secs', targetMuscle: 'Brachialis & Triceps', tips: 'High blood volume density pump.' }
        ]
      }
    ]
  },
  fat_loss: {
    goal: 'fat_loss',
    title: 'Titanium MetCon Shred Protocol',
    tagline: 'High EPOC Caloric Burn & Lean Muscle Preservation',
    summary: 'A fast-paced circuit and density-based protocol maximizing excess post-exercise oxygen consumption (EPOC), keeping heart rate in optimal metabolic zones while preserving lean muscle mass.',
    macroRatio: {
      protein: '40% (2.2g per kg bodyweight to preserve muscle mass)',
      carbs: '30% (High fiber, low glycemic index)',
      fats: '30% (Omega-3s, avocado, olive oil)'
    },
    caloriesTarget: 'Controlled deficit of -400 to -500 kcal below maintenance',
    hydrationTarget: '4.0 Litres daily (crucial for fatty acid oxidation and metabolic rate)',
    nutritionTips: [
      'Maintain minimum 30g dietary fiber daily for satiety and blood sugar stabilization.',
      'Stop eating 2.5 hours before sleep to optimize nocturnal lipolysis.',
      'Aim for 10,000 to 12,000 daily non-exercise physical activity (NEAT) steps.',
      'Use green tea catechins or black coffee 30 mins prior to HIIT sessions.'
    ],
    recommendedSupplements: [
      'L-Carnitine L-Tartrate (fatty acid mitochondrial shuttle)',
      'Whey Protein Isolate (low carb / low fat)',
      'Electrolyte Tablets (sodium, potassium, magnesium)',
      'Omega-3 EPA/DHA Fish Oils'
    ],
    weeklySplit: [
      {
        day: 'Monday',
        title: 'Full Body Density Circuit A',
        focus: 'Compound Lifts with Short Rest & Cardio Bursts',
        exercises: [
          { name: 'Trap Bar Deadlift to Box Jump', sets: '4 sets', reps: '8 reps + 5 jumps', rest: '60 secs', targetMuscle: 'Full Body Posterior', tips: 'Explosive hip extension into soft box landing.' },
          { name: 'Dumbbell Push Press', sets: '4 sets', reps: '10-12 reps', rest: '60 secs', targetMuscle: 'Shoulders & Legs', tips: 'Use leg drive to propel dumbbells upward.' },
          { name: 'Kettlebell Swings (Hardstyle)', sets: '4 sets', reps: '20 reps', rest: '45 secs', targetMuscle: 'Glutes & Hamstrings', tips: 'Snap hips forward forcefully; do not squat the bell.' },
          { name: 'Assault Air Bike Sprints', sets: '5 rounds', reps: '20s max / 40s easy', rest: 'None', targetMuscle: 'Metabolic Conditioning', tips: 'Aim for 60+ RPM during work intervals.' }
        ]
      },
      {
        day: 'Tuesday',
        title: 'HIIT Conditioning & Core Torching',
        focus: 'Lactate Threshold & Abdominal Wall Rigidity',
        exercises: [
          { name: 'Battle Ropes Alternating Waves', sets: '4 sets', reps: '30 secs', rest: '45 secs', targetMuscle: 'Shoulders & Core', tips: 'Stay in athletic quarter squat.' },
          { name: 'Hanging Leg Raises', sets: '3 sets', reps: '12-15 reps', rest: '60 secs', targetMuscle: 'Lower Rectus Abdominis', tips: 'Curl pelvis up rather than swinging legs.' },
          { name: 'Rowing Machine 500m Repeats', sets: '4 rounds', reps: '500m under 1:45', rest: '90 secs', targetMuscle: 'Full Body Cardio', tips: 'Drive hard through heels before pulling handle to sternum.' }
        ]
      },
      {
        day: 'Wednesday',
        title: 'Upper Body Metabolic Strength',
        focus: 'Hypertrophy with Peripheral Heart Action (PHA)',
        exercises: [
          { name: 'Incline Dumbbell Bench Press', sets: '4 sets', reps: '10-12 reps', rest: '60 secs', targetMuscle: 'Chest & Triceps', tips: 'Controlled cadence.' },
          { name: 'Chest-Supported Row', sets: '4 sets', reps: '10-12 reps', rest: '60 secs', targetMuscle: 'Upper Back', tips: 'Hold contraction.' },
          { name: 'SkiErg Intervals', sets: '5 sets', reps: '150m sprint', rest: '60 secs', targetMuscle: 'Lats & Core Cardiorespiratory', tips: 'Hinge and crunch down on handles.' }
        ]
      },
      {
        day: 'Thursday',
        title: 'Zone 2 Steady State & Recovery Flow',
        focus: 'Fat Oxidation Peak & Lactate Clearance',
        exercises: [
          { name: 'Incline Treadmill Walk (12% grade, 4.8 km/h)', sets: '1 set', reps: '45 mins', rest: 'None', targetMuscle: 'Mitochondrial Fat Burn', tips: 'Heart rate strictly between 120-135 BPM.' },
          { name: 'Sauna Sweat & Hydrotherapy', sets: '1 round', reps: '20 mins', rest: 'None', targetMuscle: 'Circulation & Toxins', tips: 'Hydrate continuously with mineralized water.' }
        ]
      },
      {
        day: 'Friday',
        title: 'Lower Body Sculpt & Sled Pushes',
        focus: 'Glutes, Quads & High Energy Output',
        exercises: [
          { name: 'Goblet Squats', sets: '4 sets', reps: '12-15 reps', rest: '60 secs', targetMuscle: 'Quads & Core', tips: 'Deep torso upright.' },
          { name: 'Walking Dumbbell Lunges', sets: '3 sets', reps: '20 total paces', rest: '60 secs', targetMuscle: 'Glutes & Hamstrings', tips: '90-degree knee angles.' },
          { name: 'Prowler Turf Sled Pushes (Heavy)', sets: '5 rounds', reps: '25 meters', rest: '90 secs', targetMuscle: 'Leg Power & Massive Caloric Burn', tips: 'Stay low, drive through balls of feet.' }
        ]
      }
    ]
  },
  strength: {
    goal: 'strength',
    title: 'Titanium Apex Strength (5x5 Power Protocol)',
    tagline: 'Maximum Neuromuscular Recruitment & Power Output',
    summary: 'A disciplined compound barbell regimen focused on the Big Three (Squat, Bench, Deadlift) and Overhead Press, optimizing motor unit recruitment, rate of force development, and tendon stiffness.',
    macroRatio: {
      protein: '30% (1.8g - 2.0g per kg bodyweight)',
      carbs: '50% (High glycogen stores for maximal ATP replenishment)',
      fats: '20% (Hormonal baseline & joint lubrication)'
    },
    caloriesTarget: 'Maintenance to slight surplus (+200 kcal) for maximal CNS recovery',
    hydrationTarget: '3.5 Litres daily (critical for cellular hydration & intervertebral discs)',
    nutritionTips: [
      'Ingest 40-60g fast-acting carbohydrates 45 mins prior to heavy lifting for optimal muscle glycogen.',
      'Allow 3 to 5 minutes between heavy working sets (RPE 8-9) to restore phosphocreatine stores.',
      'Prioritize micronutrients like magnesium, calcium, and sodium for muscle contraction.',
      'Never lift heavy in a dehydrated or sleep-deprived state.'
    ],
    recommendedSupplements: [
      'Creatine Monohydrate (essential for ATP-CP system)',
      'Beta-Alanine (buffering muscular acidosis)',
      'Joint Support Complex (Glucosamine + Chondroitin + MSM)',
      'Vitamin D3 + K2 (bone density and muscle contraction strength)'
    ],
    weeklySplit: [
      {
        day: 'Monday',
        title: 'Squat Focus & Posterior Chain',
        focus: 'Maximal Lower Body Force Production',
        exercises: [
          { name: 'Low-Bar Barbell Squat', sets: '5 sets', reps: '5 reps (at 80-85% 1RM)', rest: '3-4 mins', targetMuscle: 'Quads, Glutes, Adductors', tips: 'Brace abdominal wall with valsalva maneuver against weight belt.' },
          { name: 'Pause Squats (2-second hold at bottom)', sets: '3 sets', reps: '3 reps', rest: '2.5 mins', targetMuscle: 'Reversal Strength', tips: 'Zero bouncing; explosive drive through sticking point.' },
          { name: 'Barbell Good Mornings', sets: '3 sets', reps: '8 reps', rest: '2 mins', targetMuscle: 'Erector Spinae & Hamstrings', tips: 'Maintain neutral spine; soft bend at knees.' },
          { name: 'Heavy Abdominal Rollouts', sets: '3 sets', reps: '10 reps', rest: '90 secs', targetMuscle: 'Antiextension Core Strength', tips: 'Tuck pelvis and lock ribs down.' }
        ]
      },
      {
        day: 'Wednesday',
        title: 'Heavy Bench Press & Tricep Lockout',
        focus: 'Upper Body Horizontal Force & Stability',
        exercises: [
          { name: 'Competition Barbell Bench Press', sets: '5 sets', reps: '5 reps (at 80-85% 1RM)', rest: '3 mins', targetMuscle: 'Pectoralis Major & Triceps', tips: 'Plant feet solidly into floor; squeeze scapulae together on bench.' },
          { name: 'Close-Grip Bench Press', sets: '3 sets', reps: '6-8 reps', rest: '2.5 mins', targetMuscle: 'Triceps Brachii', tips: 'Elbows tucked 45 degrees; builds lockout power.' },
          { name: 'Weighted Barbell Pendlay Rows', sets: '4 sets', reps: '6 reps', rest: '2 mins', targetMuscle: 'Upper Back & Lats', tips: 'Dead-stop on floor between every rep.' }
        ]
      },
      {
        day: 'Friday',
        title: 'Deadlift Dominance & Overhead Press',
        focus: 'Total Kinetic Chain Recruitment',
        exercises: [
          { name: 'Conventional Barbell Deadlift', sets: '5 sets', reps: '3-5 reps (at 85% 1RM)', rest: '4 mins', targetMuscle: 'Posterior Chain & Traps', tips: 'Pull slack out of barbell before driving the floor away.' },
          { name: 'Strict Overhead Military Press', sets: '4 sets', reps: '5 reps', rest: '2.5 mins', targetMuscle: 'Anterior Delts & Serratus', tips: 'Squeeze glutes and thighs; head moves through window at top.' },
          { name: 'Farmer Walk Carries (Heavy Dumbbells/Trap Bar)', sets: '4 rounds', reps: '40 meters', rest: '2 mins', targetMuscle: 'Grip Strength & Core Armor', tips: 'Keep shoulders tall; do not sway.' }
        ]
      }
    ]
  },
  endurance: {
    goal: 'endurance',
    title: 'Titanium Aerobic Engine Protocol',
    tagline: 'Mitochondrial Density, Lactate Clearance & Stamina',
    summary: 'A hybrid endurance development system combining polarized Zone 2 base training, threshold lactate pacing, and functional muscular endurance to build an unbreakable cardiovascular motor.',
    macroRatio: {
      protein: '25% (1.6g - 1.8g per kg bodyweight for tissue recovery)',
      carbs: '55% (High complex carbohydrates for glycogen saturation)',
      fats: '20% (Endurance fatty acid metabolism)'
    },
    caloriesTarget: 'Isocaloric / full replenishment based on daily training expenditure',
    hydrationTarget: '4.5 Litres daily (replacing sodium loss during prolonged sweat sessions)',
    nutritionTips: [
      'Ingest 30-60g easily digestible carbs per hour during prolonged sessions >75 minutes.',
      'Refuel within 45 mins with a 3:1 Carb-to-Protein ratio for rapid glycogen resynthesis.',
      'Maintain adequate sodium (1000mg/L) and potassium for muscle cramping prevention.',
      'Incorporate beetroot juice (nitrates) 2 hours before tempo workouts to enhance oxygen efficiency.'
    ],
    recommendedSupplements: [
      'Beta-Alanine (3.2g daily for buffering muscle acidity)',
      'Electrolyte & Sodium Powder',
      'Branched Chain Amino Acids (BCAAs during long cardio)',
      'Cordyceps Mushroom Extract (enhanced oxygen uptake)'
    ],
    weeklySplit: [
      {
        day: 'Monday',
        title: 'Zone 2 Base Engine (Long Aerobic)',
        focus: 'Mitochondrial Proliferation & Capillarization',
        exercises: [
          { name: 'Rowing Ergometer Steady State', sets: '1 set', reps: '45 mins continuous', rest: 'None', targetMuscle: 'Cardiorespiratory Engine', tips: 'Keep heart rate at 65-72% max HR (conversational pace).' },
          { name: 'Kettlebell Goblet Step-Ups', sets: '3 sets', reps: '20 reps per leg', rest: '60 secs', targetMuscle: 'Single-leg Muscular Stamina', tips: 'Step up through midfoot; control descent.' }
        ]
      },
      {
        day: 'Tuesday',
        title: 'VO2 Max High-Intensity Intervals',
        focus: 'Peak Cardiac Output & Lactic Acid Buffering',
        exercises: [
          { name: 'Assault Bike 4-Minute Repeats', sets: '5 rounds', reps: '3 mins at 90% HR / 2 mins active spin', rest: '2 mins', targetMuscle: 'Peak Aerobic Power', tips: 'Sustain target RPM despite deep burn.' },
          { name: 'Plyometric Box Bounds & Calf Jumps', sets: '3 sets', reps: '15 reps', rest: '60 secs', targetMuscle: 'Achilles Tendon Elasticity', tips: 'Minimize ground contact time.' }
        ]
      },
      {
        day: 'Thursday',
        title: 'Lactate Threshold & Tempo Run',
        focus: 'Clearing Lactate at Race Paces',
        exercises: [
          { name: 'Treadmill Tempo Run (Zone 4)', sets: '3 sets', reps: '10 mins at threshold / 3 mins jog', rest: '3 mins', targetMuscle: 'Lactate Threshold', tips: 'Comfortably hard pace.' },
          { name: 'Single-Leg Romanian Deadlift', sets: '3 sets', reps: '12 reps per leg', rest: '60 secs', targetMuscle: 'Ankle & Hip Stabilizers', tips: 'Prevents runner knee and improves running economy.' }
        ]
      },
      {
        day: 'Saturday',
        title: 'Hybrid Functional Stamina Test',
        focus: 'Multi-Modal Aerobic Capacity',
        exercises: [
          { name: 'Row 1000m + 50 Wall Balls + 1000m SkiErg', sets: '2 rounds', reps: 'Continuous timed', rest: '3 mins', targetMuscle: 'Full Body Work Capacity', tips: 'Pace evenly; do not blow up on first row.' }
        ]
      }
    ]
  }
};
