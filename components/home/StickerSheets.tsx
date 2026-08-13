"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function StickerSheets() {
  const { addToCart } = useCart();

  const stickerSheets = products.filter(
    (product) => product.category === "sheets"
  );

  const getDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0;

    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section
      id="sticker-sheets"
      className="scroll-mt-24 border-t border-gray-100 bg-white px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#48C40F]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#48C40F]">
            Sticker Sheets
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#111111] md:text-6xl">
            More Stickers.
            <span className="block text-[#48C40F]">One Sheet.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
            Get a collection of your favorite designs together. Perfect for
            laptops, bottles, notebooks, helmets and everything else that
            deserves a little personality.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2">
          {stickerSheets.map((product) => {
            const discount = getDiscount(product.price, product.originalPrice);

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#48C40F]/30 hover:shadow-xl"
              >
                {/* IMAGE */}
                <Link
                  href={`/shop/${product.id}`}
                  className="block"
                  aria-label={`View ${product.name}`}
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#fafafa] p-8 md:p-12">
                    {discount > 0 && (
                      <span className="absolute left-5 top-5 z-10 rounded-full bg-[#48C40F] px-3 py-1.5 text-xs font-bold text-white">
                        -{discount}%
                      </span>
                    )}

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04] md:p-12"
                    />
                  </div>
                </Link>

                {/* PRODUCT INFO */}
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link href={`/shop/${product.id}`}>
                        <h3 className="text-xl font-black tracking-tight text-[#111111] transition-colors group-hover:text-[#48C40F] md:text-2xl">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-xl font-black text-[#111111]">
                      ₹{product.price}
                    </span>

                    {product.originalPrice && (
                      <span className="text-sm font-medium text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}

                    {discount > 0 && (
                      <span className="text-sm font-bold text-[#48C40F]">
                        Save {discount}%
                      </span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          title: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#48C40F] px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#3caf0d] hover:shadow-lg"
                    >
                      <ShoppingCart size={17} />
                      Add to Cart
                    </button>

                    <Link
                      href={`/shop/${product.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:border-[#48C40F] hover:text-[#48C40F]"
                    >
                      View Product
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* SMALL FOOTNOTE */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400">
            Premium vinyl • Waterproof • UV resistant • Made for everyday use
          </p>
        </div>
      </div>
    </section>
  );
}
