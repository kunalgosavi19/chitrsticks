"use client";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-[#48C40F] focus:ring-2 focus:ring-[#48C40F]/10 sm:w-auto sm:px-5"
    >
      <option value="featured">Featured</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="name-az">Name: A to Z</option>
      <option value="name-za">Name: Z to A</option>
    </select>
  );
}
