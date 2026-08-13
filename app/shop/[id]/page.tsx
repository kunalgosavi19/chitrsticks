"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const productId = Number(params.id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-black text-[#111111] sm:text-4xl">
              Product Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              The sticker you're looking for doesn't exist.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-[#48C40F] px-6 py-3 font-semibold text-white transition hover:bg-[#3ca40d]"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id
    )
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Back to Shop */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#48C40F]"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Image */}
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl bg-gray-50 p-5 sm:min-h-[400px] sm:p-8 md:min-h-[520px]">
            {product.bestseller && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#48C40F] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white sm:left-6 sm:top-6 sm:px-4 sm:py-2 sm:text-xs">
                Bestseller
              </span>
            )}

            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              priority
              className="h-auto max-h-[300px] w-full object-contain transition-transform duration-500 hover:scale-105 sm:max-h-[380px] md:max-h-[460px]"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#48C40F] sm:text-sm">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#111111] sm:mt-4 sm:text-4xl md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
              <span className="text-2xl font-black text-[#111111] sm:text-3xl">
                ₹{product.price}
              </span>

              {product.originalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through sm:text-lg">
                    ₹{product.originalPrice}
                  </span>

                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600 sm:px-3 sm:text-sm">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6 sm:mt-8 sm:pt-8">
              <h2 className="text-lg font-bold text-[#111111]">
                Product Details
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {product.description}
              </p>

              <div className="mt-5 space-y-3 text-sm text-gray-600 sm:mt-6">
                <p>
                  <span className="font-semibold text-[#111111]">
                    Material:
                  </span>{" "}
                  Premium vinyl
                </p>

                <p>
                  <span className="font-semibold text-[#111111]">Finish:</span>{" "}
                  Waterproof & self adhesive
                </p>

                <p>
                  <span className="font-semibold text-[#111111]">
                    Shipping:
                  </span>{" "}
                  Free on orders above ₹599
                </p>
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <div className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 px-2 sm:w-36">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  <Minus size={16} />
                </Button>

                <span className="font-bold">{quantity}</span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="h-12 w-full rounded-xl bg-[#48C40F] text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#3ca40d] active:scale-95 sm:flex-1"
              >
                <ShoppingCart size={19} />
                Add to Cart
              </Button>
            </div>

            <p className="mt-3 text-sm text-gray-400 sm:mt-4">
              Minimum order value: ₹299
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 sm:mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#48C40F] sm:text-sm">
                You May Also Like
              </span>

              <h2 className="mt-2 text-2xl font-black text-[#111111] sm:mt-3 sm:text-3xl md:text-4xl">
                Related Stickers
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
