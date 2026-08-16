import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Share2, MessageCircle, PartyPopper, X, LayoutDashboard } from 'lucide-react';
import type { BirthdayData } from '../../types/birthday';
import { getBirthdayShareUrl } from '../../services/birthdayService';

interface Props {
  birthday: BirthdayData;
  onClose: () => void;
}

export const ShareModal: React.FC<Props> = ({ birthday, onClose }) => {
  const [copied, setCopied] = useState(false);

  const publicUrl = getBirthdayShareUrl(birthday);
  const displayUrl = `${window.location.origin}/birthday/${birthday.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = `Hey! I made a little birthday surprise for you 🎂💖\n\nOpen it here:\n${publicUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Surprise for ${birthday.name}! 🎂`,
          text: `Hey! I made a little birthday surprise for you 🎂💖`,
          url: publicUrl,
        });
      } catch (err) {
        console.log('Share dismissed:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6 relative animate-in zoom-in-95 duration-300 text-center border border-pink-100">
        {/* Top Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          title="Close & Go to Dashboard"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 animate-bounce">
          <PartyPopper className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-xl sm:text-3xl font-extrabold text-slate-800">
            Your Birthday Surprise is Ready! 🎉
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto">
            Saved to your Dashboard! Share this special link with <span className="font-bold text-pink-600">{birthday.name}</span> to reveal their interactive birthday story.
          </p>
        </div>

        {/* Public Link Box */}
        <div className="p-2.5 sm:p-3.5 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate text-left pl-1 sm:pl-2">
            {displayUrl}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-pink-500/20 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span>Share on WhatsApp 💚</span>
          </a>

          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Open Birthday Page 🎂</span>
          </a>
        </div>

        {/* Dashboard button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4 text-pink-500" />
          <span>View All in Dashboard 📊</span>
        </button>

        <div className="flex items-center justify-center pt-2 text-xs">
          <button
            onClick={handleWebShare}
            className="text-slate-600 hover:text-pink-600 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-pink-500" />
            <span>Native Share 📤</span>
          </button>
        </div>
      </div>
    </div>
  );
};
