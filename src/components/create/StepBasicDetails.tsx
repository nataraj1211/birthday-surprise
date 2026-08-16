import React, { useState, useEffect } from 'react';
import { User, Calendar, HeartHandshake, Sparkles, Clock, Globe, Tag } from 'lucide-react';
import type { BirthdayFormInput } from '../../types/birthday';
import { calculateExactAge, type ExactAge } from '../../lib/ageCalculator';
import { getExperienceConfig } from '../../config/experienceConfig';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
}

export const StepBasicDetails: React.FC<Props> = ({ formData, onChange }) => {
  const [exactAge, setExactAge] = useState<ExactAge | null>(null);
  const config = getExperienceConfig(formData.experience_type);

  useEffect(() => {
    if (formData.birthday_date) {
      setExactAge(calculateExactAge(formData.birthday_date));
      const interval = setInterval(() => {
        setExactAge(calculateExactAge(formData.birthday_date));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setExactAge(null);
    }
  }, [formData.birthday_date]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center max-w-md mx-auto mb-4 sm:mb-6 space-y-1.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
          <span>{config.emoji}</span>
          <span>{config.name} Experience</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Who is the Birthday Star? 🎂</h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Tell us their name, date of birth, and who this special surprise is from.
        </p>
      </div>

      <div className="space-y-5 max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5">
        {/* Birthday Person Name */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-pink-500" />
            {config.labels.personName} <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder={config.labels.namePlaceholder}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none text-slate-800 font-semibold placeholder:font-normal placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Optional Role / Nickname if present */}
        {config.labels.roleOptions && config.labels.roleOptions.length > 0 && (
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-pink-500" />
              {config.labels.roleLabel || 'Relationship Role'}
            </label>
            <div className="flex flex-wrap gap-2">
              {config.labels.roleOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ relationship_role: opt })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    formData.relationship_role === opt
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nickname Input */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-pink-500" />
            {config.labels.nicknameLabel || 'Nickname / Term of Endearment (Optional)'}
          </label>
          <input
            type="text"
            value={formData.nickname || ''}
            onChange={(e) => onChange({ nickname: e.target.value })}
            placeholder={config.labels.nicknamePlaceholder || 'e.g. My Love, Bestie, Hero, Legend...'}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none text-slate-800 font-medium text-sm placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Birthday Date */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-500" />
            Date of Birth (DOB) <span className="text-pink-500">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.birthday_date}
            onChange={(e) => onChange({ birthday_date: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none text-slate-800 font-medium transition-all"
          />
          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            We automatically calculate their exact Years, Months, Days, Hours, Minutes, and Seconds!
          </p>
        </div>

        {/* Live Age Calculation Preview Card */}
        {exactAge && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border border-pink-200/80 space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-bold text-pink-700">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Live Age on Earth
              </span>
              <span className="text-[10px] bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 text-pink-600 animate-spin" /> Live Ticking
              </span>
            </div>

            <div className="grid grid-cols-6 gap-1 text-center">
              {[
                { label: 'Yrs', val: exactAge.years },
                { label: 'Mos', val: exactAge.months },
                { label: 'Days', val: exactAge.days },
                { label: 'Hrs', val: exactAge.hours },
                { label: 'Mins', val: exactAge.minutes },
                { label: 'Secs', val: exactAge.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/80 rounded-xl p-1.5 border border-pink-100 shadow-xs">
                  <span className="block text-sm font-black text-pink-600">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-semibold text-slate-600 text-center pt-1">
              ✨ Total: <strong className="text-pink-600">{exactAge.totalDays.toLocaleString()} days</strong> of spreading happiness!
            </p>
          </div>
        )}

        {/* Sender / Friend Name */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-pink-500" />
            Sender / Your Name <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.sender_name}
            onChange={(e) => onChange({ sender_name: e.target.value })}
            placeholder="e.g. Alex, Sarah & Squad, Your Bestie..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none text-slate-800 font-semibold placeholder:font-normal placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>
    </div>
  );
};
