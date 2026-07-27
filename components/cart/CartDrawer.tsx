"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const minimumOrder = 299;
  const freeShipping = 599;
  
  const remainingForMinimum = Math.max(0, minimumOrder - subtotal);
  const remainingForShipping = Math.max(0, freeShipping - subtotal);
  const minimumProgress = Math.min((subtotal / minimumOrder) * 100, 100);
  const shippingProgress = Math.min((subtotal / freeShipping) * 100, 100);

  if (!isCartOpen) return null;
  const handleWhatsAppCheckout = () => {
    const phone = "919137109849"; // Replace with client's WhatsApp number
  
    const orderItems = cart
      .map(
        (item) =>
          `• ${item.title}\n   Qty: ${item.quantity} × ₹${item.price} = ₹${
            item.quantity * item.price
          }`
      )
      .join("\n\n");
  
    const message = `Hi 👋
  
  I'd like to place an order from *चित्रSTICKS*.
  
  ${orderItems}
  
  -------------------------
  Subtotal: ₹${subtotal}
  -------------------------
  
  Name:
  Phone:
  Address:
  
  Thank you! 😊`;
  
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

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
          Shopping Cart (
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
           )
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
        className="flex gap-4 rounded-2xl border border-gray-200 p-3"
      >
        <Image
          src={item.image}
          alt={item.title}
          width={80}
          height={80}
          className="rounded-xl border object-contain"
        />
      
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">₹{item.price}</p>
          </div>
      
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decreaseQty(item.id)}
              >
                −
              </Button>
      
              <span className="w-6 text-center font-semibold">
                {item.quantity}
              </span>
      
              <Button
                variant="outline"
                size="icon"
                onClick={() => increaseQty(item.id)}
              >
                +
              </Button>
            </div>
      
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      ))}
    </div>
  )}
</div>
{/* Footer */}
<div className="sticky bottom-0 border-t bg-white/95 backdrop-blur-md p-5 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
  <div className="mb-4 flex items-center justify-between text-lg font-bold">
    <span>Subtotal</span>
    <span>₹{subtotal}</span>
  </div>

  <div className="space-y-4 mb-5">

  {/* Minimum Order */}
  <div>
    <div className="mb-2 flex justify-between text-sm">
      <span>Minimum Order</span>
      <span>₹{subtotal} / ₹299</span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full bg-orange-500 transition-all duration-500"
        style={{ width: `${minimumProgress}%` }}
      />
    </div>

    {subtotal < minimumOrder ? (
      <p className="mt-2 text-xs text-orange-600">
        Add ₹{remainingForMinimum} more to checkout.
      </p>
    ) : (
      <p className="mt-2 text-xs text-green-600">
        ✅ Minimum order reached
      </p>
    )}
  </div>

  {/* Free Shipping */}
  <div>
    <div className="mb-2 flex justify-between text-sm">
      <span>Free Shipping</span>
      <span>₹{subtotal} / ₹599</span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${shippingProgress}%` }}
      />
    </div>

    {subtotal < freeShipping ? (
      <p className="mt-2 text-xs text-gray-500">
        Add ₹{remainingForShipping} more for FREE shipping 🚚
      </p>
    ) : (
      <p className="mt-2 text-xs text-green-600">
        🎉 You unlocked FREE shipping!
      </p>
    )}
  </div>

</div>

<Button
  className="w-full h-12 rounded-xl bg-[#25D366] text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#1ebe5d] active:scale-95"
  disabled={subtotal < minimumOrder}
  onClick={handleWhatsAppCheckout}
>
  Checkout on WhatsApp
</Button>
</div>
      </div>
    </>
  );
}