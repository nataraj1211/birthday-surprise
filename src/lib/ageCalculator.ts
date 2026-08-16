export interface ExactAge {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  heartbeats: string;
  breaths: string;
  earthOrbits: number;
}

export interface NextBirthdayCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  ageTurning: number;
}

/**
 * Calculates exact age (years, months, days, hours, minutes, seconds)
 * from birth date (YYYY-MM-DD) and optional birth time (HH:mm) to current moment.
 */
export function calculateExactAge(birthDateStr: string, birthTimeStr = '00:00'): ExactAge | null {
  if (!birthDateStr) return null;

  try {
    const [bYear, bMonth, bDay] = birthDateStr.split('-').map(Number);
    if (!bYear || !bMonth || !bDay) return null;

    const [bHours = 0, bMinutes = 0] = (birthTimeStr || '00:00').split(':').map(Number);

    const birthDate = new Date(bYear, bMonth - 1, bDay, bHours, bMinutes, 0);
    const now = new Date();

    if (now.getTime() < birthDate.getTime()) {
      // Birth date is in the future
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalDays: 0,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        heartbeats: '0',
        breaths: '0',
        earthOrbits: 0,
      };
    }

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      // Days in previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    const diffMs = now.getTime() - birthDate.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Approximate estimations (~80 bpm heart rate, ~16 breaths/min)
    const approxHeartbeats = (totalMinutes * 80).toLocaleString();
    const approxBreaths = (totalMinutes * 16).toLocaleString();

    return {
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      heartbeats: approxHeartbeats,
      breaths: approxBreaths,
      earthOrbits: Math.max(0, years),
    };
  } catch (err) {
    console.error('Error calculating age:', err);
    return null;
  }
}

/**
 * Calculates countdown until next upcoming birthday
 */
export function calculateNextBirthday(birthDateStr: string): NextBirthdayCountdown {
  const now = new Date();
  if (!birthDateStr) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, ageTurning: 1 };
  }

  const [bYear = now.getFullYear(), bMonth = 1, bDay = 1] = birthDateStr.split('-').map(Number);
  const birthMonth = bMonth - 1;
  const birthDay = bDay;

  const isToday = now.getMonth() === birthMonth && now.getDate() === birthDay;

  let nextYear = now.getFullYear();
  let nextBday = new Date(nextYear, birthMonth, birthDay, 0, 0, 0);

  if (now.getTime() > nextBday.getTime() && !isToday) {
    nextYear += 1;
    nextBday = new Date(nextYear, birthMonth, birthDay, 0, 0, 0);
  }

  const diff = Math.max(0, nextBday.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const ageTurning = nextYear - bYear;

  return {
    days,
    hours,
    minutes,
    seconds,
    isToday,
    ageTurning: Math.max(1, ageTurning),
  };
}
