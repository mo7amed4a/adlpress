"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProducts, addFavorite, deleteFavorite, getFavorites, getHeroBanner } from "@/lib/api";
import { Heart, ShoppingCart } from "lucide-react";
import ProductDetails from "@/components/pages/home/ProductDetails";
import { useCart } from "@/context/CartContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoriesSection from "@/components/pages/home/categoriesSection";

// Fake product data for product cards as a fallback
const fakeProducts = [
  {
    _id: "1",
    title: { ar: "سماعات لاسلكية", en: "Wireless Headphones" },
    price: 99.99,
    sale: 20,
    image: [{ url: "/images/headphones.jpg" }],
    category: "Electronics",
  },
  {
    _id: "2",
    title: { ar: "هاتف ذكي", en: "Smartphone" },
    price: 499.99,
    sale: 10,
    image: [{ url: "/images/smartphone.jpg" }],
    category: "Electronics",
  },
  {
    _id: "3",
    title: { ar: "ساعة ذكية", en: "Smartwatch" },
    price: 199.99,
    sale: 15,
    image: [{ url: "/images/smartwatch.jpg" }],
    category: "Wearables",
  },
  {
    _id: "4",
    title: { ar: "لاب توب", en: "Laptop" },
    price: 799.99,
    sale: 0,
    image: [{ url: "/images/laptop.jpg" }],
    category: "Electronics",
  },
  {
    _id: "5",
    title: { ar: "سماعة بلوتوث", en: "Bluetooth Speaker" },
    price: 59.99,
    sale: 25,
    image: [{ url: "/images/speaker.jpg" }],
    category: "Electronics",
  },
  {
    _id: "6",
    title: { ar: "كاميرا رقمية", en: "Digital Camera" },
    price: 299.99,
    sale: 10,
    image: [{ url: "/images/camera.jpg" }],
    category: "Photography",
  },
  {
    _id: "7",
    title: { ar: "تابلت", en: "Tablet" },
    price: 349.99,
    sale: 5,
    image: [{ url: "/images/tablet.jpg" }],
    category: "Electronics",
  },
  {
    _id: "8",
    title: { ar: "سماعات رأس", en: "Over-Ear Headphones" },
    price: 129.99,
    sale: 0,
    image: [{ url: "/images/overear.jpg" }],
    category: "Electronics",
  },
  {
    _id: "9",
    title: { ar: "شاحن لاسلكي", en: "Wireless Charger" },
    price: 29.99,
    sale: 30,
    image: [{ url: "/images/charger.jpg" }],
    category: "Accessories",
  },
  {
    _id: "10",
    title: { ar: "لوحة مفاتيح", en: "Mechanical Keyboard" },
    price: 89.99,
    sale: 15,
    image: [{ url: "/images/keyboard.jpg" }],
    category: "Accessories",
  },
];

// Fake banner data for HeroSection slider as a fallback
const fakeBanners = [
  {
    _id: "b1",
    image: { url: "/images/banner1.jpg" },
    url: "/products/electronics",
    title: { ar: "عروض الإلكترونيات", en: "Electronics Deals" },
    description: { ar: "خصومات تصل إلى 50% على الإلكترونيات", en: "Up to 50% off on Electronics" },
  },
  {
    _id: "b2",
    image: { url: "/images/banner2.jpg" },
    url: "/products/new-arrivals",
    title: { ar: "المنتجات الجديدة", en: "New Arrivals" },
    description: { ar: "اكتشف أحدث المنتجات في متجرنا", en: "Discover the latest products in our store" },
  },
  {
    _id: "b3",
    image: { url: "/images/banner3.jpg" },
    url: "/products/offers",
    title: { ar: "عروض حصرية", en: "Exclusive Offers" },
    description: { ar: "عروض محدودة المدة على منتجات مختارة", en: "Limited-time offers on selected products" },
  },
];

const HeroSection = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeroBanner()
      .then((data) => {
        // Handle single object or array from API
        if (data && typeof data === 'object' && data.image) {
          setBanners([data]);
        } else if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
        } else {
          // Use fake banner data as fallback
          setBanners(fakeBanners);
        }
        setLoading(false);
      })
      .catch((error) => {
        // Use fake banner data on error
        setBanners(fakeBanners);
        setLoading(false);
      });
  }, []);

  // Slider settings for hero banners
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-4">
        <ul className="flex gap-2 justify-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full cursor-pointer hover:bg-gray-600"></div>
    ),
    prevArrow: (
      <button className="absolute left-4 top-1/2 z-10 p-2 bg-white rounded-full shadow-md transform -translate-y-1/2 hover:bg-gray-100">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button className="absolute right-4 top-1/2 z-10 p-2 bg-white rounded-full shadow-md transform -translate-y-1/2 hover:bg-gray-100">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    ),
  };

  if (loading) {
    return (
      <div className="w-full h-[40vw] min-h-[180px] max-h-[320px] sm:h-[50vw] md:h-[50vh] flex items-center justify-center bg-gray-100">
        <span className="text-lg text-gray-400">جاري تحميل الإعلان...</span>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-[40vw] min-h-[180px] max-h-[320px] sm:h-[50vw] md:h-[50vh] flex items-center justify-center bg-gray-100">
        <span className="text-lg text-gray-400">لا يوجد بنر إعلاني متاح</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative mt-6 w-full">
      <Slider {...sliderSettings}>
        {banners.map((banner, index) => (
          <div key={`banner-${banner._id || index}`} className="relative w-full h-[40vw] min-h-[180px] max-h-[320px] sm:h-[50vw] md:h-[50vh]">
            <Image
              src={banner.image?.url || "/icons/home/1.png"}
              alt={banner.title?.ar || banner.title?.en || "Banner"}
              fill
              sizes="100vw"
              className="object-cover w-full h-full"
              priority
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/icons/home/1.png";
              }}
            />
            <div className="flex absolute inset-0 flex-col justify-center items-center px-4 text-center text-white bg-black/40">
              <h2 className="mb-2 text-xl font-bold md:text-3xl">
                {banner.title?.ar || banner.title?.en || " "}
              </h2>
              <p className="mb-4 text-sm md:text-lg">
                {banner.description?.ar || banner.description?.en || ""}
              </p>
              <a
                href={banner.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 font-semibold text-white bg-blue-600 rounded-full transition-transform hover:bg-blue-700 hover:scale-105"
              >
                اشترِ الآن
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );

};

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favLoading, setFavLoading] = useState<string | null>(null);
  const { addToCart, openCart } = useCart();
  const isLoggedIn = !!(typeof window !== 'undefined' && localStorage.getItem('token'));

  useEffect(() => {
    // Fetch products from API, fall back to fake data if the call fails
    getAllProducts()
      .then((data) => {
        setProducts(Array.isArray(data) && data.length > 0 ? data : fakeProducts);
      })
      .catch((err) => {
        setError(err.message || 'فشل جلب المنتجات');
        setProducts(fakeProducts); // Use fake data as fallback
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getFavorites()
        .then((data) => {
          setFavorites(Array.isArray(data) ? data : data.data || []);
        })
        .catch(() => setFavorites([]));
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn]);

  const isInFavorites = (productId: string) => favorites.some((fav) => fav._id === productId);

  const handleToggleFavorite = async (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert('يرجى تسجيل الدخول أولاً');
      return;
    }

    setFavLoading(product._id);
    try {
      if (isInFavorites(product._id)) {
        const fav = favorites.find((f) => f._id === product._id);
        if (fav) {
          await deleteFavorite(fav._id);
          const updated = await getFavorites();
          setFavorites(Array.isArray(updated) ? updated : updated.data || []);
        }
      } else {
        await addFavorite(product._id);
        const updated = await getFavorites();
        setFavorites(Array.isArray(updated) ? updated : updated.data || []);
      }

      window.dispatchEvent(new CustomEvent('favoritesUpdated'));
    } catch (e) { }
    setFavLoading(null);
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert('يرجى تسجيل الدخول أولاً');
      return;
    }

    addToCart({
      _id: product._id || product.id,
      name: product?.title?.ar || product?.title?.en || 'اسم المنتج',
      price: product?.sale && product.sale > 0
        ? Number((product.price - (product.price * product.sale / 100)).toFixed(2))
        : product?.price || 0,
      image: (Array.isArray(product?.image) && product?.image[0]?.url) ? product.image[0].url : '/icons/products/1.png',
    });
    openCart();
  };

  // Distribute products for each section
  const featured = products.slice(0, 6);
  const newest = products.slice(6, 12);
  const bestSeller = products.slice(12, 18);

  let finalNewest = newest;
  let finalBestSeller = bestSeller;

  if (newest.length === 0 && products.length > 0) {
    if (products.length > 6) {
      finalNewest = products.slice(6, Math.min(12, products.length));
    } else {
      finalNewest = products.slice(0, Math.min(6, products.length));
    }
  }

  if (bestSeller.length === 0 && products.length > 0) {
    if (products.length > 12) {
      finalBestSeller = products.slice(12, Math.min(18, products.length));
    } else if (products.length > 6) {
      finalBestSeller = products.slice(6, Math.min(12, products.length));
    } else {
      finalBestSeller = products.slice(0, Math.min(6, products.length));
    }
  }

  if (products.length <= 6) {
    const half = Math.ceil(products.length / 2);
    finalNewest = products.slice(0, half);
    finalBestSeller = products.slice(half, products.length);
  }

  const usedProductIds = new Set();
  featured.forEach(product => usedProductIds.add(product._id));

  if (finalNewest.some(product => usedProductIds.has(product._id))) {
    const availableProducts = products.filter(product => !usedProductIds.has(product._id));
    finalNewest = availableProducts.slice(0, Math.min(6, availableProducts.length));
    finalNewest.forEach(product => usedProductIds.add(product._id));
  }

  if (finalBestSeller.some(product => usedProductIds.has(product._id))) {
    const availableProducts = products.filter(product => !usedProductIds.has(product._id));
    finalBestSeller = availableProducts.slice(0, Math.min(6, availableProducts.length));
  }

  if (finalNewest.length === 0 && products.length > 0) {
    const remainingProducts = products.filter(product => !usedProductIds.has(product._id));
    if (remainingProducts.length > 0) {
      finalNewest = remainingProducts.slice(0, Math.min(6, remainingProducts.length));
    } else {
      finalNewest = products.slice(-Math.min(6, products.length));
    }
  }

  if (finalBestSeller.length === 0 && products.length > 0) {
    const remainingProducts = products.filter(product => !usedProductIds.has(product._id));
    if (remainingProducts.length > 0) {
      finalBestSeller = remainingProducts.slice(0, Math.min(6, remainingProducts.length));
    } else {
      finalBestSeller = products.slice(-Math.min(6, products.length));
    }
  }

  if (finalBestSeller.length > 0 && finalBestSeller.some(product =>
    featured.some(f => f._id === product._id) || finalNewest.some(n => n._id === product._id)
  )) {
    const allUsedIds = new Set([
      ...featured.map(p => p._id),
      ...finalNewest.map(p => p._id)
    ]);
    const uniqueProducts = products.filter(product => !allUsedIds.has(product._id));
    if (uniqueProducts.length > 0) {
      finalBestSeller = uniqueProducts.slice(0, Math.min(6, uniqueProducts.length));
    }
  }

  if (finalNewest.length > 0 && finalNewest.some(product =>
    featured.some(f => f._id === product._id)
  )) {
    const featuredIds = new Set(featured.map(p => p._id));
    const uniqueProducts = products.filter(product => !featuredIds.has(product._id));
    if (uniqueProducts.length > 0) {
      finalNewest = uniqueProducts.slice(0, Math.min(6, uniqueProducts.length));
    }
  }

  console.log('📊 توزيع المنتجات:', {
    totalProducts: products.length,
    featured: featured.length,


    newest: finalNewest.length,
    bestSeller: finalBestSeller.length
  });

  // Slider settings for product cards
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
    //  arrowws card
    nextArrow: (
      <button className="absolute left-2 top-1/2 z-10 p-2 bg-white rounded-full shadow-md transition transform -translate-y-1/2 hover:bg-gray-100">

        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    ), prevArrow: (
      <button className="absolute right-2 top-1/2 z-10 p-2 bg-white rounded-full shadow-md transition transform -translate-y-1/2 hover:bg-gray-100">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    ),
  };

  return (
    <>
      <main>
        <HeroSection />
        <div>
          <CategoriesSection title="تسوق من أفضل الفئات" linkAll={`/categories`} isHome />
        </div>
        <section className="py-10 bg-white">
          <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-600 md:text-3xl">Today’s Deals</h2>
            {loading ? (
              <div className="py-10 text-center">جاري تحميل المنتجات...</div>
            ) : error ? (
              <div className="py-10 text-center text-red-500">{error}</div>
            ) : featured.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-xl text-gray-500">لا توجد منتجات متاحة حالياً</div>
              </div>
            ) : (
              // Mapping featured products to product cards in a horizontal slider
              <Slider {...sliderSettings}>
                {featured.map((product, index) => (
                  // Each product card is wrapped in a div for proper slider spacing
                  <div key={`featured-${product._id || product.id || index}`} className="px-2">
                    <ProductCard
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                      onAddToCart={(e) => handleAddToCart(product, e)}
                      onToggleFavorite={(e) => handleToggleFavorite(product, e)}
                      isInFavorites={isInFavorites(product._id)}
                      favLoading={favLoading === product._id}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </section>
        <section className="py-10 bg-white">
          <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl text-primary">منتجات جديدة</h2>
            {loading ? (
              <div className="py-10 text-center">جاري تحميل المنتجات...</div>
            ) : error ? (
              <div className="py-10 text-center text-red-500">{error}</div>
            ) : finalNewest.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-xl text-gray-500">لا توجد منتجات جديدة متاحة حالياً</div>
              </div>
            ) : (
              // Mapping newest products to product cards in a horizontal slider
              <Slider {...sliderSettings}>
                {finalNewest.map((product, index) => (
                  // Each product card is wrapped in a div for proper slider spacing
                  <div key={`newest-${product._id || product.id || index}`} className="px-2">
                    <ProductCard
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                      onAddToCart={(e) => handleAddToCart(product, e)}
                      onToggleFavorite={(e) => handleToggleFavorite(product, e)}
                      isInFavorites={isInFavorites(product._id)}
                      favLoading={favLoading === product._id}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </section>
        <section className="py-10 bg-white">
          <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl text-primary">الأعلى مبيعًا</h2>
            {loading ? (
              <div className="py-10 text-center">جاري تحميل المنتجات...</div>
            ) : error ? (
              <div className="py-10 text-center text-red-500">{error}</div>
            ) : finalBestSeller.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-xl text-gray-500">لا توجد منتجات في قائمة الأكثر مبيعاً حالياً</div>
              </div>
            ) : (
              // Mapping best seller products to product cards in a horizontal slider
              <Slider {...sliderSettings}>
                {finalBestSeller.map((product, index) => (
                  // Each product card is wrapped in a div for proper slider spacing
                  <div key={`bestseller-${product._id || product.id || index}`} className="px-2">
                    <ProductCard
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                      onAddToCart={(e) => handleAddToCart(product, e)}
                      onToggleFavorite={(e) => handleToggleFavorite(product, e)}
                      isInFavorites={isInFavorites(product._id)}
                      favLoading={favLoading === product._id}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </section>
      </main>
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}

function ProductCard({
  product,
  onClick,
  onAddToCart,
  onToggleFavorite,
  isInFavorites,
  favLoading
}: {
  product: any,
  onClick: () => void,
  onAddToCart: (e: React.MouseEvent) => void,
  onToggleFavorite: (e: React.MouseEvent) => void,
  isInFavorites: boolean,
  favLoading: boolean
}) {
  const category = product.category || 'Electronics';
  const originalPrice = product?.price || 0;
  const salePrice = product?.sale && product.sale > 0
    ? Number((originalPrice - (originalPrice * product.sale / 100)).toFixed(2))
    : originalPrice;
  const rating = 4;

  return (
    <div
      className="flex relative flex-col p-3 w-full h-full bg-white rounded-lg shadow-md transition duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 group"
      onClick={onClick}
    >

      <div className="flex absolute top-2 right-2 z-10 flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={onToggleFavorite}
          className={`rounded-full p-2 shadow-md transition-all duration-200 ${isInFavorites ? 'text-white bg-red-500 hover:bg-red-600' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            } ${favLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={isInFavorites ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          disabled={favLoading}
        >
          <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-white' : 'fill-none'}`} />
        </button>
        <button
          onClick={onAddToCart}
          className="p-2 text-white bg-blue-600 rounded-full shadow-md transition-colors duration-200 hover:bg-blue-700"
          title="أضف إلى السلة"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-center items-center mb-3 w-full bg-gray-100 rounded-md">
        <img
          src={product?.image?.[0]?.url || "/icons/products/1.png"}
          alt={product?.title?.ar || product?.title?.en || "Product"}
          className="object-contain w-full h-full max-h-36"
          onError={(e) => {
            e.currentTarget.src = "/icons/products/1.png";
          }}
        />
      </div>
      <div className="space-y-1 w-full text-center">
        <div className="flex gap-1 justify-center items-center text-xs text-gray-500">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
          <span className="ml-2">{category}</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <span className="font-bold text-orange-500">{salePrice} $</span>
          {product?.sale && product.sale > 0 && (
            <span className="text-sm text-gray-500 line-through">{originalPrice} $</span>
          )}
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {product?.title?.ar || product?.title?.en || "Product Name"}
          </h3>
        </div>
      </div>
    </div>
  );
}