import { Droplets, ShieldCheck, Sparkles, Truck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
  {
    icon: Droplets,
    title: "100% Waterproof",
    description: "Premium vinyl stickers that survive rain, bottles and daily use.",
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
    <section className="py-24 bg-white">
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
              <div
                key={index}
                className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#48C40F]/10">
                  <Icon className="h-7 w-7 text-[#48C40F]" />
                </div>

                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}