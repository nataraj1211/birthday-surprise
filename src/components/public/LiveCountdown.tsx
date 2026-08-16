import React, { useState, useEffect } from 'react';
import { Clock, PartyPopper, Globe, Sparkles, Activity, Wind } from 'lucide-react';
import type { ThemeConfig } from '../../types/birthday';
import { calculateExactAge, calculateNextBirthday, type ExactAge, type NextBirthdayCountdown } from '../../lib/ageCalculator';

interface Props {
  targetDate?: string; // YYYY-MM-DD
  birthDate?: string; // Alternative prop name
  theme: ThemeConfig;
}

export const LiveCountdown: React.FC<Props> = ({ targetDate, birthDate, theme }) => {
  const effectiveDate = targetDate || birthDate || '';
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
    const update = () => {
      if (effectiveDate) {
        setExactAge(calculateExactAge(effectiveDate));
        setCountdown(calculateNextBirthday(effectiveDate));
      }
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [effectiveDate]);

  return (
    <section className="py-4 sm:py-8 px-2 sm:px-4 text-center w-full">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* Today is Birthday Banner */}
        {countdown.isToday ? (
          <div
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border shadow-2xl animate-bounce"
            style={{
              background: theme.colors.surface,
              borderColor: theme.colors.border,
              boxShadow: `0 15px 40px ${theme.colors.glow}`,
            }}
          >
            <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-amber-400 animate-spin" />
            <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.primary }}>
              Today is YOUR DAY! 🎂💖
            </h2>
            <p className="text-xs sm:text-sm font-semibold opacity-90 mt-2">
              Time to blow out the candles, make a wish, and celebrate!
            </p>
          </div>
        ) : null}

        {/* 1. Exact Time on Earth (Years, Months, Days, Hours, Minutes, Seconds) */}
        {exactAge && (
          <div
            className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border shadow-xl space-y-3 sm:space-y-4"
            style={{
              background: theme.colors.surface,
              borderColor: theme.colors.border,
              boxShadow: `0 10px 30px ${theme.colors.glow}`,
            }}
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-80 flex-wrap">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 flex-shrink-0" />
              <span>Time You've Blessed This Earth</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 font-mono font-bold">LIVE</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3">
              {[
                { label: 'Years', val: exactAge.years },
                { label: 'Months', val: exactAge.months },
                { label: 'Days', val: exactAge.days },
                { label: 'Hours', val: exactAge.hours },
                { label: 'Mins', val: exactAge.minutes },
                { label: 'Secs', val: exactAge.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border text-center shadow-inner flex flex-col items-center justify-center"
                  style={{
                    background: theme.colors.cardBg,
                    borderColor: theme.colors.border,
                  }}
                >
                  <span className="block text-lg sm:text-3xl font-black leading-tight" style={{ color: theme.colors.primary }}>
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold uppercase opacity-65 mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Milestones (Responsive on Mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 pt-1 text-xs font-semibold">
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">{exactAge.totalDays.toLocaleString()} Days Alive</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 flex items-center justify-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span className="truncate">~{exactAge.heartbeats} Heartbeats 💓</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 flex items-center justify-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                <span className="truncate">{exactAge.earthOrbits} Sun Orbits ☀️</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Next Birthday Countdown */}
        {!countdown.isToday && (
          <div
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-xl border shadow-lg space-y-3"
            style={{
              background: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-80 flex-wrap">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 flex-shrink-0" />
              <span>Next Birthday Countdown (Turning {countdown.ageTurning})</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-3.5">
              {[
                { label: 'Days', val: countdown.days },
                { label: 'Hours', val: countdown.hours },
                { label: 'Mins', val: countdown.minutes },
                { label: 'Secs', val: countdown.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-4 rounded-xl sm:rounded-2xl border text-center shadow-inner flex flex-col items-center justify-center"
                  style={{
                    background: theme.colors.cardBg,
                    borderColor: theme.colors.border,
                  }}
                >
                  <span className="block text-lg sm:text-3xl font-black leading-tight" style={{ color: theme.colors.secondary }}>
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold uppercase opacity-65 mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
