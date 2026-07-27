import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="bg-[#fafafa] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Featured"
          title="Popular Picks"
          description="Our most loved premium vinyl stickers."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}