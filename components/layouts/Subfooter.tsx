"use client";
import Image from "next/image";
import React from "react";

export default function Subfooter() {
  return (
    <div className="grid grid-cols-1 mt-6">
      <div className="flex flex-wrap justify-center items-center gap-6">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="w-full sm:w-[45%] lg:w-[30%] max-w-[350px] flex justify-center"
          >
            <Image
              src={`/${num}.webp`}
              width={350}
              height={350}
              alt={`icon ${num}`}
              className="rounded-xl shadow-md w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
