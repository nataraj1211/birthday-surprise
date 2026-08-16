import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Heart, PlusCircle, LayoutDashboard, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  // Hide Navbar on public birthday pages for a pure clean cinematic experience
  if (location.pathname.startsWith('/birthday/')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b border-pink-100/90 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-0.5 shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base sm:text-xl tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 bg-clip-text text-transparent leading-none">
              BIRTHDAY BLOOM
            </span>
            <span className="hidden sm:inline-block text-[10px] font-bold text-pink-400 mt-0.5">
              Surprise Generator 💕
            </span>
          </div>
        </Link>

        {/* Navigation Menu at Top */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* Home Link */}
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              location.pathname === '/'
                ? 'bg-pink-50 text-pink-600 border border-pink-200 shadow-xs'
                : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4 text-pink-500" />
            <span>Home</span>
          </Link>

          {/* Designs Link */}
          <Link
            to="/designs"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              location.pathname.startsWith('/designs')
                ? 'bg-pink-50 text-pink-600 border border-pink-200 shadow-xs'
                : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Designs</span>
          </Link>

          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              location.pathname === '/dashboard'
                ? 'bg-pink-50 text-pink-600 border border-pink-200 shadow-xs'
                : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-purple-500" />
            <span>Dashboard</span>
          </Link>

          {/* Demo Link */}
          <Link
            to="/birthday/demo"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-purple-600 hover:bg-purple-50 transition-all border border-purple-100/80 ${
              location.pathname === '/birthday/demo' ? 'bg-purple-50 ring-1 ring-purple-300' : ''
            }`}
          >
            <Heart className="w-4 h-4 text-purple-500 fill-purple-200" />
            <span>Demo</span>
          </Link>

          {/* Create Button */}
          <Link
            to="/create"
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Create Birthday</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
