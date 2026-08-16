import React, { useState } from 'react';
import { Camera, X, RefreshCw } from 'lucide-react';
import type { BirthdayFormInput } from '../../types/birthday';
import { uploadMediaFile } from '../../services/birthdayService';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
}

export const StepProfilePhoto: React.FC<Props> = ({ formData, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size must be smaller than 10MB.');
      return;
    }

    setErrorMsg(null);
    setIsUploading(true);

    try {
      const url = await uploadMediaFile(file, 'birthday-images');
      onChange({ profile_image_url: url });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to upload photo. Please try another image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-lg mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-800">Profile Photo ✨</h3>
        <p className="text-sm text-slate-500 mt-1">
          Choose their best picture to feature inside the opening frame.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5 text-center flex flex-col items-center">
        {formData.profile_image_url ? (
          <div className="relative group">
            <div className="w-44 h-44 rounded-full p-2 bg-gradient-to-tr from-pink-500 via-purple-500 to-rose-400 shadow-xl shadow-pink-500/30 overflow-hidden">
              <img
                src={formData.profile_image_url}
                alt="Profile preview"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <button
              type="button"
              onClick={() => onChange({ profile_image_url: '' })}
              className="absolute top-1 right-1 w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
              title="Remove photo"
            >
              <X className="w-5 h-5" />
            </button>

            <label className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl cursor-pointer border border-pink-200 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Change Profile Photo
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </label>
          </div>
        ) : (
          <label className="w-full h-56 border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer bg-pink-50/40 hover:bg-pink-50 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform mb-3">
              {isUploading ? (
                <RefreshCw className="w-8 h-8 animate-spin" />
              ) : (
                <Camera className="w-8 h-8" />
              )}
            </div>
            <p className="font-bold text-slate-700 text-sm">
              {isUploading ? 'Uploading Profile Photo...' : 'Click to Upload Profile Photo'}
            </p>
            <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
            <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </label>
        )}

        {errorMsg && (
          <p className="text-xs font-semibold text-rose-500 mt-3 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
};
