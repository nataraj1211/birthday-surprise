import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Gift, Palette, Camera, Mail, Share2, MessageCircle, ArrowRight, Layers } from 'lucide-react';
import { SAMPLE_BIRTHDAY } from '../config/defaultData';
import { getThemeById } from '../config/themes';
import { BirthdayHero } from '../components/public/BirthdayHero';
import { DesignSelectionModal } from '../components/designs/DesignSelectionModal';
import type { RelationshipType, BirthdayDesign } from '../types/birthday';

export const LandingPage: React.FC = () => {
  const sampleTheme = getThemeById('sakura-dream');
  const navigate = useNavigate();

  const [selectedRelForModal, setSelectedRelForModal] = useState<RelationshipType | null>(null);

  const handleSelectDesignFromModal = (design: BirthdayDesign) => {
    navigate(`/create?rel=${design.relationship}&design=${design.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-pink-300/40 via-purple-300/30 to-amber-200/40 blur-3xl -z-10 rounded-full animate-pulse-glow" />

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
            <span>40 Unique Birthday Website Experiences</span>
          </div>

          <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            BIRTHDAY BLOOM
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold shimmer-text max-w-2xl mx-auto px-2">
            "Create a little surprise. Share a beautiful memory. 💕"
          </p>

          <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-xl mx-auto font-medium leading-relaxed px-2">
            Create an unforgettable, personalized birthday experience in minutes with 40 bespoke designs for every relationship.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto sm:max-w-none">
            <Link
              to="/create"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Birthday Surprise ✨</span>
            </Link>

            <Link
              to="/designs"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-slate-700 font-extrabold text-sm sm:text-base border border-slate-200 shadow-md hover:bg-slate-50 hover:border-pink-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-pink-500" />
              <span>Explore All 40 Designs</span>
            </Link>
          </div>
        </div>

        {/* HERO ANIMATED MOCKUP PREVIEW */}
        <div className="mt-10 sm:mt-14 max-w-3xl mx-auto px-1 sm:px-2">
          <div className="relative rounded-2xl sm:rounded-[40px] border-4 sm:border-8 border-slate-900 shadow-2xl overflow-hidden bg-white group">
            {/* Top Device Bar */}
            <div className="bg-slate-900 px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between text-white text-[11px] sm:text-xs font-semibold gap-2">
              <span className="flex items-center gap-1.5 text-pink-400 flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Surprise Preview
              </span>
              <span className="text-slate-400 truncate max-w-[150px] sm:max-w-none">
                birthdaybloom.com/birthday/7xK92Lm
              </span>
            </div>

            {/* Mockup Frame Content */}
            <div
              className="p-4 sm:p-12 text-center space-y-4 sm:space-y-6"
              style={{ background: sampleTheme.colors.bgGradient, color: sampleTheme.colors.text }}
            >
              <BirthdayHero birthday={SAMPLE_BIRTHDAY} theme={sampleTheme} />

              <div className="pt-2">
                <Link
                  to="/birthday/demo"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: sampleTheme.colors.buttonBg }}
                >
                  <Gift className="w-4 h-4" /> Open Full Interactive Surprise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT FEATURES GRID */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Everything You Need for a Breathtaking Surprise 🎁
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto font-medium">
            Designed like an Instagram story meets a luxury digital memory book.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Gift className="w-6 h-6 text-pink-500" />,
              title: '🎂 40 Unique Designs (8 Modules)',
              desc: '5 dedicated designs for each relationship: Romantic Rose, Sibling Roast, Wrapped Stats, Campus ID, and more.',
            },
            {
              icon: <Palette className="w-6 h-6 text-purple-500" />,
              title: '🎨 12+ Beautiful Themes',
              desc: 'Sakura Dream, Purple Galaxy, Golden Luxury, Ocean Dream with tailored particle physics.',
            },
            {
              icon: <Camera className="w-6 h-6 text-rose-500" />,
              title: '📸 Memory Gallery',
              desc: 'Masonry photo gallery with smooth hover zooms and full-screen swipe Lightbox viewer.',
            },
            {
              icon: <Mail className="w-6 h-6 text-amber-500" />,
              title: '💌 Personal Message',
              desc: 'Heartfelt personal letter revealed with an emotional real-time typewriter effect.',
            },
            {
              icon: <Share2 className="w-6 h-6 text-cyan-500" />,
              title: '🔗 Unique Public URL',
              desc: 'Every surprise gets its own unique short link (e.g. /birthday/7xK92Lm) ready to share.',
            },
            {
              icon: <MessageCircle className="w-6 h-6 text-emerald-500" />,
              title: '💚 WhatsApp Sharing',
              desc: 'One-click formatted WhatsApp invitation template to send straight to their phone.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-pink-200 transition-all space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* 8 Birthday Experience Types Banner - Clickable Cards! */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-10 rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white space-y-6 sm:space-y-8 shadow-2xl border border-white/10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="inline-block text-[11px] sm:text-xs font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
              Interactive Relationship Modules
            </span>
            <h3 className="text-2xl sm:text-4xl font-black">
              Tailored For Exactly Who They Are ✨
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Click any relationship below to explore 5 unique, dedicated birthday designs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { id: 'girlfriend', emoji: '❤️', title: 'Girlfriend / Lover', mood: '5 Romantic Designs', img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80' },
              { id: 'parents', emoji: '👨‍👩‍👦', title: 'Parents', mood: '5 Legacy Designs', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80' },
              { id: 'bestFriend', emoji: '🫂', title: 'Best Friend', mood: '5 Wrapped & Memes', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80' },
              { id: 'sibling', emoji: '👦', title: 'Brother / Sister', mood: '5 Roast & Arcade', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
              { id: 'collegeFriend', emoji: '🎓', title: 'College Friend', mood: '5 Campus ID & Bunk', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80' },
              { id: 'crush', emoji: '💖', title: 'Crush', mood: '5 Lavender & Secret Note', img: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80' },
              { id: 'teacher', emoji: '👨‍🏫', title: 'Teacher / Mentor', mood: '5 Royal Navy & Slate', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80' },
              { id: 'specialPerson', emoji: '✨', title: 'Special Person', mood: '5 Mystery & Stars', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80' },
            ].map((exp) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => setSelectedRelForModal(exp.id as RelationshipType)}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800/80 hover:bg-slate-800 border border-white/10 hover:border-pink-500/60 p-2 sm:p-4 space-y-2 transition-all text-left cursor-pointer transform hover:-translate-y-1 hover:shadow-xl shadow-md flex flex-col justify-between"
              >
                {/* Thumbnail Image Header */}
                <div className="relative h-20 sm:h-28 w-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={exp.img}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-base sm:text-xl drop-shadow-md">{exp.emoji}</span>
                  <span className="absolute bottom-1.5 left-1.5 sm:left-2 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-pink-300 bg-black/60 px-1.5 sm:px-2 py-0.5 rounded-full border border-pink-500/30">
                    5 Designs
                  </span>
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-[11px] sm:text-sm font-bold text-white group-hover:text-pink-300 transition-colors truncate">
                    {exp.title}
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-slate-300/80 font-medium truncate">
                    {exp.mood}
                  </p>
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold text-pink-400 group-hover:text-white flex items-center justify-between pt-1 border-t border-white/10">
                  <span>Explore</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>

          <div className="text-center pt-1 sm:pt-2">
            <Link
              to="/designs"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              <Layers className="w-4 h-4 text-pink-400" />
              <span>Explore All 40 Designs Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 py-12 bg-white rounded-[40px] border border-pink-100 shadow-xl shadow-pink-500/5">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            How Birthday Bloom Works 🌸
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { step: '01', title: 'Choose Design', desc: 'Pick from 40 bespoke designs tailored for your special person.' },
            { step: '02', title: 'Customize', desc: 'Enter their name, date, photos, timeline & heartfelt letter.' },
            { step: '03', title: 'Preview', desc: 'Test live mobile and desktop interactive previews with music.' },
            { step: '04', title: 'Share', desc: 'Send your unique short URL via WhatsApp and watch them smile!' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/60 space-y-3 text-center">
              <span className="text-3xl font-black text-pink-500">{item.step}</span>
              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 transition-all"
          >
            <span>Start Creating Now ✨</span>
          </Link>
        </div>
      </section>

      {/* Design Selection Modal triggered by clicking any relationship card */}
      <DesignSelectionModal
        isOpen={selectedRelForModal !== null}
        onClose={() => setSelectedRelForModal(null)}
        selectedRelationship={selectedRelForModal || 'girlfriend'}
        onSelectRelationship={(rel) => setSelectedRelForModal(rel)}
        onSelectDesign={handleSelectDesignFromModal}
      />
    </div>
  );
};

