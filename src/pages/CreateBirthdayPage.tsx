import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import type { BirthdayFormInput, BirthdayData, RelationshipType } from '../types/birthday';
import { SAMPLE_BIRTHDAY } from '../config/defaultData';
import { createBirthday, updateBirthday, getBirthdayById } from '../services/birthdayService';
import { getDesignById, getDefaultDesignForRelationship, ALL_RELATIONSHIPS } from '../config/designsConfig';
import { StepBasicDetails } from '../components/create/StepBasicDetails';
import { StepExperienceSelector } from '../components/create/StepExperienceSelector';
import { StepProfilePhoto } from '../components/create/StepProfilePhoto';
import { StepMemories } from '../components/create/StepMemories';
import { StepStoryTimeline } from '../components/create/StepStoryTimeline';
import { StepMessage } from '../components/create/StepMessage';
import { StepThemeSelector } from '../components/create/StepThemeSelector';
import { StepMusic } from '../components/create/StepMusic';
import { StepLivePreview } from '../components/create/StepLivePreview';
import { ShareModal } from '../components/create/ShareModal';
import { useAuth } from '../context/useAuth';

export const CreateBirthdayPage: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryRel = searchParams.get('rel') as RelationshipType | null;
  const queryDesign = searchParams.get('design');

  const initialRel: RelationshipType =
    queryRel && ALL_RELATIONSHIPS.some((r) => r.id === queryRel) ? queryRel : 'girlfriend';

  const initialDesignId =
    queryDesign && getDesignById(queryDesign)
      ? queryDesign
      : getDefaultDesignForRelationship(initialRel);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBirthday, setCreatedBirthday] = useState<BirthdayData | null>(null);

  const [formData, setFormData] = useState<BirthdayFormInput>({
    name: '',
    birthday_date: new Date().toISOString().split('T')[0],
    sender_name: '',
    profile_image_url: SAMPLE_BIRTHDAY.profile_image_url,
    memory_image_urls: SAMPLE_BIRTHDAY.memory_image_urls,
    intro_text: 'Wait… I made something special for you ❤️',
    birthday_message: SAMPLE_BIRTHDAY.birthday_message,
    music_url: SAMPLE_BIRTHDAY.music_url,
    theme_id: 'rose-romance',
    relationship_type: initialRel,
    experience_type: initialRel,
    design_id: initialDesignId,
    relationship_role: 'My Love',
    nickname: '',
    custom_ending_message: 'Happy Birthday, My Love ❤️',
    story_data: SAMPLE_BIRTHDAY.story_data,
  });

  useEffect(() => {
    if (id) {
      getBirthdayById(id).then((found) => {
        if (found) {
          const rel = found.relationship_type || found.experience_type || 'girlfriend';
          setFormData({
            name: found.name,
            birthday_date: found.birthday_date,
            sender_name: found.sender_name,
            profile_image_url: found.profile_image_url,
            memory_image_urls: found.memory_image_urls,
            intro_text: found.intro_text,
            birthday_message: found.birthday_message,
            music_url: found.music_url,
            theme_id: found.theme_id,
            relationship_type: rel,
            experience_type: rel,
            design_id: found.design_id || getDefaultDesignForRelationship(rel),
            relationship_role: found.relationship_role || '',
            nickname: found.nickname || '',
            custom_ending_message: found.custom_ending_message || '',
            story_data: found.story_data,
          });
        }
      });
    }
  }, [id]);

  const updateForm = (fields: Partial<BirthdayFormInput>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };
      // Sync relationship_type and experience_type
      if (fields.relationship_type && !fields.experience_type) {
        updated.experience_type = fields.relationship_type;
      }
      if (fields.experience_type && !fields.relationship_type) {
        updated.relationship_type = fields.experience_type;
      }
      return updated;
    });
  };

  const stepsList = [
    { num: 1, title: 'Experience' },
    { num: 2, title: 'Details' },
    { num: 3, title: 'Profile' },
    { num: 4, title: 'Memories' },
    { num: 5, title: 'Story' },
    { num: 6, title: 'Message' },
    { num: 7, title: 'Theme' },
    { num: 8, title: 'Music' },
    { num: 9, title: 'Preview' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim()) {
      alert("Please enter the birthday person's name.");
      setStep(2);
      return;
    }

    if (!formData.sender_name.trim()) {
      alert('Please enter your name.');
      setStep(2);
      return;
    }

    if (!formData.birthday_message.trim()) {
      alert('Please enter a birthday message.');
      setStep(6);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: BirthdayFormInput = {
        ...formData,
        user_id: user?.id,
      };

      if (id) {
        const updated = await updateBirthday(id, payload);
        setCreatedBirthday(updated);
      } else {
        const created = await createBirthday(payload);
        setCreatedBirthday(created);
      }
    } catch (err: unknown) {
      console.error('Error publishing birthday surprise to Supabase:', err);
      const msg =
        err instanceof Error
          ? err.message
          : "We couldn't publish your birthday surprise. Please check your connection and try again.";
      alert(`Could not publish surprise: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 py-5 sm:py-10 px-2.5 sm:px-4 pb-28 md:pb-12">
      <div className="max-w-5xl mx-auto space-y-5 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-1.5 sm:space-y-2">
          <h1 className="text-xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {id ? 'Edit Birthday Surprise 🪄' : 'Create Your Personalized Birthday Experience 🎂'}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Personalize mood, animations, wish cards, timeline & music for someone special.
          </p>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="bg-white p-2.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md">
          <div className="flex items-center overflow-x-auto pb-1 gap-1.5 sm:gap-2 max-w-full no-scrollbar">
            {stepsList.map((s) => {
              const isCurrent = step === s.num;
              const isCompleted = step > s.num;

              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(s.num)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                      : isCompleted
                      ? 'bg-pink-50 text-pink-700 border border-pink-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] flex items-center justify-center font-black ${
                      isCurrent ? 'bg-white text-pink-600' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {s.num}
                  </span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Form Step Renderer */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {step === 1 && <StepExperienceSelector formData={formData} onChange={updateForm} onNext={() => setStep(2)} />}
          {step === 2 && <StepBasicDetails formData={formData} onChange={updateForm} />}
          {step === 3 && <StepProfilePhoto formData={formData} onChange={updateForm} />}
          {step === 4 && <StepMemories formData={formData} onChange={updateForm} />}
          {step === 5 && <StepStoryTimeline formData={formData} onChange={updateForm} />}
          {step === 6 && <StepMessage formData={formData} onChange={updateForm} />}
          {step === 7 && <StepThemeSelector formData={formData} onChange={updateForm} />}
          {step === 8 && <StepMusic formData={formData} onChange={updateForm} />}
          {step === 9 && <StepLivePreview formData={formData} />}

          {/* Form Control Buttons */}
          <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-200 gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 9 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm shadow-md sm:shadow-lg shadow-pink-500/25 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-xs sm:text-base shadow-xl shadow-pink-500/30 transition-all flex items-center gap-2 ml-auto ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Saving to Cloud...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="truncate">{id ? 'Update Surprise 🪄' : 'Generate Surprise ✨'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Share Modal Trigger on Completion */}
      {createdBirthday && (
        <ShareModal
          birthday={createdBirthday}
          onClose={() => {
            setCreatedBirthday(null);
            navigate('/dashboard');
          }}
        />
      )}
    </div>
  );
};
