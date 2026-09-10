import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Heart, PlusCircle, LayoutDashboard, Home, LogIn, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/useAuth';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Hide Navbar on public birthday pages for a pure clean cinematic experience
  if (location.pathname.startsWith('/birthday/')) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-pink-100/90 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-0.5 shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <div className="w-full h-full bg-white rounded-[13px] sm:rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm sm:text-xl tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 bg-clip-text text-transparent leading-none">
              BIRTHDAY BLOOM
            </span>
            <span className="hidden sm:inline-block text-[10px] font-bold text-pink-400 mt-0.5">
              Surprise Generator 💕
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
              location.pathname === '/'
                ? 'bg-pink-50 text-pink-600 border border-pink-200 shadow-xs'
                : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4 text-pink-500" />
            <span>Home</span>
          </Link>

          <Link
            to="/designs"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
              location.pathname.startsWith('/designs')
                ? 'bg-pink-50 text-pink-600 border border-pink-200 shadow-xs'
                : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Designs</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
              location.pathname === '/dashboard'
                ? 'bg-pink-50 text-pink-600 border border-pink-200 shadow-xs'
                : 'text-slate-600 hover:text-pink-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-purple-500" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/birthday/demo"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-purple-600 hover:bg-purple-50 transition-all border border-purple-100/80 ${
              location.pathname === '/birthday/demo' ? 'bg-purple-50 ring-1 ring-purple-300' : ''
            }`}
          >
            <Heart className="w-4 h-4 text-purple-500 fill-purple-200" />
            <span>Demo</span>
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-sm font-extrabold shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Birthday</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
              <Link
                to="/dashboard"
                title={user.email || 'Signed in'}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 text-slate-700 text-xs font-semibold max-w-[150px] truncate transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="truncate">{user.email?.split('@')[0]}</span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                title="Sign Out"
                className="flex items-center gap-1 p-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-pink-600 hover:bg-pink-50/50 border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-pink-500" />
              <span>Sign In</span>
            </Link>
          )}
        </nav>

        {/* Mobile Header Quick Actions (Hamburger Menu + Profile/Sign In) */}
        <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
          <Link
            to="/create"
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-transform flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create</span>
          </Link>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              mobileMenuOpen
                ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
                : 'bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-600'
            }`}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-pink-100/90 bg-white/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="px-4 py-4 space-y-2 max-w-md mx-auto">
              {/* User Identity Banner in Menu */}
              {user ? (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 block truncate">{user.email}</span>
                      <span className="text-[10px] text-pink-600 font-semibold block">Signed In Account</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-xs font-bold text-rose-600 hover:bg-rose-100/60 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4 text-pink-500" />
                    <span className="text-xs font-semibold text-slate-600">Save and edit your surprises</span>
                  </div>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-pink-500 text-white text-xs font-bold shadow-xs hover:bg-pink-600 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Navigation Items */}
              <div className="grid grid-cols-1 gap-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    location.pathname === '/'
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
                      : 'text-slate-700 hover:bg-pink-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/designs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    location.pathname.startsWith('/designs')
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
                      : 'text-slate-700 hover:bg-pink-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Explore 40 Website Designs</span>
                  </div>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-pink-100 text-pink-600">
                    40 Themes
                  </span>
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    location.pathname === '/dashboard'
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
                      : 'text-slate-700 hover:bg-pink-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Birthday Surprises Dashboard</span>
                </Link>

                <Link
                  to="/birthday/demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    location.pathname === '/birthday/demo'
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
                      : 'text-slate-700 hover:bg-pink-50'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>View Live Demo Experience</span>
                </Link>
              </div>

              {/* Main CTA in Drawer */}
              <div className="pt-2">
                <Link
                  to="/create"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-pink-500/25 active:scale-98 transition-transform"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Birthday Surprise ✨</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
