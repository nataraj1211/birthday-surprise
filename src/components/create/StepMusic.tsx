import React, { useState } from 'react';
import { Music, UploadCloud, RefreshCw, Check } from 'lucide-react';
import type { BirthdayFormInput } from '../../types/birthday';
import { uploadMediaFile } from '../../services/birthdayService';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
}

const PRESET_MELODIES = [
  {
    name: 'Sweet Piano Melody 🎹 (Romantic & Emotional)',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sweet-piano-112677.mp3',
  },
  {
    name: 'Acoustic Warmth & Joy 🎸 (Heartfelt & Family)',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a829e1.mp3?filename=acoustic-guitar-10827.mp3',
  },
  {
    name: 'Cinematic Dream Ambient ✨ (Stardust & Mystery)',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=dream-piano-10777.mp3',
  },
];

export const StepMusic: React.FC<Props> = ({ formData, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please upload a valid audio file (MP3, WAV, M4A).');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadMediaFile(file, 'birthday-music');
      onChange({ music_url: url });
    } catch (err) {
      console.error(err);
      alert('Failed to upload audio file. Please try another song.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-xl mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-800">Background Music (Optional) 🎵</h3>
        <p className="text-sm text-slate-500 mt-1">
          Add an uplifting background melody that plays softly after they open their surprise.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5 space-y-6">
        {/* Preset Tracks */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Choose a Royalty-Free Preset Melody
          </h4>
          <div className="space-y-2.5">
            {PRESET_MELODIES.map((preset, idx) => {
              const isSelected = formData.music_url === preset.url;
              return (
                <div
                  key={idx}
                  onClick={() => onChange({ music_url: preset.url })}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold shadow-md shadow-pink-500/10'
                      : 'border-slate-200 hover:border-pink-300 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                      <Music className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{preset.name}</span>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-pink-500 stroke-[3]" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-bold tracking-wider">or upload custom MP3</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Custom Audio Upload */}
        <label className="w-full py-6 border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-pink-50/30 hover:bg-pink-50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-pink-500 mb-2">
            {isUploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
          </div>
          <span className="text-xs font-bold text-slate-700">
            {isUploading ? 'Uploading Music...' : 'Upload Custom MP3 Audio File'}
          </span>
          <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
        </label>

        {/* No Music Option */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => onChange({ music_url: null })}
            className={`text-xs font-semibold ${
              formData.music_url === null ? 'text-pink-600 underline' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            No Music (Keep Birthday Experience Quiet)
          </button>
        </div>
      </div>
    </div>
  );
};
