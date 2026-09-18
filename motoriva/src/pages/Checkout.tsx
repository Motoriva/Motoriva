import { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import type { CartItem } from '../data/products';
import { COUNTRIES } from '../lib/countries';

const SHIPPING_CH = 18.90;
const SHIPPING_INT = 67.00;
const SHIPPING_CH_TEXT = 'CHF 18.90';

interface SidebarProps { items: CartItem[]; subtotal: number; shipping: number; grandTotal: number; formatPrice: (value: number) => string; isSwiss: boolean; de: boolean; }
function OrderSidebar({ items, subtotal, shipping, grandTotal, formatPrice, isSwiss, de }: SidebarProps) { return <aside className="h-fit border border-[#1e1e1e] bg-[#111] p-6 lg:sticky lg:top-24"><h2 className="text-xl font-bold uppercase">{de ? 'Zusammenfassung' : 'Summary'}</h2><div className="mt-5 space-y-3 border-b border-[#222] pb-5">{items.map(item => <div key={item.productId} className="flex justify-between gap-4 text-sm"><div className="min-w-0 flex-1"><p className="truncate text-white">{item.name}</p><p className="text-xs text-gray-500">{products.find(p => p.id === item.productId)?.sku || ''} · ×{item.quantity}</p></div><span>{formatPrice(item.price * item.quantity)}</span></div>)}</div><div className="mt-4 flex justify-between text-sm text-gray-400"><span>{de ? 'Zwischensumme' : 'Subtotal'}</span><span>{formatPrice(subtotal)}</span></div><div className="mt-3 flex justify-between text-sm text-gray-400"><span>{de ? 'Versand' : 'Shipping'}</span><span>CHF {shipping.toFixed(2)}</span></div><p className="mt-2 text-xs text-gray-500">{isSwiss ? (de ? 'Schweiz Standard' : 'Switzerland Standard') : (de ? 'Internationaler Versand' : 'International shipping')}</p><div className="mt-5 flex justify-between border-t border-[#333] pt-5 text-xl font-bold"><span>{de ? 'Gesamt' : 'Total'}</span><span className="text-[#e02020]">CHF {grandTotal.toFixed(2)}</span></div></aside>; }

export default function Checkout() {
  const navigate = useNavigate(); const { items, totalPrice } = useCart(); const { lang } = useLanguage(); const { formatPrice } = useCurrency(); const { user } = useAuth(); const de = lang === 'de';
  const [step, setStep] = useState(1); const [sending, setSending] = useState(false); const [error, setError] = useState(''); const [formData, setFormData] = useState({ first: user?.firstName || '', last: user?.lastName || '', email: user?.email || '', street: user?.street || '', zip: user?.zip || '', city: user?.city || '', country: user?.country || 'CH' }); const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  useEffect(() => { const title = `${de ? 'Kasse' : 'Checkout'} | MOTORIVA`; document.title = title; }, [de]);
  useEffect(() => { if (!items.length) navigate('/cart', { replace: true }); }, [items.length, navigate]);
  const isSwiss = formData.country === 'CH'; const shipping = isSwiss ? SHIPPING_CH : SHIPPING_INT; const grandTotal = totalPrice + shipping;
  const updateField = (key: keyof typeof formData, value: string) => setFormData(previous => ({ ...previous, [key]: value }));
  const handleSubmit = async () => {
    if (sending) return;
    setSending(true);
    setError('');
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({ productId: item.productId, quantity: item.quantity })),
          email: formData.email,
          country: formData.country,
          shipping: {
            firstName: formData.first,
            lastName: formData.last,
            street: formData.street,
            zip: formData.zip,
            city: formData.city,
            country: formData.country,
          },
          origin: window.location.origin,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      // Note: the cart is intentionally NOT cleared here - it only gets
      // cleared on the order-success page once payment actually went through.
      window.location.href = data.url;
    } catch (err) {
      setSending(false);
      setError(de ? 'Zahlung konnte nicht gestartet werden. Bitte versuche es erneut.' : 'Payment could not be started. Please try again.');
    }
  };
  if (!items.length) return null;
  const inputCls = 'mt-2 block h-12 w-full border border-[#333] bg-[#111] px-4 text-sm text-white outline-none focus:border-[#e02020]'; const labels = de ? ['Vorname','Nachname','E-Mail','Straße & Hausnummer','PLZ','Stadt','Land'] : ['First Name','Last Name','Email','Street & House Number','ZIP Code','City','Country']; const keys: (keyof typeof formData)[] = ['first','last','email','street','zip','city','country'];
  return <main className="min-h-screen bg-black px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24"><div className="mx-auto max-w-6xl"><h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">{de ? 'Kasse' : 'Checkout'}</h1><div className="grid gap-8 mt-10 lg:grid-cols-[1fr_360px]"><section className="border border-[#1e1e1e] bg-[#0b0b0b] p-6 sm:p-8 lg:p-10">{step === 1 ? <form className="space-y-6" onSubmit={e => { e.preventDefault(); setStep(2); }}><h2 className="text-2xl font-bold uppercase">{de ? 'Kontakt & Lieferadresse' : 'Contact & Shipping Address'}</h2><div className="grid gap-5 sm:grid-cols-2">{keys.map((key,i) => key === 'country' ? <label key={key} className="sm:col-span-2 text-sm text-gray-300">{labels[i]}<select required value={formData.country} onChange={e => updateField('country', e.target.value)} className={inputCls}>{COUNTRIES.map(c => <option key={c.code} value={c.code}>{de ? c.de : c.en}</option>)}</select></label> : <label key={key} className={key === 'email' || key === 'street' ? 'sm:col-span-2 text-sm text-gray-300' : 'text-sm text-gray-300'}>{labels[i]}<input required type={key === 'email' ? 'email' : 'text'} value={formData[key]} onChange={e => updateField(key,e.target.value)} className={inputCls}/></label>)}</div><div className="mt-8 flex justify-end border-t border-[#222] pt-6"><button type="submit" className="bg-[#e02020] px-8 py-3 text-sm font-bold uppercase">{de ? 'Weiter zur Zahlung' : 'Continue to payment'} →</button></div></form> : <div className="space-y-6"><h2 className="text-2xl font-bold uppercase">{de ? 'Bestellung prüfen & bezahlen' : 'Review & Pay'}</h2><div className="flex flex-col items-center gap-4 border border-[#635BFF]/40 bg-[#0f0f0f] p-6 text-center"><p className="text-lg font-bold">{de ? 'Sicher mit Stripe bezahlen' : 'Pay securely with Stripe'}</p><p className="text-3xl font-black text-[#e02020]">CHF {grandTotal.toFixed(2)}</p></div>{error && <p className="text-center text-sm text-[#e02020]">{error}</p>}<div className="flex justify-between border-t border-[#222] pt-6"><button type="button" onClick={() => setStep(1)} disabled={sending} className="text-sm text-gray-400">← {de ? 'Zurück' : 'Back'}</button><button type="button" onClick={handleSubmit} disabled={sending} className="bg-[#635BFF] px-8 py-4 text-sm font-bold uppercase text-white">{sending ? 'Weiterleitung…' : (de ? `CHF ${grandTotal.toFixed(2)} sicher bezahlen` : `Pay CHF ${grandTotal.toFixed(2)} securely`)}</button></div></div>}</section><OrderSidebar items={items} subtotal={totalPrice} shipping={shipping} grandTotal={grandTotal} formatPrice={formatPrice} isSwiss={isSwiss} de={de}/></div></div></main>;
}
