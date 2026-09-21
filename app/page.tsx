'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { MembershipTier } from '@/lib/types';
import { DemoRoleSwitcher } from '@/components/DemoRoleSwitcher';
import { Navbar } from '@/components/Navbar';
import { LandingHero } from '@/components/LandingHero';
import { PricingMatrix } from '@/components/PricingMatrix';
import { OnboardingModal } from '@/components/OnboardingModal';
import { DigitalGymPass } from '@/components/DigitalGymPass';
import { ClassScheduleModal } from '@/components/ClassScheduleModal';
import { GoalRecommendations } from '@/components/GoalRecommendations';
import { AdminDashboard } from '@/components/AdminDashboard';
import { MemberDashboard } from '@/components/MemberDashboard';
import { TrainerDashboard } from '@/components/TrainerDashboard';
import { LoginPage } from '@/components/LoginPage';
import { 
  Flame, 
  ShieldCheck, 
  QrCode, 
  Sparkles, 
  Calendar, 
  Heart, 
  Award,
  Layers,
  Dumbbell
} from 'lucide-react';

export default function Home() {
  const { currentUser, isLoggedIn } = useGym();

  const [activeSection, setActiveSection] = useState<'home' | 'pricing' | 'classes' | 'recommendations' | 'dashboard' | 'login'>('home');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedTierForOnboarding, setSelectedTierForOnboarding] = useState<MembershipTier>('pro');

  const handleSelectTier = (tier: MembershipTier) => {
    setSelectedTierForOnboarding(tier);
    setIsOnboardingOpen(true);
  };

  return (
    <div className="min-h-screen bg-titanium-950 text-titanium-100 flex flex-col selection:bg-neon-cyan/30 selection:text-neon-cyan">
      {/* 1. Quick Demo Role Switcher (Always accessible at top) */}
      <DemoRoleSwitcher />

      {/* 2. Main Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenOnboarding={() => {
          setSelectedTierForOnboarding('pro');
          setIsOnboardingOpen(true);
        }}
        onOpenPass={() => setIsPassOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      {/* 3. Main Content Views */}
      <main className="flex-1">
        {/* VIEW: Home / Public Landing Shell */}
        {activeSection === 'home' && (
          <>
            <LandingHero
              onOpenOnboarding={() => {
                setSelectedTierForOnboarding('pro');
                setIsOnboardingOpen(true);
              }}
              onOpenPass={() => setIsPassOpen(true)}
              onNavigateToPricing={() => setActiveSection('pricing')}
              onNavigateToDashboard={() => {
                if (!isLoggedIn) setActiveSection('login');
                else setActiveSection('dashboard');
              }}
              onNavigateToLogin={() => setActiveSection('login')}
            />
            <PricingMatrix onSelectTier={handleSelectTier} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <GoalRecommendations />
            </div>
          </>
        )}

        {/* VIEW: Membership Tiers & Feature Matrix */}
        {activeSection === 'pricing' && (
          <div className="pt-6">
            <PricingMatrix onSelectTier={handleSelectTier} />
          </div>
        )}

        {/* VIEW: AI Goal Recommendations */}
        {activeSection === 'recommendations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <GoalRecommendations />
          </div>
        )}

        {/* VIEW: Dedicated Login Page for Admin and Customer */}
        {activeSection === 'login' && (
          <LoginPage
            onSuccessLogin={() => setActiveSection('dashboard')}
            onOpenOnboarding={() => {
              setSelectedTierForOnboarding('pro');
              setIsOnboardingOpen(true);
            }}
          />
        )}

        {/* VIEW: Role-Based Dashboard */}
        {activeSection === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {currentUser.role === 'admin' && (
              <AdminDashboard onOpenCreateClass={() => setIsScheduleOpen(true)} />
            )}
            {currentUser.role === 'trainer' && (
              <TrainerDashboard />
            )}
            {currentUser.role === 'member' && (
              <MemberDashboard
                onOpenPass={() => setIsPassOpen(true)}
                onOpenSchedule={() => setIsScheduleOpen(true)}
                onUpgradeTier={() => setActiveSection('pricing')}
              />
            )}
          </div>
        )}
      </main>

      {/* 4. Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        preselectedTier={selectedTierForOnboarding}
        onComplete={() => {
          setActiveSection('dashboard');
        }}
      />

      <DigitalGymPass
        isOpen={isPassOpen}
        onClose={() => setIsPassOpen(false)}
        onUpgradeTier={() => {
          setActiveSection('pricing');
        }}
      />

      <ClassScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      {/* 5. Footer */}
      <footer className="border-t border-titanium-800/80 bg-titanium-950 py-12 mt-16 text-xs text-titanium-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-white tracking-wider">TITANIUM FITNESS</div>
              <div className="text-[11px] text-titanium-500">GLA University Mathura • CSE Capstone Project</div>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-titanium-300">
              Developed by: <strong className="text-white">Sarthak Singh, Sanskriti Saini, Sanket Yadav, Sanket Sahu</strong>
            </p>
            <p className="text-titanium-400">
              Under the supervision of: <strong className="text-titanium-200">Mr. Yash Singh</strong>
            </p>
            <p className="text-titanium-500 text-[10px]">
              Next.js 14 • React • TypeScript • Tailwind CSS • Recharts • Automated RBAC
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
