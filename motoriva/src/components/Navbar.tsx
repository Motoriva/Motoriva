import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { useCart } from './CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency, type Currency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

const logo = 'https://zgnpmogdjnnhpwewavnr.supabase.co/storage/v1/object/public/project-images/c2b25bd0-e754-4efd-a4b8-2e05c0f10358/attach-1788261643581-ef8a8e96.png';

export default function Navbar() {
  const n = useNavigate(), l = useLocation(), { totalItems } = useCart(), { lang, setLang, t } = useLanguage(), { currency, setCurrency } = useCurrency(), { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { setOpen(false); setSearchOpen(false); setSearchQuery(''); }, [l.pathname]);
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  const links = [['nav_shop', '/products'], ['nav_about', '/about'], ['nav_contact', '/contact']] as const;
  const searchResults = searchQuery.trim().length > 1 ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6) : [];

  return <header ref={headerRef} className={`fixed top-0 z-50 w-full h-16 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur border-b border-[#1e1e1e]' : 'bg-transparent'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
      <button data-logo onClick={() => n('/')} className="shrink-0"><img src={logo} alt="MOTORIVA Automotive logo" className="h-10 w-auto object-contain" /></button>
      <nav className="hidden lg:flex items-center gap-8">{links.map(([k, p]) => <button key={p} onClick={() => n(p)} className="text-sm uppercase tracking-wider text-gray-300 hover:text-white">{t(k)}</button>)}</nav>
      <button onClick={() => { setSearchOpen(v => !v); setSearchQuery(''); }} aria-label="Search" className="hidden lg:block p-2 text-gray-300 hover:text-white transition"><>{searchOpen ? <X size={18} /> : <Search size={18} />}</></button>
      <div className="flex items-center gap-2">
        <button onClick={() => setLang(lang === 'de' ? 'en' : 'de')} className="text-xs uppercase tracking-wider text-gray-400"><span className={lang === 'de' ? 'text-white' : ''}>DE</span> · <span className={lang === 'en' ? 'text-white' : ''}>EN</span></button>
        <select aria-label="Currency" value={currency} onChange={e => setCurrency(e.target.value as Currency)} className="bg-transparent border border-[#333] text-gray-300 text-xs px-2 py-1"><option>CHF</option><option>EUR</option><option>USD</option></select>
        <button onClick={() => n('/account')} aria-label="Account" className="p-2 text-gray-300 hover:text-white transition"><User size={20} className={isLoggedIn ? 'text-[#e02020]' : ''} /></button>
        <button onClick={() => n('/cart')} aria-label={t('nav_cart')} className="relative p-2"><ShoppingBag size={20} />{totalItems > 0 && <b className="absolute -top-1 -right-1 bg-[#e02020] rounded-full w-5 h-5 text-xs flex items-center justify-center">{totalItems}</b>}</button>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden p-2">{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav className="lg:hidden bg-[#0a0a0a] border-t border-[#1e1e1e] px-5 py-5 space-y-4">
      {links.map(([k, p]) => <button key={p} onClick={() => { setOpen(false); n(p); }} className="block w-full text-left text-sm uppercase tracking-wider text-gray-300">{t(k)}</button>)}
      <div className="relative mt-4"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="text" placeholder={lang === 'de' ? 'Suchen…' : 'Search…'} onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }} className="w-full bg-[#111] border border-[#333] pl-9 pr-4 py-3 text-sm outline-none focus:border-[#e02020]" /></div>
      {searchQuery.trim().length > 1 && products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map(p => <button key={p.id} onClick={() => { n('/products/' + p.id); setOpen(false); setSearchQuery(''); }} className="w-full flex items-center gap-3 py-2 text-left"><img src={p.images[0]} alt={p.name} className="w-8 h-8 object-cover" onError={e => e.currentTarget.style.display = 'none'} /><span className="text-sm text-white">{p.name}</span><span className="ml-auto text-[#e02020] text-sm">CHF {p.price.toFixed(2)}</span></button>)}
      <button onClick={() => { setOpen(false); n('/account'); }} className="block w-full text-left text-sm uppercase tracking-wider text-gray-300">{lang === 'de' ? 'Konto' : 'Account'}</button>
      <button onClick={() => { setOpen(false); n('/cart'); }} className="text-[#e02020] uppercase text-sm">{t('nav_cart')} ({totalItems})</button>
      <div className="flex gap-4 pt-2"><button onClick={() => setLang(lang === 'de' ? 'en' : 'de')}>DE · EN</button><select value={currency} onChange={e => setCurrency(e.target.value as Currency)} className="bg-[#111] border border-[#333] text-sm"><option>CHF</option><option>EUR</option><option>USD</option></select></div>
    </nav>}
    {searchOpen && <div className="absolute top-16 left-0 right-0 bg-[#0d0d0d] border-b border-[#1e1e1e] z-50 px-4 py-4"><div className="max-w-2xl mx-auto"><div className="relative"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input ref={searchRef} autoFocus type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={lang === 'de' ? 'Marke oder Modell suchen…' : 'Search brand or model…'} className="w-full bg-[#111] border border-[#333] focus:border-[#e02020] outline-none pl-10 pr-4 py-3 text-white text-sm" /></div>{searchResults.length > 0 && <div className="mt-2 border border-[#222] bg-[#111] divide-y divide-[#1e1e1e]">{searchResults.map(p => <button key={p.id} onClick={() => { n('/products/' + p.id); setSearchOpen(false); setSearchQuery(''); }} className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#1a1a1a] text-left transition"><img src={p.images[0]} alt={p.name} onError={e => e.currentTarget.style.display = 'none'} className="w-10 h-10 object-cover flex-shrink-0" /><div className="flex-1 min-w-0"><p className="text-white text-sm font-semibold truncate">{p.name}</p><p className="text-gray-500 text-xs">{p.category}</p></div><span className="text-[#e02020] font-bold text-sm flex-shrink-0">CHF {p.price.toFixed(2)}</span></button>)}</div>}{searchQuery.trim().length > 1 && searchResults.length === 0 && <p className="text-gray-500 text-sm mt-3 text-center py-4">{lang === 'de' ? 'Keine Produkte gefunden.' : 'No products found.'}</p>}</div></div>}
  </header>;
}
