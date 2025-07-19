import { CategoriesType } from "@/@types/api/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface categoryCardProps {
  category: CategoriesType
  isHome?: boolean
}

const CategoryCard: React.FC<categoryCardProps> = ({category, isHome }) => {
  return (
    <Link href={`/categories/${category?.documentId}/`}>
   <div className="group bg-white rounded-lg   transition-all duration-200 overflow-hidden p-6 flex flex-col items-center justify-center gap-4">
  
  {/* صورة التصنيف (دائرية) */}
  <div className="relative flex flex-col items-center">
    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
      <Image
        height={96}
        width={96}
        className="object-cover w-full h-full "
        src={category?.image?.url}
        alt={category?.name?.ar}
      />
    </div>

    {/* عنوان التصنيف */}
    <h3 className="mt-3 text-sm md:text-base font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 text-center">
      {category?.name?.ar}
    </h3>

    {/* أيقونة السهم */}
    {/* <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div> */}
  </div>
</div>

    </Link>
  );
};

export default CategoryCard;

