import React, { useRef, useState, useEffect } from 'react';
import { Download, X, PartyPopper, LayoutDashboard, Check } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import type { BirthdayData } from '../../types/birthday';

interface Props {
  birthday: BirthdayData;
  onClose: () => void;
}

export const ShareModal: React.FC<Props> = ({ birthday, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);
  const qrWrapperRef = useRef<HTMLDivElement>(null);

  // Exact complete production URL starting with https://
  const slug = birthday.slug;
  const birthdayUrl = `https://prise-vert-rho.vercel.app/birthday/${slug}`;

  useEffect(() => {
    // Development-only console log verification as required
    console.log("QR CODE URL:", birthdayUrl);
  }, [birthdayUrl]);

  const handleDownloadQR = () => {
    const canvas = qrWrapperRef.current?.querySelector('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    // Create high quality PNG download
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `birthday-surprise-${birthday.slug}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-300 text-center border border-pink-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          title="Close"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Festive Icon & Heading */}
        <div className="space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
            <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            🎉 Birthday Surprise Created!
          </h2>
        </div>

        {/* Centered QR Code Card with pure white background & full quiet zone */}
        <div className="bg-gradient-to-b from-pink-50 via-purple-50 to-white p-4 sm:p-5 rounded-2xl border border-pink-100/80 shadow-inner flex flex-col items-center justify-center">
          <div
            ref={qrWrapperRef}
            className="p-4 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center"
          >
            <QRCodeCanvas
              value={birthdayUrl}
              size={320}
              level="H"
              bgColor="#FFFFFF"
              fgColor="#000000"
              marginSize={4}
              style={{ width: '100%', maxWidth: '320px', height: 'auto', display: 'block' }}
            />

          </div>

          <p className="text-sm font-semibold text-slate-700 mt-4">
            Scan this QR code to open the birthday surprise 💖
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {/* Download QR Code Button */}
          <button
            type="button"
            onClick={handleDownloadQR}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {downloaded ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span>Downloaded QR Code!</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download QR Code</span>
              </>
            )}
          </button>

          {/* Go to Dashboard Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-pink-500" />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};


