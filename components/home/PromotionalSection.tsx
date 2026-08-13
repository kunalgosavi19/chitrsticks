"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PromotionalSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[2rem] bg-[#111111] px-8 py-16 text-white md:px-14 lg:px-20"
        >
          {/* Animated glow */}
          <motion.div
            animate={{
              x: [0, 35, 0],
              y: [0, 20, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#48C40F]/20 blur-3xl"
          />

          <motion.div
            animate={{
              x: [0, -25, 0],
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#48C40F]/10 blur-3xl"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="relative z-10 max-w-2xl"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="inline-flex rounded-full bg-[#48C40F]/15 px-4 py-2 text-sm font-semibold text-[#48C40F]"
            >
              Built for Enthusiasts
            </motion.span>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl"
            >
              More stickers.
              <br />
              More personality.
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-xl text-lg leading-8 text-gray-300"
            >
              Find your next favourite sticker and make your bike, laptop,
              helmet or everyday gear unmistakably yours.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/shop"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#48C40F] px-7 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#3ca40d]"
              >
                Explore Stickers
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
