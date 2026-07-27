"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const stickers = [
  {
    src: "/stickers/hero/turbo-charged.jpg",
    className: "top-0 left-16 rotate-[-12deg]",
  },
  {
    src: "/stickers/hero/petrol-fuel-only.jpg",
    className: "top-20 right-0 rotate-[8deg]",
  },
  {
    src: "/stickers/hero/wasted.jpg",
    className: "bottom-10 left-0 rotate-[10deg]",
  },
  {
    src: "/stickers/hero/built-not-bought.jpg",
    className: "bottom-0 right-20 rotate-[-8deg]",
  },
  {
    src: "/stickers/hero/ah-shit.jpg",
    className: "top-44 left-40 rotate-[5deg]",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#f4fff0,white_60%)]">
      <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="rounded-full bg-[#48C40F]/10 px-4 py-2 text-sm font-semibold text-[#48C40F]">
            Premium Waterproof Vinyl
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight lg:text-7xl">
            Stick It.
            <br />
            Own It.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Premium vinyl stickers for laptops, bikes, helmets,
            bottles and everything you love.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-[#48C40F] px-7 py-4 font-semibold text-white transition hover:scale-105">
              Shop Singles
            </button>

            <button className="flex items-center gap-2 rounded-full border px-7 py-4 font-semibold transition hover:bg-black hover:text-white">
              Sticker Sheets
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-gray-600">
            <span>⭐ Premium Vinyl</span>
            <span>🚚 Free Shipping ₹599+</span>
            <span>🛒 Minimum Cart ₹299</span>
          </div>
        </motion.div>

        {/* RIGHT */}

        <div className="relative h-[600px] hidden lg:block">
          {stickers.map((sticker, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
              }}
              className={`absolute ${sticker.className}`}
            >
              <div className="rounded-3xl bg-white p-3 shadow-2xl">
                <Image
                  src={sticker.src}
                  alt=""
                  width={220}
                  height={220}
                  className="rounded-2xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}