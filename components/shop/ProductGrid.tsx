"use client";

import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold text-[#111111]">No stickers found</h3>

        <p className="mt-2 text-gray-500">Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
