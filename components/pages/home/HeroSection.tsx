"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { getHeroBanner } from "@/lib/api";

const HeroSection = () => {
  const [banner, setBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeroBanner()
      .then((data) => {
        // البيانات تأتي ككائن واحد وليس كمصفوفة
        if (data && typeof data === 'object' && data.image) {
          setBanner(data);
        } else if (Array.isArray(data) && data.length > 0) {
          setBanner(data[0]);
        } else {
          // استخدام البيانات الافتراضية
          setBanner({
            image: { url: "/icons/home/1.png" },
            url: "#"
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        // في حالة الخطأ، استخدم البيانات الافتراضية
        setBanner({
          image: { url: "/icons/home/1.png" },
          url: "#"
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[40vw] min-h-[180px] max-h-[320px] sm:h-[50vw] md:h-[50vh] flex items-center justify-center bg-gray-100">
        <span className="text-lg text-gray-400">جاري تحميل الإعلان...</span>
      </div>
    );
  }

  if (!banner || !banner.image) {
    return (
      <div className="w-full h-[40vw] min-h-[180px] max-h-[320px] sm:h-[50vw] md:h-[50vh] flex items-center justify-center bg-gray-100">
        <span className="text-lg text-gray-400">لا يوجد بنر إعلاني متاح</span>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="w-full max-w-2xl bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-10 gap-6 md:gap-12">
        {/* النصوص */}
  

        {/* الصورة */}
        <div className="flex-1 w-full">
          <Image
            src={banner.image?.url || "/icons/home/1.png"}
            alt="بنر"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto object-contain"
            priority
          />
           <a
            href={banner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block  mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-transform hover:scale-105"
          >
            اشترِ الآن
          </a>
        </div>

      </div>
    </div>
  );

};

export default HeroSection;