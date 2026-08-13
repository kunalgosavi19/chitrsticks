import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";

export default function BestSellers() {
  const bestSellers = products
    .filter((product) => product.bestseller)
    .slice(0, 6);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Trending Now"
          title="Best Sellers"
          description="The stickers everyone is loving right now."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
