import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../components/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

const SHIPPING = 18.90;

export default function Cart() {
  const n = useNavigate();
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  if (!items.length) return (
    <section className="pt-32 pb-24 text-center">
      <ShoppingBag className="mx-auto text-gray-500" size={50} />
      <h1 className="text-4xl mt-6">{t('cart_empty')}</h1>
      <button onClick={() => n('/products')} className="bg-[#e02020] px-7 py-3 mt-7">
        {t('cart_shop')}
      </button>
    </section>
  );

  const grandTotal = totalPrice + SHIPPING;

  return (
    <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl">{t('cart_title')} <span className="text-gray-500 text-2xl">({totalItems})</span></h1>
      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2 space-y-3">
          {items.map(i => (
            <div key={i.productId} className="bg-[#141414] border border-[#1e1e1e] p-4 flex gap-4 items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#242424] to-[#0d0d0d] flex-shrink-0">
                <img src={i.image} alt={`${i.name} automotive product in a premium dark studio setting`} onError={e => { e.currentTarget.style.display = 'none'; }} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0"><h2 className="text-sm font-semibold truncate">{i.name}</h2><p className="text-xs text-gray-500 mt-2">{i.size} · {i.finish}</p><p className="font-bold mt-2">{formatPrice(i.price)}</p></div>
              <div className="flex items-center border border-[#333]"><button onClick={() => updateQuantity(i.productId, i.quantity - 1)} className="px-3 py-2" aria-label="Decrease quantity">−</button><span className="px-3">{i.quantity}</span><button onClick={() => updateQuantity(i.productId, i.quantity + 1)} className="px-3 py-2" aria-label="Increase quantity">+</button></div>
              <button onClick={() => removeItem(i.productId)} aria-label="Remove item" className="text-gray-400 hover:text-[#e02020] transition"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <aside className="bg-[#111] border border-[#1e1e1e] p-6 h-fit"><h2 className="text-2xl">{t('cart_summary')}</h2><div className="flex justify-between mt-6 text-gray-400"><span>{t('cart_subtotal')}</span><span>{formatPrice(totalPrice)}</span></div><div className="flex justify-between mt-3 text-gray-400"><span>{t('cart_shipping')}</span><span>CHF {SHIPPING.toFixed(2)}</span></div><hr className="border-[#333] my-5" /><div className="flex justify-between font-bold text-xl"><span>{t('cart_total')}</span><span className="text-[#e02020]">CHF {grandTotal.toFixed(2)}</span></div><button onClick={() => n('/checkout')} className="w-full bg-[#e02020] py-4 mt-7 uppercase font-bold">{t('cart_checkout')}</button><button onClick={() => n('/products')} className="w-full border border-[#333] py-3 mt-3 text-sm">{t('cart_continue')}</button></aside>
      </div>
    </section>
  );
}
