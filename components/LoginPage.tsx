'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginPageProps {
  onSuccessLogin: () => void;
  onOpenOnboarding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSuccessLogin,
  onOpenOnboarding
}) => {
  const { login, currentUser, users } = useGym();

  const [loginMode, setLoginMode] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('elite@titaniumfitness.com');
  const [password, setPassword] = useState('customer123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleModeSwitch = (mode: 'customer' | 'admin') => {
    setLoginMode(mode);
    setErrorMsg('');
    setSuccessMsg('');
    if (mode === 'admin') {
      setEmail('admin@titaniumfitness.com');
      setPassword('admin123');
    } else {
      setEmail('elite@titaniumfitness.com');
      setPassword('customer123');
    }
  };

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = login(email, password);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    setSuccessMsg(res.message);
    setTimeout(() => {
      onSuccessLogin();
    }, 600);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto">
      {/* Container with futuristic glass styling */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-titanium-700/80 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className={`absolute top-0 right-1/2 translate-x-1/2 w-80 h-40 blur-3xl pointer-events-none rounded-full ${
          loginMode === 'admin' ? 'bg-neon-amber/20' : 'bg-neon-cyan/20'
        }`} />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan to-blue-600 flex items-center justify-center p-0.5 shadow-glow-cyan mx-auto mb-3">
            <div className="w-full h-full bg-titanium-950 rounded-[14px] flex items-center justify-center">
              <Flame className="w-6 h-6 text-neon-cyan" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            TITANIUM <span className={loginMode === 'admin' ? 'text-neon-amber' : 'text-neon-cyan'}>
              {loginMode === 'admin' ? 'ADMIN ACCESS' : 'CUSTOMER ACCESS'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-titanium-400 mt-1">
            {loginMode === 'admin'
              ? 'Executive dashboard login for studio operations & tier management'
              : 'Sign in to access your digital turnstile pass & workout routine'}
          </p>
        </div>

        {/* Tab Switcher: Customer vs Admin */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-titanium-900 border border-titanium-800 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleModeSwitch('customer')}
            className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
              loginMode === 'customer'
                ? 'bg-neon-cyan text-titanium-950 shadow-glow-cyan'
                : 'text-titanium-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Customer Login</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeSwitch('admin')}
            className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
              loginMode === 'admin'
                ? 'bg-neon-amber text-titanium-950 shadow-glow-amber'
                : 'text-titanium-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Login</span>
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-neon-crimson/10 border border-neon-crimson/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-neon-crimson" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-neon-lime/10 border border-neon-lime/40 text-neon-lime text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-neon-lime" />
            <span>{successMsg} Redirecting to your dashboard...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-titanium-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={loginMode === 'admin' ? 'admin@titaniumfitness.com' : 'customer@titaniumfitness.com'}
                className="w-full bg-titanium-900 border border-titanium-700 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-titanium-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-titanium-900 border border-titanium-700 rounded-xl pl-10 pr-10 py-3 text-white text-xs focus:outline-none focus:border-neon-cyan transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-titanium-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg mt-2 ${
              loginMode === 'admin'
                ? 'bg-neon-amber text-titanium-950 shadow-glow-amber hover:bg-amber-400'
                : 'bg-gradient-to-r from-neon-cyan to-blue-600 text-titanium-950 shadow-glow-cyan hover:brightness-110'
            }`}
          >
            <span>Sign In to {loginMode === 'admin' ? 'Admin Console' : 'Member Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Quick Demo Fill Badges */}
        <div className="mt-6 pt-5 border-t border-titanium-800">
          <span className="text-[10px] font-mono text-titanium-500 uppercase tracking-widest block mb-2 font-bold">
            1-Click Demo Credentials:
          </span>

          {loginMode === 'customer' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('elite@titaniumfitness.com', 'customer123')}
                className="p-2 rounded-lg bg-titanium-900 border border-titanium-800 hover:border-neon-amber text-left text-[11px] transition-colors"
              >
                <span className="font-bold text-neon-amber block">Elite Member</span>
                <span className="text-titanium-400 text-[10px]">elite@titaniumfitness.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('pro@titaniumfitness.com', 'customer123')}
                className="p-2 rounded-lg bg-titanium-900 border border-titanium-800 hover:border-neon-cyan text-left text-[11px] transition-colors"
              >
                <span className="font-bold text-neon-cyan block">Pro Member</span>
                <span className="text-titanium-400 text-[10px]">pro@titaniumfitness.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('base@titaniumfitness.com', 'customer123')}
                className="p-2 rounded-lg bg-titanium-900 border border-titanium-800 hover:border-titanium-600 text-left text-[11px] transition-colors"
              >
                <span className="font-bold text-titanium-200 block">Base Member</span>
                <span className="text-titanium-400 text-[10px]">base@titaniumfitness.com</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleFillDemo('admin@titaniumfitness.com', 'admin123')}
              className="w-full p-2.5 rounded-lg bg-titanium-900 border border-titanium-800 hover:border-neon-amber text-left text-xs transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-neon-amber block">System Administrator</span>
                <span className="text-titanium-400 text-[11px]">admin@titaniumfitness.com • Password: admin123</span>
              </div>
              <KeyRound className="w-4 h-4 text-neon-amber" />
            </button>
          )}
        </div>

        {/* Onboarding Link */}
        <div className="mt-6 text-center text-xs text-titanium-400">
          <span>New to Titanium Fitness? </span>
          <button
            type="button"
            onClick={onOpenOnboarding}
            className="text-neon-cyan font-bold hover:underline"
          >
            Start Member Onboarding & Choose Tier →
          </button>
        </div>
      </div>
    </div>
  );
};
