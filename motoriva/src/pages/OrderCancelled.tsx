import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function OrderCancelled() {
  const { lang } = useLanguage();
  const de = lang === 'de';

  useEffect(() => {
    document.title = `${de ? 'Zahlung abgebrochen' : 'Payment cancelled'} | MOTORIVA`;
  }, [de]);

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-center text-white sm:px-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {de ? 'Zahlung abgebrochen' : 'Payment cancelled'}
        </h1>
        <p className="mt-6 text-gray-400">
          {de
            ? 'Es wurde nichts belastet. Dein Warenkorb ist noch da, du kannst es jederzeit erneut versuchen.'
            : 'Nothing was charged. Your cart is still here, feel free to try again anytime.'}
        </p>
        <Link
          to="/cart"
          className="mt-10 inline-block bg-[#e02020] px-8 py-3 text-sm font-bold uppercase text-white"
        >
          {de ? 'Zurück zum Warenkorb' : 'Back to cart'}
        </Link>
      </div>
    </main>
  );
}
