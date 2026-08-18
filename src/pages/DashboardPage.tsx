import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ExternalLink, QrCode, Edit, Trash2, Calendar, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import type { BirthdayData } from '../types/birthday';
import { getAllBirthdays, deleteBirthday, getBirthdayShareUrl } from '../services/birthdayService';
import { getThemeById } from '../config/themes';
import { ShareModal } from '../components/create/ShareModal';
import { useAuth } from '../context/useAuth';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [birthdays, setBirthdays] = useState<BirthdayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBirthdayForQR, setSelectedBirthdayForQR] = useState<BirthdayData | null>(null);

  const loadBirthdays = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // Strictly load ONLY this user's private birthday records
      const data = await getAllBirthdays(user.id);
      setBirthdays(data);
    } catch (err) {
      console.error('Error loading birthdays:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadBirthdays();
  }, [loadBirthdays]);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the birthday surprise for "${name}"?`)) {
      await deleteBirthday(id);
      loadBirthdays();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
              <span>Private Dashboard • {user?.email}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your Birthday Surprises 🎉
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Manage your created surprise experiences, access QR codes, and edit messages.
            </p>
          </div>

          <Link
            to="/create"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-pink-500/25 transition-transform hover:scale-105 flex-shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create New Birthday +</span>
          </Link>
        </div>

        {/* Birthday Cards Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin mx-auto mb-3" />
            <p className="text-slate-500 font-semibold">Loading your private birthday pages...</p>
          </div>
        ) : birthdays.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-md space-y-4 max-w-lg mx-auto">
            <Sparkles className="w-12 h-12 text-pink-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">No Birthday Surprises Yet</h3>
            <p className="text-slate-500 text-sm">
              Create your very first birthday surprise website in just a few clicks!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500 text-white font-bold text-sm shadow-md shadow-pink-500/20 hover:bg-pink-600 transition-colors"
            >
              <PlusCircle className="w-4 h-4" /> Create Birthday Surprise
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdays.map((item) => {
              const theme = getThemeById(item.theme_id);
              const openUrl = getBirthdayShareUrl(item);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Top Thumbnail Header */}
                  <div
                    className="p-5 relative overflow-hidden flex items-center gap-4"
                    style={{ background: theme.colors.bgGradient }}
                  >
                    <div className="w-16 h-16 rounded-full p-1 bg-white shadow-md flex-shrink-0">
                      <img
                        src={item.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-pink-500 text-white shadow-xs">
                          {item.relationship_type || item.experience_type || 'girlfriend'}
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-white/80 backdrop-blur-md shadow-xs text-slate-700">
                          {theme.emoji} {theme.name}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                      <p className="text-xs font-semibold text-slate-600 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-pink-500" /> {item.birthday_date}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="p-3 bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-2xl border border-pink-100/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                          <Heart className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 block leading-tight">Created by</span>
                          <span className="text-xs font-bold text-slate-700">{item.sender_name || 'Anonymous'}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedBirthdayForQR(item)}
                        className="px-3 py-1.5 rounded-xl bg-white border border-pink-200 hover:border-pink-400 text-pink-600 hover:text-pink-700 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>QR Code</span>
                      </button>
                    </div>

                    {/* Actions Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSelectedBirthdayForQR(item)}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-pink-500/20 cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Get QR Code</span>
                      </button>

                      <a
                        href={openUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Open Page
                      </a>

                      <Link
                        to={`/edit/${item.id}`}
                        className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.name)}
                        className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {selectedBirthdayForQR && (
        <ShareModal
          birthday={selectedBirthdayForQR}
          onClose={() => setSelectedBirthdayForQR(null)}
        />
      )}
    </div>
  );
};
