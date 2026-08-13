"use client";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  { value: "all", label: "All Stickers" },
  { value: "automotive", label: "Automotive" },
  { value: "gym", label: "Gym" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "elephants", label: "Cute Elephants" },
];

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
      {categories.map((category) => {
        const active = value === category.value;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() => onChange(category.value)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 sm:px-5 sm:py-2.5 ${
              active
                ? "border-[#48C40F] bg-[#48C40F] text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#48C40F] hover:text-[#48C40F]"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
