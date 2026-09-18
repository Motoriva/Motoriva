import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  zip: string;
  city: string;
  country: string;
}

interface AuthCtx {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  // login/register return null on success, or an error message to show the user.
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<string | null>;
  logout: () => Promise<void>;
  updateProfile: (patch: Partial<UserProfile>) => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

async function loadProfile(userId: string, fallbackEmail: string): Promise<UserProfile> {
  const empty = { email: fallbackEmail, firstName: '', lastName: '', street: '', zip: '', city: '', country: '' };
  if (!supabase) return empty;
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (!data) return empty;
  return {
    email: data.email || fallbackEmail,
    firstName: data.first_name || '',
    lastName: data.last_name || '',
    street: data.street || '',
    zip: data.zip || '',
    city: data.city || '',
    country: data.country || '',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    // Restore an existing session (Supabase keeps this in the browser and
    // automatically refreshes it, so people stay logged in between visits).
    supabase.auth.getSession().then(async ({ data }) => {
      const sessionUser = data.session?.user;
      if (sessionUser) setUser(await loadProfile(sessionUser.id, sessionUser.email || ''));
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) setUser(await loadProfile(session.user.id, session.user.email || ''));
      else setUser(null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    if (!supabase) return 'Login ist gerade nicht verfügbar.';
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  };

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<string | null> => {
    if (!supabase) return 'Registrierung ist gerade nicht verfügbar.';
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });
    return error ? error.message : null;
  };

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (patch: Partial<UserProfile>) => {
    if (!supabase || !user) return;
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (!userId) return;
    const updated = { ...user, ...patch };
    setUser(updated);
    await supabase.from('profiles').upsert({
      id: userId,
      email: updated.email,
      first_name: updated.firstName,
      last_name: updated.lastName,
      street: updated.street,
      zip: updated.zip,
      city: updated.city,
      country: updated.country,
    });
  };

  return (
    <Ctx.Provider value={{ user, isLoggedIn: !!user, loading, login, register, logout, updateProfile }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('AuthProvider missing');
  return v;
}
