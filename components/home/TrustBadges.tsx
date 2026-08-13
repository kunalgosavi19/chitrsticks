"use client";

import { Truck, ShieldCheck, BadgeCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Orders above ₹599",
  },
  {
    icon: Sparkles,
    title: "Premium Vinyl",
    description: "Waterproof & UV Resistant",
  },
  {
    icon: BadgeCheck,
    title: "Die-Cut Precision",
    description: "Clean Finish • Bubble Free",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description: "Made to Last",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#48C40F]/40 hover:shadow-xl"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#48C40F]/10 transition-colors duration-300 group-hover:bg-[#48C40F]"
                >
                  <Icon className="h-7 w-7 text-[#48C40F] transition-colors duration-300 group-hover:text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900">
                  {badge.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
