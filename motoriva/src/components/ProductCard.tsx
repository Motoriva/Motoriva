import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Product } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product: p, showBadge = true }: { product: Product; showBadge?: boolean }) {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // Subtle 3D tilt toward the cursor + a light spot that follows it -
    // classic "premium product card" effect without needing any library.
    setTilt({
      rx: (0.5 - py) * 10,
      ry: (px - 0.5) * 10,
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 });

  return (
    <article
      ref={cardRef}
      onClick={() => navigate('/products/' + p.id)}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform .15s ease-out, box-shadow .3s ease',
      }}
      className="group relative bg-[#141414] border border-[#1e1e1e] hover:border-[#e02020]/50 cursor-pointer will-change-transform hover:shadow-[0_20px_45px_-15px_rgba(224,32,32,.45)]"
    >
      {/* Cursor-tracked light sweep - only visible on hover via group-hover opacity */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255,255,255,.10), transparent 60%)`,
        }}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
        <img
          src={p.images[0]}
          alt={`${p.name} automotive wall art in a dark premium studio`}
          loading="lazy"
          onError={e => (e.currentTarget.style.display = 'none')}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Diagonal shine sweep across the image on hover */}
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 group-hover:translate-x-full group-hover:opacity-100 transition-all duration-700 ease-out"
          style={{
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%)',
          }}
        />
        {showBadge && p.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#e02020] px-2 py-1 text-xs font-bold tracking-wider animate-pulse-red">
            {p.badge}
          </span>
        )}
      </div>

      <div className="relative p-4">
        <h3 className="text-sm font-semibold tracking-wide">{p.name}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">{p.category}</p>
        <div className="mt-3 font-bold text-lg">
          {p.originalPrice && <del className="text-gray-500 text-sm mr-2">{formatPrice(p.originalPrice)}</del>}
          {formatPrice(p.price)}
        </div>
        <div className="text-xs mt-2">
          <span className="text-yellow-400">★★★★★</span> <span className="text-gray-500">{p.rating} ({p.reviewCount})</span>
        </div>
        <button className="relative w-full overflow-hidden border border-[#333] text-gray-300 text-xs uppercase tracking-wider py-3 mt-4 transition-colors group-hover:bg-[#e02020] group-hover:border-[#e02020] group-hover:text-white">
          <span className="relative z-10">{t('shop_details')}</span>
          <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-[race-lights_1s_ease-out]" style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%)' }} />
        </button>
      </div>
    </article>
  );
}
