import React, { useState } from 'react';
import { UploadCloud, X, ArrowLeft, ArrowRight, RefreshCw, Video, Plus, Film } from 'lucide-react';
import type { BirthdayFormInput } from '../../types/birthday';
import { uploadMediaFile } from '../../services/birthdayService';
import { isVideoUrl } from '../../lib/mediaUtils';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
}

export const StepMemories: React.FC<Props> = ({ formData, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (formData.memory_image_urls.length + files.length > 16) {
      setErrorMsg('You can upload a maximum of 16 memory photos & videos.');
      return;
    }

    setErrorMsg(null);
    setIsUploading(true);

    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) continue;
        if (file.size > 25 * 1024 * 1024) {
          setErrorMsg(`File ${file.name} is too large (max 25MB).`);
          continue;
        }

        const bucket = isVideo ? 'birthday-videos' : 'birthday-images';
        const url = await uploadMediaFile(file, bucket);
        if (url) {
          uploadedUrls.push(url);
        }
      }

      onChange({
        memory_image_urls: [...formData.memory_image_urls, ...uploadedUrls],
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Error uploading some files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddVideoUrl = () => {
    const trimmed = videoUrlInput.trim();
    if (!trimmed) return;

    if (formData.memory_image_urls.length >= 16) {
      setErrorMsg('Maximum 16 memories reached.');
      return;
    }

    onChange({
      memory_image_urls: [...formData.memory_image_urls, trimmed],
    });
    setVideoUrlInput('');
    setShowUrlInput(false);
    setErrorMsg(null);
  };

  const removeMedia = (index: number) => {
    const updated = formData.memory_image_urls.filter((_, idx) => idx !== index);
    onChange({ memory_image_urls: updated });
  };

  const moveMedia = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.memory_image_urls.length) return;

    const copy = [...formData.memory_image_urls];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange({ memory_image_urls: copy });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-800">Photo & Video Memories 📸🎥</h3>
        <p className="text-sm text-slate-500 mt-1">
          Upload cherished photos or special video clips (MP4/WebM or Video Link) to showcase in the interactive memory reel.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5 space-y-6">
        {/* Upload Trigger Area */}
        <label className="w-full py-8 border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-pink-50/30 hover:bg-pink-50 transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform mb-3">
            {isUploading ? <RefreshCw className="w-7 h-7 animate-spin" /> : <UploadCloud className="w-7 h-7" />}
          </div>
          <p className="font-bold text-slate-700 text-sm">
            {isUploading ? 'Uploading Media...' : 'Click or Drag & Drop Photos & Videos Here'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Selected: {formData.memory_image_urls.length} / 16 (Photos & MP4 Videos supported)
          </p>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFilesSelect}
            className="hidden"
          />
        </label>

        {/* Video Link Option */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Video className="w-4 h-4 text-pink-500" />
            <span>Have a video URL or YouTube clip?</span>
          </div>

          {!showUrlInput ? (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Video URL
            </button>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="url"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                placeholder="https://... (.mp4 or YouTube URL)"
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-pink-500 outline-none w-full sm:w-60 font-medium"
              />
              <button
                type="button"
                onClick={handleAddVideoUrl}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 cursor-pointer"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {errorMsg && (
          <p className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200">
            {errorMsg}
          </p>
        )}

        {/* Uploaded Thumbnails Grid with Video Tag Badges */}
        {formData.memory_image_urls.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Memory Items ({formData.memory_image_urls.length}) - Drag / Arrow to Reorder
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {formData.memory_image_urls.map((url, idx) => {
                const isVideo = isVideoUrl(url);

                return (
                  <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-200 aspect-square shadow-sm bg-slate-900">
                    {isVideo ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-white p-2">
                        <video
                          src={url}
                          muted
                          playsInline
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 rounded-full bg-pink-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                            <Film className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img src={url} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
                    )}

                    {/* Media Type Badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md text-[10px] font-bold text-white rounded-md flex items-center gap-1 z-10">
                      {isVideo ? <Video className="w-3 h-3 text-pink-400" /> : '📸'} #{idx + 1}
                    </span>

                    {/* Actions overlay */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 z-20">
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => moveMedia(idx, 'left')}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-800 flex items-center justify-center transition-colors"
                          title="Move left"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeMedia(idx)}
                        className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-colors"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {idx < formData.memory_image_urls.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveMedia(idx, 'right')}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-800 flex items-center justify-center transition-colors"
                          title="Move right"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
