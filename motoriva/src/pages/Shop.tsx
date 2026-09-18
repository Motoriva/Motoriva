import { useMemo, useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [sort, setSort] = useState('popular');
  const list = useMemo(() => {
    const x = [...products];
    if (sort === 'up') x.sort((a, b) => a.price - b.price);
    else if (sort === 'down') x.sort((a, b) => b.price - a.price);
    else x.sort((a, b) => b.reviewCount - a.reviewCount);
    return x;
  }, [sort]);

  return (
    <section className="py-28 max-w-7xl mx-auto px-4">
      <p className="text-red-500 tracking-[.2em] text-xs">MOTORIVA SHOP</p>
      <h1 className="text-6xl font-black mt-2">ALLE PRODUKTE</h1>
      <p className="text-white/60 mt-3">Automotive Statements für deine Wand.</p>
      <div className="flex justify-between items-center mt-10">
        <p className="text-white/50 text-sm">{list.length} Produkte</p>
        <select value={sort} onChange={e => setSort(e.target.value)} className="bg-[#111] border border-white/20 px-4 py-2 text-sm">
          <option value="popular">Beliebtheit</option>
          <option value="up">Preis aufsteigend</option>
          <option value="down">Preis absteigend</option>
        </select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
