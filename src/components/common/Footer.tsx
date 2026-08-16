import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
export const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/birthday/')) {
    return null;
  }

  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-8 sm:py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <span className="font-black text-lg text-white tracking-wide">
                BIRTHDAY BLOOM
              </span>

              <p className="text-xs text-slate-400 mt-0.5">
                Create a little surprise. Share a beautiful memory. 💕
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold">
            <Link to="/" className="hover:text-pink-400 transition-colors py-1">
              Home
            </Link>

            <Link to="/designs" className="hover:text-pink-400 transition-colors py-1">
              All 40 Designs
            </Link>

            <Link to="/create" className="hover:text-pink-400 transition-colors py-1">
              Create Surprise
            </Link>

            <Link to="/dashboard" className="hover:text-pink-400 transition-colors py-1">
              Dashboard
            </Link>

            <Link to="/birthday/demo" className="hover:text-pink-400 transition-colors py-1">
              Live Demo
            </Link>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">

          <p>
            © {new Date().getFullYear()} Birthday Bloom. Reusable Birthday Surprise Generator.
          </p>

          <div className="flex items-center gap-4">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/nataraj__v"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nataraj-v-3a2402314"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>

            <p className="flex items-center justify-center gap-1">
              Made with
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              for special celebrations.
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
};