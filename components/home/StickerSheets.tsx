import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";

export default function StickerSheets() {
  const sheets = products.filter((p) => p.type === "sheet");

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Sticker Sheets"
          title="More Stickers. Better Value."
          description="Perfect if you want multiple premium stickers in one pack."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sheets.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}