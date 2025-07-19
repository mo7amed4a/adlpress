"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserCircle, Heart } from "lucide-react";
import { AuthDialogs } from "../auth/auth-dialogs";
import CartIcon from "../cart/CartIcon";
import Link from "next/link";
import { isTokenValid } from "@/lib/api";
import { useUser } from "@/components/Providers";
import { cn } from "@/lib/utils";

export function LinksNavbar({ isMobile = false }: { isMobile?: boolean }) {
  const { isLoggedIn } = useUser();

  const baseStyles =
    "flex items-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50";

  const mobileStyles =
    "w-full px-4 py-2 text-center text-white hover:opacity-90 dark:bg-gray-900 dark:hover:bg-gray-800";

  const desktopStyles =
    "h-12 px-5 py-2 text-white hover:opacity-90 dark:bg-gray-900 dark:hover:bg-gray-800";

  const iconSize = isMobile ? "size-6" : "size-5";

  return (
    <>
      {!isLoggedIn && (
        <AuthDialogs
          trigger={
            <Button
              variant="ghost"
              className={cn(
                baseStyles,
                isMobile ? mobileStyles : desktopStyles + " mr-4",
                "text-white  hover:text-primary transition-colors duration-200"
              )}
            >
              <UserCircle className={`${iconSize}`} />
              <span className="whitespace-nowrap">تسجيل الدخول / إنشاء حساب</span>
            </Button>
          }
        />

      )}
    </>
  );
}
