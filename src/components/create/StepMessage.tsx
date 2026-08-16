import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import type { BirthdayFormInput } from '../../types/birthday';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
}

export const StepMessage: React.FC<Props> = ({ formData, onChange }) => {
  const charCount = formData.birthday_message.length;
  const maxCharCount = 2000;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-800">Personal Birthday Letter 💌</h3>
        <p className="text-sm text-slate-500 mt-1">
          Write a heartfelt birthday message that will be revealed with a beautiful typewriter effect.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5 space-y-6">
        {/* Intro Teaser Text */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-pink-500" />
            Opening Teaser Text
          </label>
          <input
            type="text"
            value={formData.intro_text}
            onChange={(e) => onChange({ intro_text: e.target.value })}
            placeholder="e.g. Someone special has prepared a little surprise for you..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none text-slate-800 font-medium text-sm transition-all"
          />
          <p className="text-xs text-slate-400 mt-1">
            This short sentence appears on the cinematic opening curtain screen.
          </p>
        </div>

        {/* Main Letter Message */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-500" />
              Your Personal Birthday Message <span className="text-pink-500">*</span>
            </label>
            <span className={`text-xs font-bold ${charCount > maxCharCount ? 'text-rose-500' : 'text-slate-400'}`}>
              {charCount} / {maxCharCount} chars
            </span>
          </div>

          <textarea
            rows={8}
            required
            value={formData.birthday_message}
            onChange={(e) => onChange({ birthday_message: e.target.value })}
            placeholder="Write your heart out! Wish them joy, recall favorite moments, or tell them how awesome they are..."
            className="w-full p-4 rounded-2xl border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none text-slate-800 font-medium text-sm leading-relaxed resize-y transition-all"
          />
        </div>
      </div>
    </div>
  );
};
