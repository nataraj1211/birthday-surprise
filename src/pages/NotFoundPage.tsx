import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, PlusCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-50/50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-500 mx-auto shadow-xl animate-float-slow">
          <Heart className="w-12 h-12 fill-pink-200 text-pink-500" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            Oops! This birthday surprise doesn't exist 💕
          </h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            The link you opened might have been typed incorrectly or removed. Want to create a new birthday surprise?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/create"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Create Birthday Surprise
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
