"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/data/products";

const heroSlides = [
  {
    image: "/stickers/hero/hero-01-desktop.png",
    productName: "Manifest",
  },
  {
    image: "/stickers/hero/hero-02-desktop.png",
    productName: "Royal Enfield 2",
  },
  {
    image: "/stickers/hero/hero-03-desktop.png",
    productName: "Drift Machine",
  },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /*
   * Start with a different image whenever the homepage
   * is refreshed, then automatically change every 10 seconds.
   */
  useEffect(() => {
    const randomStart = Math.floor(Math.random() * heroSlides.length);

    setCurrentSlide(randomStart);

    const interval = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, 10000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /*
   * Find the product connected to the current hero slide.
   */
  const currentProduct = useMemo(() => {
    const target = normalize(heroSlides[currentSlide].productName);

    return products.find((product) => {
      const name = normalize(product.name);

      return name === target || name.includes(target) || target.includes(name);
    });
  }, [currentSlide]);

  const heroProductLink = currentProduct
    ? `/shop/${currentProduct.id}`
    : "/shop";

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HERO TEXT
        ====================================================== */}

        <div className="mx-auto max-w-4xl pt-9 text-center sm:pt-11 lg:pt-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#48C40F]
              sm:text-[11px]
              md:text-xs
            "
          >
            Designed in India • Built for Enthusiasts
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.05,
            }}
            className="
              mt-3
              text-[48px]
              font-black
              leading-[0.88]
              tracking-[-0.055em]
              text-[#111111]
              sm:text-6xl
              md:text-7xl
              lg:text-[80px]
              xl:text-[86px]
            "
          >
            Stick It.
            <br />
            <span className="text-[#48C40F]">Own It.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.1,
            }}
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-[13px]
              leading-6
              text-gray-600
              sm:text-base
              sm:leading-7
              md:text-lg
              md:leading-8
            "
          >
            Premium die-cut vinyl stickers made for bikes, cars, laptops,
            helmets and everything you call yours. Waterproof, UV-resistant and
            built to stand out.
          </motion.p>
        </div>

        {/* =====================================================
            HERO IMAGE
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-3
            w-full
            sm:mt-4
            md:mt-5
            lg:mt-2
          "
        >
          <Link
            href={heroProductLink}
            aria-label={
              currentProduct
                ? `View ${currentProduct.name}`
                : "View featured sticker"
            }
            className="group block"
          >
            <div
              className="
                relative
                mx-auto

                /* MOBILE — slightly bigger */
                h-[285px]
                w-full
                max-w-[470px]

                /* DESKTOP — unchanged */
                sm:h-[330px]
                sm:max-w-[600px]
                md:h-[420px]
                md:max-w-[850px]
                lg:h-[500px]
                lg:max-w-[1050px]
                xl:h-[530px]
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroSlides[currentSlide].image}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.015,
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroSlides[currentSlide].image}
                    alt={
                      currentProduct
                        ? currentProduct.name
                        : "चित्रSTICKS premium sticker collection"
                    }
                    fill
                    priority={currentSlide === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 1050px"
                    className="
                      object-contain
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.015]
                      md:scale-[1.06]
                      md:group-hover:scale-[1.075]
                    "
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Link>
        </div>

        {/* =====================================================
            BUTTONS
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="
            -mt-1
            flex
            flex-col
            items-center
            justify-center
            gap-2.5
            sm:-mt-2
            sm:flex-row
            sm:gap-3
            md:-mt-3
          "
        >
          {/* Shop Stickers */}
          <Link
            href="/shop"
            className="
              group
              inline-flex
              w-full
              max-w-[360px]
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#48C40F]
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-[0_8px_22px_rgba(72,196,15,0.15)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#3ca40d]
              hover:shadow-[0_12px_28px_rgba(72,196,15,0.22)]
              sm:w-auto
              sm:min-w-[175px]
            "
          >
            Shop Stickers
            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

          {/* Sticker Sheets */}
          <Link
            href="#sticker-sheets"
            className="
              group
              inline-flex
              w-full
              max-w-[360px]
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-gray-300
              bg-white
              px-7
              py-3.5
              text-sm
              font-bold
              text-[#111111]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#48C40F]
              hover:text-[#48C40F]
              sm:w-auto
              sm:min-w-[210px]
            "
          >
            Explore Sticker Sheets
            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>

        {/* =====================================================
            TRUST POINTS
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="
            mx-auto
            mt-1
            flex
            max-w-3xl
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-2
            border-t
            border-gray-100
            py-5
            text-[10px]
            font-medium
            text-gray-500
            sm:mt-2
            sm:gap-x-7
            sm:py-6
            sm:text-sm
          "
        >
          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-[#48C40F] sm:h-3.5 sm:w-3.5" />
            Waterproof
          </span>

          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-[#48C40F] sm:h-3.5 sm:w-3.5" />
            UV Resistant
          </span>

          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-[#48C40F] sm:h-3.5 sm:w-3.5" />
            Premium Vinyl
          </span>

          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-[#48C40F] sm:h-3.5 sm:w-3.5" />
            Made in India
          </span>
        </motion.div>
      </div>
    </section>
  );
}
