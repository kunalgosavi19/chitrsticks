"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const menuItems = [
  {
    label: "Shop All",
    href: "/shop",
  },
  {
    label: "Automotive",
    href: "/shop?category=automotive",
  },
  {
    label: "Gym",
    href: "/shop?category=gym",
  },
  {
    label: "Lifestyle",
    href: "/shop?category=lifestyle",
  },
  {
    label: "Cute",
    href: "/shop?category=cute",
  },
];

export default function Navbar() {
  const { cart, openCart } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 md:h-[96px] md:px-8">
          {/* LEFT */}

          <div className="flex w-20 justify-start">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-full hover:bg-gray-100"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* CENTER LOGO */}

          <Link
            href="/"
            className="flex flex-1 justify-center"
            aria-label="चित्रSTICKS home"
          >
            <Image
              src="/logo/logo-main.png"
              alt="चित्रSTICKS"
              width={340}
              height={110}
              priority
              className="h-auto w-[170px] transition-transform duration-300 hover:scale-105 sm:w-[220px] md:w-[260px] lg:w-[320px]"
            />
          </Link>

          {/* RIGHT */}

          <div className="flex w-20 justify-end gap-1 md:w-32 md:gap-2">
            {/* SEARCH */}

            <Link href="/shop?focus=search" aria-label="Search stickers">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                aria-label="Search stickers"
              >
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </Link>

            {/* WISHLIST */}

            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-full hover:bg-gray-100 sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 md:h-6 md:w-6" />
            </Button>

            {/* CART */}

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-gray-100"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#48C40F] text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MENU OVERLAY
      ====================================================== */}

      {isMenuOpen && (
        <>
          {/* BACKDROP */}

          <div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            onClick={closeMenu}
          />

          {/* MENU */}

          <aside className="fixed left-0 top-0 z-[70] h-screen w-full max-w-sm bg-white shadow-2xl">
            {/* MENU HEADER */}

            <div className="flex h-[82px] items-center justify-between border-b px-5 md:h-[96px]">
              {/* ACTUAL LOGO — REPLACED TEXT */}

              <Link
                href="/"
                onClick={closeMenu}
                aria-label="चित्रSTICKS home"
                className="flex items-center"
              >
                <Image
                  src="/logo/logo-main.png"
                  alt="चित्रSTICKS"
                  width={220}
                  height={72}
                  priority
                  className="h-auto w-[145px] sm:w-[165px]"
                />
              </Link>

              {/* CLOSE */}

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* MENU ITEMS */}

            <nav className="p-5">
              <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                Shop
              </p>

              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-bold text-[#111111] transition-colors hover:bg-[#48C40F]/10 hover:text-[#48C40F]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="my-6 border-t border-gray-100" />

              <Link
                href="/shop"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-2xl bg-[#48C40F] px-4 py-4 font-bold text-white transition hover:bg-[#3ca40d]"
              >
                Explore All Stickers
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
