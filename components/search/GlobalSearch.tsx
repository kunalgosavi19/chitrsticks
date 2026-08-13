"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { products } from "@/data/products";

interface GlobalSearchProps {
  isOpen: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}

const suggestions = ["car", "gym", "elephant", "cute", "bike"];

const collections = [
  {
    title: "Automotive",
    description: "Bikes, cars & racing",
    href: "/shop?category=automotive",
  },
  {
    title: "Gym",
    description: "For lifters & athletes",
    href: "/shop?category=gym",
  },
  {
    title: "Lifestyle",
    description: "Express yourself",
    href: "/shop?category=lifestyle",
  },
  {
    title: "Cute",
    description: "Cute & playful designs",
    href: "/shop?category=cute",
  },
];

export default function GlobalSearch({
  isOpen,
  query,
  onQueryChange,
  onClose,
}: GlobalSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const searchTerm = query.trim().toLowerCase();

  const matchingProducts = useMemo(() => {
    if (!searchTerm) return [];

    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          (product.description?.toLowerCase().includes(searchTerm) ?? false)
        );
      })
      .slice(0, 6);
  }, [searchTerm]);

  const matchingSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm)
  );

  const matchingCollections = collections.filter(
    (collection) =>
      collection.title.toLowerCase().includes(searchTerm) ||
      collection.description.toLowerCase().includes(searchTerm)
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}

      <div
        className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Search Panel */}

      <div className="fixed left-0 right-0 top-[82px] z-[90] max-h-[calc(100vh-82px)] overflow-hidden bg-white shadow-2xl md:top-[96px] md:max-h-[calc(100vh-96px)]">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 md:py-6">
          {/* Search Input */}

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search
                size={21}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 sm:left-5"
              />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search stickers..."
                autoComplete="off"
                className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-base font-medium text-[#111111] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#48C40F] focus:bg-white focus:ring-4 focus:ring-[#48C40F]/10 sm:pl-14 sm:pr-5"
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-[#111111] hover:text-white"
            >
              <X size={21} />
            </button>
          </div>

          {/* Search Content */}

          <div className="mt-4 max-h-[calc(100vh-170px)] overflow-y-auto pb-4 md:max-h-[calc(100vh-190px)]">
            {/* EMPTY SEARCH */}

            {!searchTerm && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                  Popular Searches
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => onQueryChange(suggestion)}
                      className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-[#48C40F] hover:bg-[#48C40F]/10 hover:text-[#48C40F]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="mt-7 border-t border-gray-100 pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Browse Collections
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {collections.map((collection) => (
                      <Link
                        key={collection.title}
                        href={collection.href}
                        onClick={onClose}
                        className="group flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4 transition-all duration-200 hover:bg-[#48C40F]/10"
                      >
                        <div>
                          <p className="font-bold text-[#111111] transition-colors group-hover:text-[#48C40F]">
                            {collection.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {collection.description}
                          </p>
                        </div>

                        <ArrowRight
                          size={17}
                          className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#48C40F]"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVE SEARCH */}

            {searchTerm && (
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                {/* Search For */}

                <Link
                  href={`/shop?search=${encodeURIComponent(query.trim())}`}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-gray-100 px-5 py-4 transition-colors hover:bg-gray-50 sm:px-6"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Search
                    </p>

                    <p className="mt-1 font-bold text-[#111111]">
                      Search for "{query.trim()}"
                    </p>
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#48C40F]"
                  />
                </Link>

                {/* Suggestions */}

                {matchingSuggestions.length > 0 && (
                  <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                      Suggestions
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {matchingSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => onQueryChange(suggestion)}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-[#48C40F]/10 hover:text-[#48C40F]"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}

                {matchingProducts.length > 0 && (
                  <div className="px-5 py-5 sm:px-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                        Products
                      </p>

                      <span className="text-xs font-semibold text-gray-400">
                        {matchingProducts.length} found
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {matchingProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/shop/${product.id}`}
                          onClick={onClose}
                          className="group flex items-center gap-3 py-3 transition-colors first:pt-1 last:pb-1 hover:bg-gray-50 sm:gap-4"
                        >
                          {/* Image */}

                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-[72px] sm:w-[72px]">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="72px"
                              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          {/* Details */}

                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-bold text-[#111111] group-hover:text-[#48C40F]">
                              {product.name}
                            </h3>

                            <p className="mt-1 text-xs capitalize text-gray-400">
                              {product.category}
                            </p>

                            <div className="mt-1.5 flex items-center gap-2">
                              <span className="font-bold text-[#111111]">
                                ₹{product.price}
                              </span>

                              {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}

                          <ArrowRight
                            size={18}
                            className="shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#48C40F]"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Products */}

                {matchingProducts.length === 0 && (
                  <div className="px-6 py-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Search size={20} className="text-gray-400" />
                    </div>

                    <p className="mt-4 font-bold text-[#111111]">
                      No stickers found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Try another search term.
                    </p>
                  </div>
                )}

                {/* Collections */}

                {matchingCollections.length > 0 && (
                  <div className="border-t border-gray-100 px-5 py-5 sm:px-6">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                      Collections
                    </p>

                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {matchingCollections.map((collection) => (
                        <Link
                          key={collection.title}
                          href={collection.href}
                          onClick={onClose}
                          className="group flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 transition-all duration-200 hover:bg-[#48C40F]/10"
                        >
                          <div>
                            <p className="font-bold text-[#111111] group-hover:text-[#48C40F]">
                              {collection.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {collection.description}
                            </p>
                          </div>

                          <ArrowRight
                            size={16}
                            className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#48C40F]"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
