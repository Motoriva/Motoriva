import { useNavigate } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency, type Currency } from '../context/CurrencyContext';

const logo = 'https://zgnpmogdjnnhpwewavnr.supabase.co/storage/v1/object/public/project-images/c2b25bd0-e754-4efd-a4b8-2e05c0f10358/attach-1788261643581-ef8a8e96.png';

export default function Footer() {
  const n = useNavigate();
  const { t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [ok, setOk] = useState(false);
  const link = (k: string, p: string) => <button onClick={() => n(p)} className="block text-sm text-gray-400 hover:text-white text-left">{t(k)}</button>;

  return <footer className="bg-[#0d0d0d] border-t border-[#1e1e1e]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10"><div><img src={logo} alt="MOTORIVA Automotive logo" className="h-12 w-auto object-contain"/><p className="text-[#e02020] mt-3">{t('footer_tagline')}</p><p className="text-gray-500 text-sm mt-4">{t('footer_brand_desc')}</p><a href="https://instagram.com/motoriva.swiss" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-block mt-6"><Instagram size={18}/></a></div><div><h3 className="mb-4">{t('footer_shop')}</h3>{link('footer_all','/products')}{link('nav_cart','/cart')}</div><div><h3 className="mb-4">{t('footer_service')}</h3>{link('footer_shipping_link','/shipping')}{link('footer_returns','/returns')}{link('footer_contact','/contact')}</div><div><h3 className="mb-4">{t('footer_legal')}</h3>{link('footer_terms','/terms')}{link('footer_privacy','/privacy')}{link('footer_impressum','/impressum')}<div className="flex gap-2 mt-5"><select value={currency} onChange={e=>setCurrency(e.target.value as Currency)} className="bg-black border border-[#333] px-2 py-2 text-xs"><option>CHF</option><option>EUR</option><option>USD</option></select><form onSubmit={e=>{e.preventDefault();setOk(true)}} className="flex min-w-0"><input required type="email" placeholder={t('newsletter_placeholder')} className="min-w-0 w-full bg-black border border-[#333] px-3 py-2 text-sm"/><button className="bg-[#e02020] px-3 text-xs uppercase">{t('newsletter_btn')}</button></form></div>{ok&&<p className="text-green-400 text-xs mt-2">{t('newsletter_ok')}</p>}</div></div><div className="border-t border-[#1e1e1e] text-center text-xs text-gray-500 py-6">{t('footer_copyright')}</div></footer>
}
