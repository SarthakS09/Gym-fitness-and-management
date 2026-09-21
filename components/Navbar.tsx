'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { 
  ShieldCheck, 
  Activity, 
  QrCode, 
  UserPlus, 
  Calendar, 
  Flame, 
  Menu, 
  X,
  Layers,
  Sparkles,
  LogIn,
  LogOut,
  User
} from 'lucide-react';

interface NavbarProps {
  onOpenOnboarding: () => void;
  onOpenPass: () => void;
  onOpenSchedule: () => void;
  activeSection: 'home' | 'pricing' | 'classes' | 'recommendations' | 'dashboard' | 'login';
  setActiveSection: (sec: 'home' | 'pricing' | 'classes' | 'recommendations' | 'dashboard' | 'login') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOnboarding,
  onOpenPass,
  onOpenSchedule,
  activeSection,
  setActiveSection
}) => {
  const { currentUser, liveGymOccupancy, maxGymCapacity, isLoggedIn, logout } = useGym();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const occupancyPercent = Math.round((liveGymOccupancy / maxGymCapacity) * 100);

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      setActiveSection('login');
    } else {
      setActiveSection('dashboard');
    }
  };

  return (
    <nav className="border-b border-titanium-800/80 bg-titanium-950/80 backdrop-blur-xl sticky top-[41px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-blue-600 flex items-center justify-center p-0.5 shadow-glow-cyan group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-titanium-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-neon-cyan" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-widest text-lg text-white font-sans">TITANIUM</span>
                <span className="text-neon-cyan font-semibold text-lg tracking-widest">FITNESS</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-titanium-400 block -mt-1">
                GLA Campus & Elite Studio
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-titanium-900/60 p-1 rounded-full border border-titanium-800/60">
            <button
              onClick={() => setActiveSection('home')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'home'
                  ? 'bg-titanium-800 text-white shadow-sm'
                  : 'text-titanium-300 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection('pricing')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === 'pricing'
                  ? 'bg-titanium-800 text-white shadow-sm'
                  : 'text-titanium-300 hover:text-white'
              }`}
            >
              Membership Tiers
            </button>
            <button
              onClick={() => {
                setActiveSection('classes');
                onOpenSchedule();
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-titanium-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-neon-cyan" />
              Classes
            </button>
            <button
              onClick={() => setActiveSection('recommendations')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeSection === 'recommendations'
                  ? 'bg-titanium-800 text-white shadow-sm'
                  : 'text-titanium-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-neon-lime" />
              AI Goal Routine
            </button>
            <button
              onClick={handleDashboardClick}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSection === 'dashboard'
                  ? 'bg-neon-cyan text-titanium-950 font-bold shadow-glow-cyan'
                  : 'text-neon-cyan hover:bg-neon-cyan/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              My Dashboard
            </button>
          </div>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Live Studio Occupancy Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-titanium-900/80 border border-titanium-800 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-lime"></span>
              </span>
              <span className="text-titanium-300">
                Occupancy: <strong className="text-white">{liveGymOccupancy}</strong>/{maxGymCapacity}
              </span>
              <span className="text-[10px] text-neon-lime bg-neon-lime/10 px-1.5 py-0.2 rounded font-mono">
                {occupancyPercent}%
              </span>
            </div>

            {/* Turnstile / Digital Pass Button */}
            <button
              onClick={onOpenPass}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-titanium-800 hover:bg-titanium-700 text-titanium-200 hover:text-white border border-titanium-700 text-xs font-medium transition-all"
              title="Open Digital Gym Pass & Turnstile Scanner"
            >
              <QrCode className="w-4 h-4 text-neon-cyan" />
              <span>Digital Pass</span>
              {currentUser.isCheckedIn && (
                <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
              )}
            </button>

            {/* Dedicated Login Link */}
            <button
              onClick={() => setActiveSection('login')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeSection === 'login'
                  ? 'bg-titanium-700 text-white border-neon-cyan'
                  : 'bg-titanium-900 hover:bg-titanium-800 text-titanium-200 border-titanium-700'
              }`}
              title="Open Login Page"
            >
              <LogIn className="w-3.5 h-3.5 text-neon-cyan" />
              <span>{isLoggedIn ? 'Switch / Login' : 'Login'}</span>
            </button>

            {/* New Member Registration */}
            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-neon-cyan to-blue-600 text-titanium-950 font-semibold text-xs shadow-glow-cyan hover:brightness-110 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign-Up</span>
            </button>

            {/* Logout button if logged in */}
            {isLoggedIn && (
              <button
                onClick={() => {
                  logout();
                  setActiveSection('login');
                }}
                className="p-1.5 rounded-lg text-titanium-400 hover:text-neon-crimson hover:bg-titanium-800 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenPass}
              className="p-2 rounded-lg bg-titanium-800 text-neon-cyan border border-titanium-700"
              title="Digital Pass"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSection('login')}
              className="p-2 rounded-lg bg-titanium-800 text-titanium-300 hover:text-white border border-titanium-700"
              title="Login"
            >
              <LogIn className="w-4 h-4 text-neon-cyan" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-titanium-900 text-titanium-300 hover:text-white border border-titanium-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-titanium-800 bg-titanium-950 px-4 pt-3 pb-5 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-titanium-800/60 text-xs">
            <span className="text-titanium-400">Live Studio Floor:</span>
            <span className="text-neon-lime font-mono font-medium">{liveGymOccupancy}/{maxGymCapacity} Athletes</span>
          </div>
          <button
            onClick={() => {
              setActiveSection('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-titanium-200 hover:bg-titanium-800"
          >
            Overview
          </button>
          <button
            onClick={() => {
              setActiveSection('pricing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-titanium-200 hover:bg-titanium-800"
          >
            Membership Tiers (Base/Pro/Elite)
          </button>
          <button
            onClick={() => {
              setActiveSection('recommendations');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-neon-lime hover:bg-titanium-800"
          >
            AI Goal Recommendations
          </button>
          <button
            onClick={() => {
              handleDashboardClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-neon-cyan hover:bg-titanium-800"
          >
            Go to {currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'trainer' ? 'Trainer' : 'Customer'} Dashboard
          </button>
          <button
            onClick={() => {
              setActiveSection('login');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-titanium-200 hover:bg-titanium-800 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4 text-neon-cyan" />
            <span>Customer & Admin Login Page</span>
          </button>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                onOpenPass();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-titanium-800 text-white text-xs font-medium text-center border border-titanium-700"
            >
              Digital Pass
            </button>
            <button
              onClick={() => {
                onOpenOnboarding();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-neon-cyan text-titanium-950 text-xs font-bold text-center"
            >
              Sign-Up Flow
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
