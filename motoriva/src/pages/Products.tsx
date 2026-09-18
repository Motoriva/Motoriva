import { useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';

export default function Products() {
  const [sort, setSort] = useState('popular');
  const [search, setSearch] = useState('');
  const { t, lang } = useLanguage();
  useEffect(() => { document.title = `${t('shop_title')} | MOTORIVA`; }, [t]);
  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim().length > 0) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [sort, search]);
  return <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-[#e02020] text-xs tracking-[.25em]">{t('shop_label')}</p><h1 className="text-5xl font-black mt-3 uppercase">{t('shop_title')}</h1><div className="relative max-w-md mt-8"><svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={lang === 'de' ? 'Marke oder Modell suchen…' : 'Search brand or model…'} className="w-full bg-[#111] border border-[#333] focus:border-[#e02020] outline-none pl-11 pr-4 py-3 text-white text-sm transition" />{search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">✕</button>}</div><div className="flex justify-between items-center mt-10"><p className="text-gray-500 text-sm">{filtered.length} {t('shop_count')}</p><select value={sort} onChange={e => setSort(e.target.value)} className="bg-[#111] border border-[#333] px-3 py-2 text-sm"><option value="popular">{t('shop_sort_popular')}</option><option value="asc">{t('shop_sort_asc')}</option><option value="desc">{t('shop_sort_desc')}</option></select></div><div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div></section>;
}
