"use client";

import { Droplets, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
  {
    icon: Droplets,
    title: "100% Waterproof",
    description:
      "Premium vinyl stickers that survive rain, bottles and daily use.",
  },
  {
    icon: ShieldCheck,
    title: "Scratch Resistant",
    description: "Designed to stay vibrant without peeling or fading.",
  },
  {
    icon: Sparkles,
    title: "Premium Finish",
    description: "Crisp printing with a smooth matte finish.",
  },
  {
    icon: Truck,
    title: "Ships Across India",
    description: "Fast shipping with free delivery on orders above ₹599.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Why Choose Us"
          title="Built to Last."
          description="Premium quality stickers designed for laptops, bikes, helmets, bottles and more."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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

                <h3 className="text-xl font-bold text-[#111111]">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
