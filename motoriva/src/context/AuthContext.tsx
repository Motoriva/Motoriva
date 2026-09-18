import { createContext, useContext, useState, type ReactNode } from 'react';

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
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, firstName: string, lastName: string) => boolean;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
}

const Ctx = createContext<AuthCtx | null>(null);

type Store = Record<string, { password: string; profile: UserProfile }>;

const load = <T,>(key: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => load('motoriva_user', null));

  const getStore = (): Store => load('motoriva_users', {});
  const saveStore = (s: Store) => localStorage.setItem('motoriva_users', JSON.stringify(s));

  const login = (email: string, password: string): boolean => {
    const entry = getStore()[email.toLowerCase()];
    if (!entry || entry.password !== password) return false;
    setUser(entry.profile);
    localStorage.setItem('motoriva_user', JSON.stringify(entry.profile));
    return true;
  };

  const register = (email: string, password: string, firstName: string, lastName: string): boolean => {
    const store = getStore();
    if (store[email.toLowerCase()]) return false;
    const profile: UserProfile = { email, firstName, lastName, street: '', zip: '', city: '', country: '' };
    store[email.toLowerCase()] = { password, profile };
    saveStore(store);
    setUser(profile);
    localStorage.setItem('motoriva_user', JSON.stringify(profile));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('motoriva_user');
  };

  const updateProfile = (patch: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...patch };
    setUser(updated);
    localStorage.setItem('motoriva_user', JSON.stringify(updated));
    const store = getStore();
    if (store[user.email.toLowerCase()]) {
      store[user.email.toLowerCase()].profile = updated;
      saveStore(store);
    }
  };

  return (
    <Ctx.Provider value={{ user, isLoggedIn: !!user, login, register, logout, updateProfile }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('AuthProvider missing');
  return v;
}
