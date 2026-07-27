"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">
            Shopping Cart ({cart.length})
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
          >
            <X />
          </Button>
        </div>

       {/* Body */}
<div className="flex-1 overflow-y-auto p-5">
  {cart.length === 0 ? (
    <p className="text-center text-gray-500">
      Your cart is empty.
    </p>
  ) : (
    <div className="space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-xl border p-3"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-20 w-20 rounded-lg object-contain border"
          />

          <div className="flex-1">
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500">
              ₹{item.price}
            </p>

            <p className="mt-1 text-sm font-medium">
              Quantity: {item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </>
  );
}