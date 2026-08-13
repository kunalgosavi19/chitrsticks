"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import SearchBar from "@/components/shop/SearchBar";
import CategoryFilter from "@/components/shop/CategoryFilter";
import SortSelect from "@/components/shop/SortSelect";
import { products } from "@/data/products";

function ShopPageContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [focusSearch, setFocusSearch] = useState(false);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search");
    const shouldFocusSearch = searchParams.get("focus") === "search";

    if (
      categoryFromUrl === "automotive" ||
      categoryFromUrl === "gym" ||
      categoryFromUrl === "lifestyle" ||
      categoryFromUrl === "cute"
    ) {
      setCategory(categoryFromUrl);
    } else {
      setCategory("all");
    }

    setSearch(searchFromUrl ?? "");
    setFocusSearch(shouldFocusSearch);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "name-az":
          return a.name.localeCompare(b.name);

        case "name-za":
          return b.name.localeCompare(a.name);

        case "featured":
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
  }, [search, category, sort]);

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-[#48C40F]/10 px-4 py-2 text-sm font-semibold text-[#48C40F]">
            Shop Stickers
          </span>

          <h1 className="mt-5 text-4xl font-black md:text-5xl">All Stickers</h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore our complete collection of premium waterproof vinyl
            stickers.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-6 max-w-2xl">
          <SearchBar
            value={search}
            onChange={setSearch}
            autoFocus={focusSearch}
          />
        </div>

        {/* Categories */}
        <div className="mb-10">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        {/* Results + Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-[#111111]">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "sticker" : "stickers"}
          </p>

          <SortSelect value={sort} onChange={setSort} />
        </div>

        {/* Products */}
        <ProductGrid products={filteredProducts} />
      </section>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white">
          <Navbar />

          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-gray-500">Loading stickers...</p>
            </div>
          </section>

          <Footer />
        </main>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
