import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { BirthdayFormInput, StoryItem } from '../../types/birthday';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
}

export const StepStoryTimeline: React.FC<Props> = ({ formData, onChange }) => {
  const stories = formData.story_data || [];

  const updateStory = (index: number, updatedItem: Partial<StoryItem>) => {
    const updated = stories.map((item, idx) => (idx === index ? { ...item, ...updatedItem } : item));
    onChange({ story_data: updated });
  };

  const addStoryItem = () => {
    const newItem: StoryItem = {
      id: Date.now().toString(),
      title: 'New Special Moment ✨',
      subtitle: 'A sweet memory',
      description: 'Write a few lines about this wonderful milestone...',
    };
    onChange({ story_data: [...stories, newItem] });
  };

  const removeStoryItem = (index: number) => {
    if (stories.length <= 1) return;
    const updated = stories.filter((_, idx) => idx !== index);
    onChange({ story_data: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-800">Our Little Story Timeline 🌸</h3>
        <p className="text-sm text-slate-500 mt-1">
          Customize the milestones of your friendship or relationship journey.
        </p>
      </div>

      <div className="space-y-4">
        {stories.map((story, idx) => (
          <div
            key={story.id || idx}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-pink-100 shadow-lg shadow-pink-500/5 space-y-4 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                Milestone #{idx + 1}
              </span>
              {stories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStoryItem(idx)}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  title="Delete milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  value={story.title}
                  onChange={(e) => updateStory(idx, { title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-pink-500 outline-none text-sm font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={story.subtitle}
                  onChange={(e) => updateStory(idx, { subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-pink-500 outline-none text-sm font-medium text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
              <textarea
                rows={2}
                value={story.description}
                onChange={(e) => updateStory(idx, { description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-pink-500 outline-none text-sm text-slate-700 resize-none"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addStoryItem}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-pink-300 hover:border-pink-500 text-pink-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-pink-50 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Another Story Milestone
        </button>
      </div>
    </div>
  );
};
