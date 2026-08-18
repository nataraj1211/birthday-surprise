import React, { useEffect, useState } from 'react';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AuthContext, type AuthContextType } from './AuthContextInstance';
import { PRODUCTION_ORIGIN } from '../services/birthdayService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (error) {
        console.warn('Error fetching Supabase auth session:', error);
      }
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    // 2. Subscribe to auth state updates
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: {
          name: 'SupabaseNotConfigured',
          message: 'Supabase is not configured. Please check your environment variables.',
        } as AuthError,
      };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: {
          name: 'SupabaseNotConfigured',
          message: 'Supabase is not configured. Please check your environment variables.',
        } as AuthError,
        user: null,
      };
    }
    const redirectUrl =
      typeof window !== 'undefined' && window.location.origin
        ? `${window.location.origin}/dashboard`
        : `${PRODUCTION_ORIGIN}/dashboard`;

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    return { error, user: data.user };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: {
          name: 'SupabaseNotConfigured',
          message: 'Supabase is not configured. Please check your environment variables.',
        } as AuthError,
      };
    }
    const redirectUrl =
      typeof window !== 'undefined' && window.location.origin
        ? `${window.location.origin}/dashboard`
        : `${PRODUCTION_ORIGIN}/dashboard`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setUser(null);
      setSession(null);
      return { error: null };
    }
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    return { error };
  };

  const resetPasswordForEmail = async (email: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: {
          name: 'SupabaseNotConfigured',
          message: 'Supabase is not configured.',
        } as AuthError,
      };
    }
    const redirectUrl =
      typeof window !== 'undefined' && window.location.origin
        ? `${window.location.origin}/reset-password`
        : `${PRODUCTION_ORIGIN}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectUrl,
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: {
          name: 'SupabaseNotConfigured',
          message: 'Supabase is not configured.',
        } as AuthError,
      };
    }
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error };
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isConfigured: isSupabaseConfigured,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    resetPasswordForEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
