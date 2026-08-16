import React, { useState, useEffect } from 'react';
import { Clock, PartyPopper, Sparkles, Calendar, Heart, Globe, Activity, Wind } from 'lucide-react';
import type { ThemeConfig } from '../../../types/birthday';
import { calculateExactAge, calculateNextBirthday, type ExactAge, type NextBirthdayCountdown } from '../../../lib/ageCalculator';

interface Props {
  targetDate: string; // YYYY-MM-DD
  theme: ThemeConfig;
  name: string;
}

export const SlideCountdown: React.FC<Props> = ({ targetDate, theme, name }) => {
  const [activeTab, setActiveTab] = useState<'alive' | 'countdown'>('alive');
  const [exactAge, setExactAge] = useState<ExactAge | null>(null);
  const [countdown, setCountdown] = useState<NextBirthdayCountdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    ageTurning: 1,
  });

  useEffect(() => {
    const updateCalculations = () => {
      if (targetDate) {
        setExactAge(calculateExactAge(targetDate));
        setCountdown(calculateNextBirthday(targetDate));
      }
    };

    updateCalculations();
    const timer = setInterval(updateCalculations, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-3 sm:px-4 py-3 max-w-2xl mx-auto select-none space-y-5">
      {/* Title & Mode Switcher */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm backdrop-blur-md"
            style={{
              background: theme.colors.surface,
              color: theme.colors.primary,
              borderColor: theme.colors.border,
            }}
          >
            <Calendar className="w-3.5 h-3.5" /> Special Date: {targetDate || 'Selected'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: theme.colors.text }}>
          {countdown.isToday
            ? `Today is THE Day, ${name}! 🎉`
            : activeTab === 'alive'
            ? 'Your Journey on Earth 🌍'
            : 'The Grand Countdown ⏳'}
        </h2>

        {/* Tab Toggle Buttons */}
        <div className="inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/5">
          <button
            type="button"
            onClick={() => setActiveTab('alive')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'alive'
                ? 'bg-white shadow-md text-slate-800 scale-105'
                : 'text-slate-600 hover:text-slate-900 opacity-70'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-pink-500" />
            <span>Time on Earth ✨</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('countdown')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'countdown'
                ? 'bg-white shadow-md text-slate-800 scale-105'
                : 'text-slate-600 hover:text-slate-900 opacity-70'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-pink-500" />
            <span>Next Birthday ⏳</span>
          </button>
        </div>
      </div>

      {/* Birthday Celebration Banner if Today */}
      {countdown.isToday && (
        <div
          className="w-full p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-2xl space-y-3 animate-in zoom-in-95 duration-500"
          style={{
            background: theme.colors.cardBg,
            borderColor: theme.colors.border,
            boxShadow: `0 20px 50px ${theme.colors.glow}`,
          }}
        >
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-amber-100 text-amber-500 animate-bounce">
            <PartyPopper className="w-9 h-9" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black" style={{ color: theme.colors.primary }}>
            Happy {exactAge ? `${exactAge.years}th` : ''} Birthday, {name}! 🎂🎉
          </h3>
          <p className="text-xs sm:text-sm font-bold opacity-90 leading-relaxed">
            Today marks another glorious trip around the sun! Celebrate every single precious second! 💕
          </p>
        </div>
      )}

      {/* TAB 1: EXACT TIME ALIVE ON EARTH (Years, Months, Days, Hours, Minutes, Seconds) */}
      {activeTab === 'alive' && exactAge && (
        <div
          className="w-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-xl border shadow-2xl space-y-4 sm:space-y-5 animate-in fade-in zoom-in-95 duration-300"
          style={{
            background: theme.colors.cardBg,
            borderColor: theme.colors.border,
            boxShadow: `0 15px 45px ${theme.colors.glow}`,
          }}
        >
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider opacity-80 flex-wrap">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin flex-shrink-0" />
            <span>Time You Have Blessed This World (Live Ticking)</span>
          </div>

          {/* 6 Grid Units: Years, Months, Days, Hours, Mins, Secs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2.5">
            {[
              { label: 'Years', val: exactAge.years, color: theme.colors.primary },
              { label: 'Months', val: exactAge.months, color: theme.colors.secondary },
              { label: 'Days', val: exactAge.days, color: theme.colors.accent },
              { label: 'Hours', val: exactAge.hours, color: theme.colors.primary },
              { label: 'Mins', val: exactAge.minutes, color: theme.colors.secondary },
              { label: 'Secs', val: exactAge.seconds, color: theme.colors.accent },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border text-center shadow-sm backdrop-blur-md transition-all flex flex-col items-center justify-center"
                style={{
                  background: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
              >
                <span
                  className="block text-lg sm:text-2xl font-black tracking-tight leading-tight"
                  style={{ color: item.color }}
                >
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] font-extrabold uppercase opacity-70 mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Life Milestone Fun Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 pt-1 text-left">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/40 dark:bg-black/20 border border-black/5 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-black truncate" style={{ color: theme.colors.text }}>
                  {exactAge.totalDays.toLocaleString()} Days
                </span>
                <span className="text-[9px] sm:text-[10px] opacity-60 font-semibold block truncate">Total Days Alive</span>
              </div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-white/40 dark:bg-black/20 border border-black/5 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-black truncate" style={{ color: theme.colors.text }}>
                  ~{exactAge.heartbeats}
                </span>
                <span className="text-[9px] sm:text-[10px] opacity-60 font-semibold block truncate">Heartbeats 💓</span>
              </div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-white/40 dark:bg-black/20 border border-black/5 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-black truncate" style={{ color: theme.colors.text }}>
                  {exactAge.earthOrbits} Sun Orbits
                </span>
                <span className="text-[9px] sm:text-[10px] opacity-60 font-semibold block truncate">Trips Around Sun ☀️</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COUNTDOWN TO NEXT BIRTHDAY */}
      {activeTab === 'countdown' && (
        <div
          className="w-full p-4 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border shadow-2xl space-y-4 sm:space-y-6 animate-in fade-in zoom-in-95 duration-300"
          style={{
            background: theme.colors.cardBg,
            borderColor: theme.colors.border,
            boxShadow: `0 15px 45px ${theme.colors.glow}`,
          }}
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-75 flex-wrap">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 animate-spin flex-shrink-0" />
            <span>Time Left Until Next Birthday (Turning {countdown.ageTurning})</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
            {[
              { label: 'Days', val: countdown.days },
              { label: 'Hours', val: countdown.hours },
              { label: 'Mins', val: countdown.minutes },
              { label: 'Secs', val: countdown.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl border text-center shadow-sm backdrop-blur-md transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center"
                style={{
                  background: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
              >
                <span
                  className="block text-xl sm:text-4xl font-black tracking-tight leading-tight"
                  style={{ color: theme.colors.primary }}
                >
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-xs font-bold uppercase opacity-65 mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] sm:text-sm font-semibold opacity-75 flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse flex-shrink-0" />
            Every passing second brings us closer to your celebration!
          </p>
        </div>
      )}
    </div>
  );
};
