"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search stickers..."
        className="h-12 w-full rounded-full border border-gray-200 bg-white pl-12 pr-5 text-sm outline-none transition focus:border-[#48C40F] focus:ring-2 focus:ring-[#48C40F]/10"
      />
    </div>
  );
}
