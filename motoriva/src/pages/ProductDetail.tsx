import {useEffect,useState} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import {Truck} from 'lucide-react';
import {products} from '../data/products';
import {useCart} from '../components/CartContext';
import ProductCard from '../components/ProductCard';
import {useLanguage} from '../context/LanguageContext';
import {useCurrency} from '../context/CurrencyContext';

export default function ProductDetail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const product = products.find(x => x.id === id);
  const {addItem} = useCart();
  const {t, lang} = useLanguage();
  const {formatPrice} = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIndices, setSelectedVariantIndices] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    document.title = product ? `${product.name} | MOTORIVA` : 'Produkt | MOTORIVA';
  }, [product]);

  if (!product) return (
    <section className="pt-32 pb-24 text-center">
      <h1 className="text-4xl font-black uppercase">{lang === 'de' ? 'Produkt nicht gefunden' : 'Product not found'}</h1>
      <button onClick={() => navigate('/products')} className="text-[#e02020] mt-6">Shop</button>
    </section>
  );

  const description = lang === 'de' ? product.descriptionDe : product.descriptionEn;
  const longDescription = lang === 'de' ? product.longDescriptionDe : product.longDescriptionEn;
  const shippingInfo = lang === 'de' ? product.shippingInfo : product.shippingInfoEn;

  const add = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: '',
      finish: '',
    });
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square bg-[#111] overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={`${product.name} detailed wall art in a dark automotive studio`}
              onError={e => e.currentTarget.style.display = 'none'}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {product.images.map((src, i) => (
                <button key={src} onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 overflow-hidden ${selectedImage === i ? 'border-2 border-[#e02020]' : 'border border-[#333]'}`}>
                  <img src={src} alt={`${product.name} view ${i + 1}`} onError={e => e.currentTarget.style.display = 'none'} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-[#e02020] text-xs uppercase tracking-widest">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-black uppercase mt-2">{product.name}</h1>
          <p className="mt-3">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-gray-400 text-sm ml-2">{product.rating} ({product.reviewCount})</span>
          </p>
          <p className="text-4xl font-black mt-5">
            {product.originalPrice && <del className="text-gray-500 text-lg mr-3">{formatPrice(product.originalPrice)}</del>}
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mt-5">{description}</p>

          <div className="border-t border-[#1e1e1e] my-6" />

          {product.variants.length > 0 && product.variants.map((v, vi) => {
            const opts = lang === 'de' ? v.options : v.optionsEn;
            const label = lang === 'de' ? v.label : v.labelEn;
            return (
              <div className="mb-5" key={v.label}>
                <p className="text-sm font-semibold mb-3">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {opts.map((o, oi) => (
                    <button key={o} onClick={() => setSelectedVariantIndices(c => { const x = [...c]; x[vi] = oi; return x; })}
                      className={`text-sm px-4 py-2 border ${selectedVariantIndices[vi] === oi ? 'bg-[#e02020] border-[#e02020]' : 'border-[#333] hover:border-white'}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="mt-4 text-sm">
            {product.inStock
              ? <span className="text-green-400">● {t('detail_in_stock')}</span>
              : <span className="text-red-400">● {t('detail_out_stock')}</span>}
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2 mt-3">
            <Truck size={17} />{shippingInfo}
          </p>

          <button
            disabled={!product.inStock}
            onClick={add}
            className="w-full bg-[#e02020] disabled:opacity-50 text-white font-bold uppercase tracking-widest py-4 mt-7 hover:bg-[#c01010] transition"
          >
            {t('detail_add_cart')}
          </button>
          {showToast && <p className="text-green-400 text-sm mt-3">{t('detail_added')}</p>}

          <div className="flex gap-6 mt-5 text-xs text-gray-500">
            <span>{t('detail_secure')}</span>
            <span>{t('detail_return')}</span>
            <span>{t('detail_shipping')}</span>
          </div>

          <div className="bg-[#111] border border-[#1e1e1e] p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4">{t('detail_details')}</h2>
            <p className="text-gray-400 leading-relaxed text-sm">{longDescription}</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold">{t('detail_similar')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {products.filter(x => product.relatedIds.includes(x.id)).map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </div>
      </div>
    </section>
  );
}
