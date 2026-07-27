"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart, openCart } = useCart();
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <>
      {/* Announcement */}
      <div className="bg-[#48C40F] py-2 text-center text-sm font-medium text-white">
      🚚 Free Shipping Above ₹599 • Minimum Order ₹299 • Premium Waterproof Vinyl
      </div>

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-3">

            <Image
              src="/logo/logo.png"
              alt="चित्रSTICKS"
              width={56}
              height={56}
              className="rounded-xl"
            />

            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tight">
                चित्रSTICKS
              </h1>

              <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
                Premium Stickerz
              </p>
            </div>

          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">

            

            <Link
              href="/shop"
              className="font-medium transition hover:text-[#48C40F]"
            >
              Shop
            </Link>

            <Link
              href="/"
              className="font-medium transition hover:text-[#48C40F]"
            >
              Sticker Sheets
            </Link>

            <Link
              href="/"
              className="font-medium transition hover:text-[#48C40F]"
            >
              Custom
            </Link>

          </nav>

          {/* Icons */}

          <div className="flex items-center gap-2">

            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />

              {totalItems > 0 && (
  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#48C40F] text-[10px] font-bold text-white">
    {totalItems}
  </span>
)}

            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

          </div>

        </div>
      </header>
    </>
  );
}