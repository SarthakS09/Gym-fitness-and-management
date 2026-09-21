'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, GymClass, AttendanceRecord, MembershipTier, FitnessGoal, FitnessLevel } from './types';
import { INITIAL_USERS, INITIAL_CLASSES, INITIAL_ATTENDANCE, GOAL_RECOMMENDATIONS } from './seed-data';

interface GymContextType {
  currentUser: User;
  users: User[];
  classes: GymClass[];
  attendance: AttendanceRecord[];
  liveGymOccupancy: number;
  maxGymCapacity: number;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => { success: boolean; message: string; user?: User };
  logout: () => void;
  switchUser: (userId: string) => void;
  registerNewMember: (data: {
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    tier: MembershipTier;
    goal: FitnessGoal;
    fitnessLevel: FitnessLevel;
    targetWeightKg?: number;
    currentWeightKg?: number;
  }) => User;
  updateUserTier: (userId: string, newTier: MembershipTier) => void;
  extendMembership: (userId: string, days?: number) => void;
  deleteUser: (userId: string) => void;
  simulateTurnstileCheckIn: (simulatedHour?: number) => { success: boolean; message: string; record: AttendanceRecord };
  simulateTurnstileCheckOut: () => { success: boolean; message: string; record: AttendanceRecord };
  bookClass: (classId: string) => { success: boolean; message: string };
  cancelClassBooking: (classId: string) => { success: boolean; message: string };
  createClass: (classData: Omit<GymClass, 'id' | 'enrolledUserIds'>) => void;
  deleteClass: (classId: string) => void;
  resetToDefaultSeed: () => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

const STORAGE_KEY_USERS = 'titanium_users_v1';
const STORAGE_KEY_CLASSES = 'titanium_classes_v1';
const STORAGE_KEY_ATTENDANCE = 'titanium_attendance_v1';
const STORAGE_KEY_CURRENT_USER = 'titanium_current_user_v1';
const STORAGE_KEY_LOGGED_IN = 'titanium_logged_in_v1';

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [classes, setClasses] = useState<GymClass[]>(INITIAL_CLASSES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [currentUserId, setCurrentUserId] = useState<string>('user-member-1'); // Default Elite Member
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage if available
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      const savedClasses = localStorage.getItem(STORAGE_KEY_CLASSES);
      const savedAttendance = localStorage.getItem(STORAGE_KEY_ATTENDANCE);
      const savedCurrentUserId = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      const savedLoggedIn = localStorage.getItem(STORAGE_KEY_LOGGED_IN);

      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedClasses) setClasses(JSON.parse(savedClasses));
      if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
      if (savedCurrentUserId) setCurrentUserId(savedCurrentUserId);
      if (savedLoggedIn !== null) setIsLoggedIn(savedLoggedIn === 'true');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classes));
      localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(attendance));
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, currentUserId);
      localStorage.setItem(STORAGE_KEY_LOGGED_IN, String(isLoggedIn));
    } catch (e) {
      console.warn('LocalStorage sync error:', e);
    }
  }, [users, classes, attendance, currentUserId, isLoggedIn, isHydrated]);

  const currentUser = users.find((u) => u.id === currentUserId) || users[0];

  const login = (email: string, password?: string): { success: boolean; message: string; user?: User } => {
    const target = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!target) {
      return { success: false, message: 'No account found with this email address.' };
    }
    if (password && target.password && target.password !== password) {
      return { success: false, message: 'Invalid password. Please verify your credentials.' };
    }
    setCurrentUserId(target.id);
    setIsLoggedIn(true);
    return { success: true, message: `Welcome back, ${target.name}!`, user: target };
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      setIsLoggedIn(true);
    }
  };

  const registerNewMember = (data: {
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    tier: MembershipTier;
    goal: FitnessGoal;
    fitnessLevel: FitnessLevel;
    targetWeightKg?: number;
    currentWeightKg?: number;
  }): User => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newMemberId = `TF-2026-${randomCode}`;
    const today = new Date();
    const expiry = new Date();
    expiry.setFullYear(today.getFullYear() + 1);

    const ptTotal = data.tier === 'elite' ? 8 : data.tier === 'pro' ? 2 : 0;
    const guestTotal = data.tier === 'elite' ? 999 : data.tier === 'pro' ? 2 : 0;

    const newUser: User = {
      id: `user-${Date.now()}`,
      memberId: newMemberId,
      name: data.name,
      email: data.email,
      password: 'customer123',
      role: 'member',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250`,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      tier: data.tier,
      goal: data.goal,
      fitnessLevel: data.fitnessLevel,
      targetWeightKg: data.targetWeightKg,
      currentWeightKg: data.currentWeightKg,
      joinDate: today.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      ptSessionsTotal: ptTotal,
      ptSessionsRemaining: ptTotal,
      guestPassesTotal: guestTotal,
      guestPassesRemaining: guestTotal,
      assignedTrainerName: data.tier === 'elite' ? 'Head Trainer (Dedicated)' : undefined,
      isCheckedIn: false,
      streakDays: 1
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    setIsLoggedIn(true);
    return newUser;
  };

  const updateUserTier = (userId: string, newTier: MembershipTier) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const ptTotal = newTier === 'elite' ? 8 : newTier === 'pro' ? 2 : 0;
        const guestTotal = newTier === 'elite' ? 999 : newTier === 'pro' ? 2 : 0;
        return {
          ...u,
          tier: newTier,
          ptSessionsTotal: ptTotal,
          ptSessionsRemaining: ptTotal,
          guestPassesTotal: guestTotal,
          guestPassesRemaining: guestTotal,
          assignedTrainerName: newTier === 'elite' ? 'Head Trainer' : u.assignedTrainerName
        };
      })
    );
  };

  const extendMembership = (userId: string, days = 30) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const currentExp = new Date(u.expiryDate);
        const baseDate = currentExp > new Date() ? currentExp : new Date();
        baseDate.setDate(baseDate.getDate() + days);
        return {
          ...u,
          expiryDate: baseDate.toISOString().split('T')[0]
        };
      })
    );
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Turnstile Simulation
  const simulateTurnstileCheckIn = (simulatedHour?: number): { success: boolean; message: string; record: AttendanceRecord } => {
    const now = new Date();
    const currentHour = simulatedHour !== undefined ? simulatedHour : now.getHours();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullDateString = `${now.toISOString().split('T')[0]} ${timeString}`;

    // 1. Check if membership expired
    const isExpired = new Date(currentUser.expiryDate) < new Date();
    if (isExpired) {
      const deniedRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        tier: currentUser.tier,
        timestamp: fullDateString,
        type: 'check_in',
        status: 'denied',
        reason: 'Membership Expired: Renewal required to enter facility.'
      };
      setAttendance((prev) => [deniedRecord, ...prev]);
      return {
        success: false,
        message: 'Access Denied: Your membership has expired. Please renew at the front desk or in your dashboard.',
        record: deniedRecord
      };
    }

    // 2. Check Tier Access Windows (Base: 9:00 AM - 4:00 PM, i.e. hours 9 to 15:59)
    if (currentUser.tier === 'base') {
      if (currentHour < 9 || currentHour >= 16) {
        const deniedRecord: AttendanceRecord = {
          id: `att-${Date.now()}`,
          userId: currentUser.id,
          userName: currentUser.name,
          tier: currentUser.tier,
          timestamp: fullDateString,
          type: 'check_in',
          status: 'denied',
          reason: `Off-Peak Violation: Base tier access window is 9:00 AM – 4:00 PM. Attempted at ${timeString}.`
        };
        setAttendance((prev) => [deniedRecord, ...prev]);
        return {
          success: false,
          message: `Access Denied: Base tier is restricted to off-peak hours (9:00 AM – 4:00 PM). Current time: ${timeString}. Upgrade to Pro for 24/7 unlimited access!`,
          record: deniedRecord
        };
      }
    }

    // 3. Granted (Pro or Elite 24/7, or Base within off-peak window)
    const grantedRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      tier: currentUser.tier,
      timestamp: fullDateString,
      type: 'check_in',
      status: 'granted'
    };

    setAttendance((prev) => [grantedRecord, ...prev]);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? { ...u, isCheckedIn: true, lastCheckIn: `Today at ${timeString}`, streakDays: u.streakDays + 1 }
          : u
      )
    );

    return {
      success: true,
      message: `Access Granted! Welcome to Titanium Fitness, ${currentUser.name} (${currentUser.tier.toUpperCase()} Member). Turnstile unlocked.`,
      record: grantedRecord
    };
  };

  const simulateTurnstileCheckOut = (): { success: boolean; message: string; record: AttendanceRecord } => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullDateString = `${now.toISOString().split('T')[0]} ${timeString}`;

    const checkOutRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      tier: currentUser.tier,
      timestamp: fullDateString,
      type: 'check_out',
      status: 'granted'
    };

    setAttendance((prev) => [checkOutRecord, ...prev]);
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, isCheckedIn: false } : u))
    );

    return {
      success: true,
      message: `Checked out successfully. Great workout session today!`,
      record: checkOutRecord
    };
  };

  // Class Booking
  const bookClass = (classId: string): { success: boolean; message: string } => {
    const targetClass = classes.find((c) => c.id === classId);
    if (!targetClass) return { success: false, message: 'Class not found.' };

    if (targetClass.enrolledUserIds.includes(currentUser.id)) {
      return { success: false, message: 'You are already booked into this session.' };
    }

    if (targetClass.enrolledUserIds.length >= targetClass.capacity) {
      return { success: false, message: 'Class is full! Capacity reached.' };
    }

    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, enrolledUserIds: [...c.enrolledUserIds, currentUser.id] } : c
      )
    );

    return { success: true, message: `Successfully reserved your spot for ${targetClass.title}!` };
  };

  const cancelClassBooking = (classId: string): { success: boolean; message: string } => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId
          ? { ...c, enrolledUserIds: c.enrolledUserIds.filter((id) => id !== currentUser.id) }
          : c
      )
    );
    return { success: true, message: 'Booking cancelled.' };
  };

  const createClass = (classData: Omit<GymClass, 'id' | 'enrolledUserIds'>) => {
    const newClass: GymClass = {
      ...classData,
      id: `class-${Date.now()}`,
      enrolledUserIds: []
    };
    setClasses((prev) => [newClass, ...prev]);
  };

  const deleteClass = (classId: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== classId));
  };

  const resetToDefaultSeed = () => {
    localStorage.removeItem(STORAGE_KEY_USERS);
    localStorage.removeItem(STORAGE_KEY_CLASSES);
    localStorage.removeItem(STORAGE_KEY_ATTENDANCE);
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    setUsers(INITIAL_USERS);
    setClasses(INITIAL_CLASSES);
    setAttendance(INITIAL_ATTENDANCE);
    setCurrentUserId('user-member-1');
  };

  // Live gym occupancy: count checked-in members + realistic base background attendees
  const activeCheckedInCount = users.filter((u) => u.isCheckedIn).length;
  const liveGymOccupancy = 38 + activeCheckedInCount;
  const maxGymCapacity = 120;

  return (
    <GymContext.Provider
      value={{
        currentUser,
        users,
        classes,
        attendance,
        liveGymOccupancy,
        maxGymCapacity,
        isLoggedIn,
        login,
        logout,
        switchUser,
        registerNewMember,
        updateUserTier,
        extendMembership,
        deleteUser,
        simulateTurnstileCheckIn,
        simulateTurnstileCheckOut,
        bookClass,
        cancelClassBooking,
        createClass,
        deleteClass,
        resetToDefaultSeed
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) throw new Error('useGym must be used within a GymProvider');
  return context;
};
