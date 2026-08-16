import React, { useState } from 'react';
import { ArrowLeft, Check, Smartphone, Monitor, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BirthdayDesign, BirthdayData } from '../../types/birthday';
import { getThemeById } from '../../config/themes';
import { UniversalDesignDispatcher } from '../public/designs/UniversalDesignDispatcher';

interface Props {
  design: BirthdayDesign | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectDesign: (design: BirthdayDesign) => void;
}

export const DesignPreviewModal: React.FC<Props> = ({
  design,
  isOpen,
  onClose,
  onSelectDesign,
}) => {
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'mobile'>('mobile');

  if (!isOpen || !design) return null;

  const theme = getThemeById(design.theme_id);

  // Build realistic sample data for previewing this specific design
  const sampleBirthdayData: BirthdayData = {
    id: `preview-${design.id}`,
    slug: `preview-${design.id}`,
    name: design.relationship === 'girlfriend' ? 'Sophia' :
          design.relationship === 'parents' ? 'Mom & Dad' :
          design.relationship === 'bestFriend' ? 'Alex' :
          design.relationship === 'sibling' ? 'Lucas' :
          design.relationship === 'collegeFriend' ? 'Maya' :
          design.relationship === 'crush' ? 'Elena' :
          design.relationship === 'teacher' ? 'Prof. Anderson' : 'Sam',
    birthday_date: '2000-08-25',
    nickname: design.relationship === 'girlfriend' ? 'My Sunshine' :
              design.relationship === 'bestFriend' ? 'Partner in Crime' :
              design.relationship === 'sibling' ? 'Chief Troublemaker' : undefined,
    sender_name: 'Jordan',
    relationship_role: design.relationship === 'parents' ? 'Beloved Parents' :
                       design.relationship === 'teacher' ? 'Professor' : undefined,
    experience_type: design.relationship,
    design_id: design.id,
    theme_id: design.theme_id,
    intro_text: 'Wait… I made something special for you ❤️',
    music_url: 'https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-443.mp3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    memory_image_urls: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    ],
    birthday_message: `Happy Birthday! Today is all about celebrating the incredible light, laughter, and joy you bring into my world every single day. Wishing you a year filled with grand adventures and boundless happiness!`,
    custom_ending_message: `Happy Birthday to the Most Wonderful Person! ❤️`,
    story_data: [
      { id: 's1', title: 'The First Day', subtitle: '', date: 'August 2021', description: 'When our journey started and life instantly became brighter.' },
      { id: 's2', title: 'Road Trip Memories', subtitle: '', date: 'Summer 2023', description: 'Windows down, music up, laughing at wrong turns that turned into magic.' },
      { id: 's3', title: 'Today & Always', subtitle: '', date: 'Today', description: 'Celebrating you today, tomorrow, and for all the years to come!' },
    ],
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex flex-col bg-slate-950/95 backdrop-blur-xl">
        {/* Top Control Bar */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-14 sm:h-16 border-b border-slate-800 bg-slate-900/90 px-2.5 sm:px-6 flex items-center justify-between z-20 flex-shrink-0 gap-2"
        >
          {/* Back Button & Design Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:py-2 sm:px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="hidden md:block">
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <span>{design.name}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {design.badge}
                </span>
              </h2>
              <p className="text-xs text-slate-400 truncate max-w-xs lg:max-w-sm">{design.subtitle}</p>
            </div>
          </div>

          {/* Device Frame Viewport Switcher */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setDeviceFrame('mobile')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceFrame === 'mobile'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile View</span>
              <span className="sm:hidden">Mobile</span>
            </button>

            <button
              type="button"
              onClick={() => setDeviceFrame('desktop')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceFrame === 'desktop'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop View</span>
              <span className="sm:hidden">Desktop</span>
            </button>
          </div>

          {/* CTA: Use This Design */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                onSelectDesign(design);
                onClose();
              }}
              className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-pink-500/30 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all transform hover:scale-102"
            >
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Use This Design</span>
              <span className="sm:hidden">Use</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Preview Frame Container */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-6 flex items-start justify-center pb-24 sm:pb-8">
          <div
            className={`w-full transition-all duration-300 ${
              deviceFrame === 'mobile'
                ? 'max-w-sm sm:max-w-md bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2.5rem] p-3 sm:p-6 border-2 sm:border-8 border-slate-800 shadow-2xl min-h-[600px] my-2 sm:my-4'
                : 'max-w-5xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3 sm:p-10 border-2 sm:border-4 border-slate-800 shadow-2xl my-2 sm:my-4'
            }`}
          >
            {/* Render sample birthday directly with the selected design */}
            <div className="relative">
              <UniversalDesignDispatcher
                birthday={sampleBirthdayData}
                theme={theme}
              />
            </div>
          </div>
        </div>

        {/* Bottom Floating Bar on Mobile */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 p-3 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 z-30 flex items-center justify-between gap-3">
          <div className="truncate">
            <p className="text-xs font-bold text-white truncate">{design.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{design.badge}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelectDesign(design);
              onClose();
            }}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-black text-xs shadow-md flex items-center gap-1.5 flex-shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Use Design</span>
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
};
