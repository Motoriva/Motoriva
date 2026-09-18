import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import type { UserProfile } from '../context/AuthContext';

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}

function Field({ label, value, onChange, type = 'text', required = false, minLength }: FieldProps) {
  const inputCls = 'block w-full bg-[#111] border border-[#333] focus:border-[#e02020] outline-none px-4 py-3 mt-2 text-white transition text-sm';
  return (
    <label className="block text-sm text-gray-300">
      {label}{required && <span className="text-[#e02020] ml-1">*</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className={inputCls}
      />
    </label>
  );
}

export default function Account() {
  const { user, isLoggedIn, login, register, logout, updateProfile } = useAuth();
  const { lang } = useLanguage();
  const de = lang === 'de';
  const txt = { label: de ? 'KONTO' : 'ACCOUNT', title: de ? 'Dein MOTORIVA Konto' : 'Your MOTORIVA Account', loginTab: de ? 'Anmelden' : 'Sign In', regTab: de ? 'Konto erstellen' : 'Create Account', email: de ? 'E-Mail' : 'Email', password: de ? 'Passwort' : 'Password', firstName: de ? 'Vorname' : 'First Name', lastName: de ? 'Nachname' : 'Last Name', loginBtn: de ? 'Anmelden' : 'Sign in', regBtn: de ? 'Konto erstellen' : 'Create Account', logoutBtn: de ? 'Abmelden' : 'Sign out', saveBtn: de ? 'Speichern' : 'Save changes', street: de ? 'Straße & Hausnummer' : 'Street & House Number', zip: de ? 'PLZ' : 'ZIP Code', city: de ? 'Stadt' : 'City', country: de ? 'Land' : 'Country', loginErr: de ? 'Ungültige E-Mail oder Passwort.' : 'Invalid email or password.', regErr: de ? 'Diese E-Mail ist bereits registriert.' : 'This email is already registered.', saved: de ? '✓ Gespeichert!' : '✓ Saved!', welcome: de ? 'Willkommen zurück' : 'Welcome back', hint: de ? 'Deine Lieferdaten werden beim Checkout automatisch ausgefüllt.' : 'Your delivery details are auto-filled at checkout.', profileTitle: de ? 'Lieferadresse' : 'Delivery Address', personalTitle: de ? 'Persönliche Daten' : 'Personal Details', switchToReg: de ? 'Noch kein Konto? Registrieren' : "Don't have an account? Create one", switchToLogin: de ? 'Bereits registriert? Anmelden' : 'Already have an account? Sign in', deliverySection: de ? 'Lieferadresse (optional – für schnelleres Checkout)' : 'Delivery Address (optional – for faster checkout)' };
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ email: '', password: '', firstName: '', lastName: '', street: '', zip: '', city: '', country: '' });
  const [profile, setProfile] = useState<Omit<UserProfile, 'email'>>({ firstName: '', lastName: '', street: '', zip: '', city: '', country: '' });
  const [err, setErr] = useState(''); const [saved, setSaved] = useState(false);
  useEffect(() => { if (user) setProfile({ firstName: user.firstName, lastName: user.lastName, street: user.street, zip: user.zip, city: user.city, country: user.country }); }, [user]);
  const handleLogin = async (e: React.FormEvent) => { e.preventDefault(); setErr(''); const errorMsg = await login(loginForm.email, loginForm.password); if (errorMsg) setErr(errorMsg); };
  const handleRegister = async (e: React.FormEvent) => { e.preventDefault(); setErr(''); const errorMsg = await register(regForm.email, regForm.password, regForm.firstName, regForm.lastName); if (errorMsg) { setErr(errorMsg); return; } await updateProfile({ street: regForm.street, zip: regForm.zip, city: regForm.city, country: regForm.country }); };
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); await updateProfile(profile); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  if (isLoggedIn) return <section className="pt-28 pb-24 max-w-lg mx-auto px-4"><p className="text-[#e02020] text-xs tracking-[.25em]">{txt.label}</p><h1 className="text-4xl font-black mt-3 uppercase">{txt.title}</h1><div className="mt-8 bg-[#141414] border border-[#1e1e1e] p-5 flex items-center gap-4"><div className="w-12 h-12 bg-[#e02020] flex items-center justify-center font-black text-xl">{(user?.firstName?.[0] || user?.email?.[0] || 'M').toUpperCase()}</div><div><p className="font-semibold text-white">{user?.firstName} {user?.lastName}</p><p className="text-gray-400 text-sm">{user?.email}</p></div><button onClick={logout} className="ml-auto border border-[#333] hover:border-white px-4 py-2 text-xs uppercase tracking-wider transition">{txt.logoutBtn}</button></div><div className="mt-4 bg-[#0f0f0f] border border-[#1e1e1e] p-4 text-sm text-gray-400"><span className="text-green-400 mr-2">✓</span>{txt.hint}</div><form onSubmit={handleSave} className="mt-10 space-y-5"><h2 className="text-xl font-bold">{txt.personalTitle}</h2><div className="grid grid-cols-2 gap-4"><Field label={txt.firstName} value={profile.firstName} onChange={v => setProfile(p => ({ ...p, firstName: v }))} /><Field label={txt.lastName} value={profile.lastName} onChange={v => setProfile(p => ({ ...p, lastName: v }))} /></div><h2 className="text-xl font-bold pt-4">{txt.profileTitle}</h2><Field label={txt.street} value={profile.street} onChange={v => setProfile(p => ({ ...p, street: v }))} /><div className="grid grid-cols-2 gap-4"><Field label={txt.zip} value={profile.zip} onChange={v => setProfile(p => ({ ...p, zip: v }))} /><Field label={txt.city} value={profile.city} onChange={v => setProfile(p => ({ ...p, city: v }))} /></div><Field label={txt.country} value={profile.country} onChange={v => setProfile(p => ({ ...p, country: v }))} />{saved && <p className="text-green-400 text-sm">{txt.saved}</p>}<button type="submit" className="w-full bg-[#e02020] hover:bg-[#c01010] py-4 font-bold uppercase tracking-wider transition">{txt.saveBtn}</button></form></section>;
  return <section className="pt-28 pb-24 max-w-lg mx-auto px-4"><p className="text-[#e02020] text-xs tracking-[.25em]">{txt.label}</p><h1 className="text-4xl font-black mt-3 uppercase">{txt.title}</h1><div className="flex mt-10 border-b border-[#222]">{(['login', 'register'] as const).map(x => <button key={x} onClick={() => { setTab(x); setErr(''); }} className={`flex-1 px-4 py-3 text-sm uppercase tracking-wider font-semibold transition border-b-2 ${tab === x ? 'text-white border-[#e02020]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}>{x === 'login' ? txt.loginTab : txt.regTab}</button>)}</div>{tab === 'login' && <form onSubmit={handleLogin} className="mt-8 space-y-5"><Field label={txt.email} value={loginForm.email} onChange={v => setLoginForm(p => ({ ...p, email: v }))} type="email" required /><Field label={txt.password} value={loginForm.password} onChange={v => setLoginForm(p => ({ ...p, password: v }))} type="password" required />{err && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">{err}</p>}<button type="submit" className="w-full bg-[#e02020] hover:bg-[#c01010] py-4 font-bold uppercase tracking-wider transition">{txt.loginBtn}</button><p className="text-center text-gray-500 text-sm"><button type="button" onClick={() => { setTab('register'); setErr(''); }} className="text-[#e02020] hover:underline">{txt.switchToReg}</button></p></form>}{tab === 'register' && <form onSubmit={handleRegister} className="mt-8 space-y-5"><div className="grid grid-cols-2 gap-4"><Field label={txt.firstName} value={regForm.firstName} onChange={v => setRegForm(p => ({ ...p, firstName: v }))} required /><Field label={txt.lastName} value={regForm.lastName} onChange={v => setRegForm(p => ({ ...p, lastName: v }))} required /></div><Field label={txt.email} value={regForm.email} onChange={v => setRegForm(p => ({ ...p, email: v }))} type="email" required /><Field label={txt.password} value={regForm.password} onChange={v => setRegForm(p => ({ ...p, password: v }))} type="password" required minLength={6} /><div className="border-t border-[#1e1e1e] pt-5"><p className="text-xs text-gray-400 uppercase tracking-wider mb-4">{txt.deliverySection}</p><div className="space-y-4"><Field label={txt.street} value={regForm.street} onChange={v => setRegForm(p => ({ ...p, street: v }))} /><div className="grid grid-cols-2 gap-4"><Field label={txt.zip} value={regForm.zip} onChange={v => setRegForm(p => ({ ...p, zip: v }))} /><Field label={txt.city} value={regForm.city} onChange={v => setRegForm(p => ({ ...p, city: v }))} /></div><Field label={txt.country} value={regForm.country} onChange={v => setRegForm(p => ({ ...p, country: v }))} /></div></div>{err && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">{err}</p>}<button type="submit" className="w-full bg-[#e02020] hover:bg-[#c01010] py-4 font-bold uppercase tracking-wider transition">{txt.regBtn}</button><p className="text-center text-gray-500 text-sm"><button type="button" onClick={() => { setTab('login'); setErr(''); }} className="text-[#e02020] hover:underline">{txt.switchToLogin}</button></p></form>}</section>;
}
