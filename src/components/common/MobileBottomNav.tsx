import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Plus, LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Hide completely on public birthday presentation pages so the experience remains fully cinematic
  if (location.pathname.startsWith('/birthday/')) {
    return null;
  }

  const isHome = location.pathname === '/';
  const isDesigns = location.pathname.startsWith('/designs');
  const isCreate = location.pathname.startsWith('/create') || location.pathname.startsWith('/edit');
  const isDashboard = location.pathname === '/dashboard';
  const isAuth = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/92 backdrop-blur-xl border-t border-pink-100/90 shadow-[0_-4px_24px_rgba(236,72,153,0.12)] transition-all duration-300"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-1.5 max-w-md mx-auto">
        {/* 1. Home Tab */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            isHome
              ? 'text-pink-600 scale-105 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${isHome ? 'bg-pink-100/80' : ''}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Home</span>
        </Link>

        {/* 2. Designs Tab */}
        <Link
          to="/designs"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
            isDesigns
              ? 'text-pink-600 scale-105 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors relative ${isDesigns ? 'bg-pink-100/80' : ''}`}>
            <Sparkles className="w-5 h-5" />
            <span className="absolute -top-1 -right-1.5 px-1 py-0.2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[8px] font-black rounded-full leading-tight">
              40
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Designs</span>
        </Link>

        {/* 3. Center Action Button: Create Birthday Surprise */}
        <Link
          to="/create"
          className="flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95 cursor-pointer group"
          title="Create Birthday Surprise"
        >
          <div
            className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              isCreate
                ? 'bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-600 ring-4 ring-pink-300 shadow-pink-500/40 scale-105'
                : 'bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 shadow-pink-500/35 group-hover:scale-105'
            }`}
          >
            <Plus className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-extrabold text-pink-600 tracking-tight mt-1">
            Create
          </span>
        </Link>

        {/* 4. Dashboard Tab */}
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            isDashboard
              ? 'text-pink-600 scale-105 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${isDashboard ? 'bg-pink-100/80' : ''}`}>
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Dashboard</span>
        </Link>

        {/* 5. Profile / Auth Tab */}
        {user ? (
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              location.pathname === '/dashboard' ? 'text-pink-600' : 'text-slate-500'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 p-0.5 flex items-center justify-center shadow-xs">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[10px] font-black text-pink-600 uppercase">
                {user.email?.[0] || 'U'}
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5 truncate max-w-[48px]">
              Profile
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isAuth
                ? 'text-pink-600 scale-105 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${isAuth ? 'bg-pink-100/80' : ''}`}>
              <LogIn className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};
