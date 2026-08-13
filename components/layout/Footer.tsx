import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* =====================================================
              BRAND
          ====================================================== */}

          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="चित्रSTICKS home"
              className="inline-flex"
            >
              <Image
                src="/logo/logo-main.png"
                alt="चित्रSTICKS"
                width={280}
                height={90}
                className="h-auto w-[190px]"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Premium waterproof vinyl stickers designed for laptops, bikes,
              helmets, bottles and everything you love.
            </p>
          </div>

          {/* =====================================================
              SHOP
          ====================================================== */}

          <div>
            <h3 className="text-sm font-bold">Shop</h3>

            <div className="mt-5 space-y-4 text-sm text-gray-400">
              <Link
                href="/shop"
                className="block transition-colors hover:text-[#48C40F]"
              >
                Single Stickers
              </Link>

              <Link
                href="/#sticker-sheets"
                className="block transition-colors hover:text-[#48C40F]"
              >
                Sticker Sheets
              </Link>

              <Link
                href="/shop?category=custom"
                className="block transition-colors hover:text-[#48C40F]"
              >
                Custom Stickers
              </Link>
            </div>
          </div>

          {/* =====================================================
              SUPPORT
          ====================================================== */}

          <div>
            <h3 className="text-sm font-bold">Support</h3>

            <div className="mt-5 space-y-4 text-sm text-gray-400">
              <Link
                href="/shipping"
                className="block transition-colors hover:text-[#48C40F]"
              >
                Shipping
              </Link>

              <Link
                href="/returns"
                className="block transition-colors hover:text-[#48C40F]"
              >
                Returns
              </Link>

              <Link
                href="/privacy"
                className="block transition-colors hover:text-[#48C40F]"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* =====================================================
              CONNECT
          ====================================================== */}

          <div>
            <h3 className="text-sm font-bold">Connect</h3>

            <div className="mt-5 space-y-4 text-sm text-gray-400">
              {/* INSTAGRAM */}

              <a
                href="#"
                className="flex items-center gap-3 transition-colors hover:text-[#48C40F]"
              >
                <span className="text-base">◎</span>
                Instagram
              </a>

              {/* WHATSAPP */}

              <a
                href="#"
                className="flex items-center gap-3 transition-colors hover:text-[#48C40F]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>

              {/* EMAIL */}

              <a
                href="mailto:hello@chitrsticks.com"
                className="flex items-center gap-3 transition-colors hover:text-[#48C40F]"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}

        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} चित्रSTICKS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
