"use client";

import Image from "next/image";
import Link from "next/link";
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

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
    >
      {/* Product */}
      <Link
        href={`/shop/${product.id}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        {/* Product Image */}
        <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-50 sm:h-56 md:h-64">
          {product.bestseller && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute left-3 top-3 z-20 rounded-full bg-[#48C40F] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:text-xs"
            >
              BEST SELLER
            </motion.span>
          )}

          <motion.div
            whileHover={{
              scale: 1.06,
              rotate: 2,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="relative h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-4 transition-transform duration-300 sm:p-5 md:p-6"
            />
          </motion.div>
        </div>

        {/* Product Details */}
        <div className="space-y-3 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6 md:pt-5">
          <h3 className="line-clamp-2 min-h-[48px] text-base font-bold text-[#111111] transition-colors group-hover:text-[#48C40F] sm:text-lg">
            {product.name}
          </h3>

          <div className="flex min-h-8 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xl font-black sm:text-2xl">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through sm:text-base">
                  ₹{product.originalPrice}
                </span>

                <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-600 sm:text-xs">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6">
        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            className="h-10 w-full rounded-full bg-[#48C40F] text-sm text-white shadow-sm transition-all duration-200 hover:bg-[#3ca40d] hover:shadow-md sm:h-11 sm:text-base"
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
            Add to Cart
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
