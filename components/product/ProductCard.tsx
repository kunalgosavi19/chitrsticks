"use client";

import Image from "next/image";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: (typeof products)[number];
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();  
  const discount =
    product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-2xl"
    >
      <div className="relative p-6">
        {product.bestSeller && (
          <span className="absolute left-4 top-4 rounded-full bg-[#48C40F] px-3 py-1 text-xs font-bold text-white">
            BEST SELLER
          </span>
        )}

        <motion.div whileHover={{ rotate: 3, scale: 1.05 }}>
          <Image
            src={product.image}
            alt={product.name}
            width={260}
            height={260}
            className="mx-auto max-h-56 w-full object-contain transition duration-300 group-hover:scale-110"
          />
        </motion.div>
      </div>

      <div className="space-y-3 px-6 pb-6">
        <h3 className="text-lg font-bold text-[#111111]">
          {product.name}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-black">
            ₹{product.price}
          </span>

          {product.originalPrice && (
            <>
              <span className="text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>

              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        <Button
  className="w-full rounded-full bg-[#48C40F] hover:bg-[#3ca40d]"
  onClick={() =>
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
    })
  }
>
  <ShoppingCart className="mr-2 h-4 w-4" />
  + Add
</Button>
      </div>
    </motion.div>
  );
}