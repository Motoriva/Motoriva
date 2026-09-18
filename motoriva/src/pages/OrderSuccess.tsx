import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function OrderSuccess() {
  const { clearCart } = useCart();
  const { lang } = useLanguage();
  const de = lang === 'de';
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  useEffect(() => {
    document.title = `${de ? 'Bestellung erfolgreich' : 'Order successful'} | MOTORIVA`;
    // Only clear the cart once the customer has actually completed
    // checkout and Stripe redirected back here - not before.
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-center text-white sm:px-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {de ? 'Danke für deine Bestellung!' : 'Thank you for your order!'}
        </h1>
        <p className="mt-6 text-gray-400">
          {de
            ? 'Deine Zahlung war erfolgreich. Du erhältst in Kürze eine Bestätigung per E-Mail.'
            : 'Your payment was successful. You will receive a confirmation email shortly.'}
        </p>
        {sessionId && (
          <p className="mt-4 text-xs text-gray-600">
            {de ? 'Referenz' : 'Reference'}: {sessionId}
          </p>
        )}
        <Link
          to="/"
          className="mt-10 inline-block bg-[#e02020] px-8 py-3 text-sm font-bold uppercase text-white"
        >
          {de ? 'Zurück zum Shop' : 'Back to shop'}
        </Link>
      </div>
    </main>
  );
}
