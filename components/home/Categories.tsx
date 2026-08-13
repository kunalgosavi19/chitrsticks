"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Automotive",
    subtitle: "Bikes, cars & racing",
    href: "/shop?category=automotive",
  },
  {
    title: "Gym",
    subtitle: "For lifters & athletes",
    href: "/shop?category=gym",
  },
  {
    title: "Lifestyle",
    subtitle: "Express yourself",
    href: "/shop?category=lifestyle",
  },
  {
    title: "Cute",
    subtitle: "Cute & playful designs",
    href: "/shop?category=cute",
  },
];

export default function Categories() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#48C40F]/10 px-4 py-2 text-sm font-semibold text-[#48C40F]">
            Explore Collections
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-[#111111] md:text-6xl">
            Shop by Collection
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Find stickers made for riders, gym enthusiasts, everyday creators
            and anyone who loves a little personality.
          </p>
        </div>

        {/* Category Cards */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
              }}
              viewport={{ once: true }}
            >
              <Link
                href={category.href}
                className="group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#48C40F]/40 hover:shadow-xl md:min-h-56 md:p-8"
              >
                {/* Green hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#48C40F]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                    Collection
                  </span>

                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:border-[#48C40F] group-hover:bg-[#48C40F] group-hover:text-white"
                  >
                    <ArrowUpRight size={19} />
                  </motion.div>
                </div>

                <div className="relative z-10 mt-10">
                  <h3 className="text-3xl font-black tracking-tight text-[#111111] transition-colors duration-300 group-hover:text-[#48C40F] md:text-4xl">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-base text-gray-500">
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
