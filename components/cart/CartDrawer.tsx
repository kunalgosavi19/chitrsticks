"use client";

import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";

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

  const shippingProgress = Math.min((subtotal / freeShipping) * 100, 100);

  const handleWhatsAppCheckout = () => {
    const phone = "919137109849";

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

---

*Subtotal: ₹${subtotal}*

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
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <h2 className="text-xl font-black text-[#111111]">
                  Shopping Cart
                </h2>

                <p className="text-sm text-gray-500">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  {cart.length === 1 ? "item" : "items"}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="rounded-full transition-transform duration-200 hover:rotate-90"
              >
                <X size={22} />
              </Button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col items-center justify-center px-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.35,
                      ease: "backOut",
                    }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50"
                  >
                    <ShoppingBag size={30} className="text-[#48C40F]" />
                  </motion.div>

                  <h3 className="text-xl font-bold">Your cart is empty</h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Looks like you haven't added any stickers yet.
                  </p>

                  <Button
                    onClick={closeCart}
                    className="mt-6 rounded-full bg-[#48C40F] px-6 hover:bg-[#3ca40d]"
                  >
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4 p-5">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: 40,
                          height: 0,
                          marginBottom: 0,
                          overflow: "hidden",
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                        }}
                        className="rounded-2xl border border-gray-200 p-3"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <motion.div
                            layout
                            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50"
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain p-2"
                            />
                          </motion.div>

                          {/* Product Details */}
                          <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div>
                              <h3 className="line-clamp-2 font-bold text-[#111111]">
                                {item.title}
                              </h3>

                              <p className="mt-1 font-semibold">
                                ₹{item.price}
                              </p>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              {/* Quantity */}
                              <div className="flex items-center rounded-full border border-gray-200">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full transition-transform active:scale-75"
                                  onClick={() => decreaseQty(item.id)}
                                >
                                  <Minus size={14} />
                                </Button>

                                <motion.span
                                  key={item.quantity}
                                  initial={{
                                    scale: 0.7,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    scale: 1,
                                    opacity: 1,
                                  }}
                                  transition={{
                                    duration: 0.15,
                                  }}
                                  className="w-8 text-center text-sm font-bold"
                                >
                                  {item.quantity}
                                </motion.span>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full transition-transform active:scale-75"
                                  onClick={() => increaseQty(item.id)}
                                >
                                  <Plus size={14} />
                                </Button>
                              </div>

                              {/* Remove */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-75"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Bottom Section */}
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.25 }}
                  className="border-t bg-white p-5"
                >
                  {/* Free Shipping Progress */}
                  <div className="mb-5 rounded-2xl bg-gray-50 p-4">
                    {subtotal < freeShipping ? (
                      <p className="mb-2 text-sm text-gray-600">
                        Add{" "}
                        <span className="font-bold text-[#111111]">
                          ₹{remainingForShipping}
                        </span>{" "}
                        more for FREE shipping 🚚
                      </p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-2 text-sm font-semibold text-green-600"
                      >
                        🎉 You unlocked FREE shipping!
                      </motion.p>
                    )}

                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        className="h-full rounded-full bg-[#48C40F]"
                        animate={{
                          width: `${shippingProgress}%`,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Free shipping on orders above ₹599
                    </p>
                  </div>

                  {/* Minimum Order */}
                  <AnimatePresence>
                    {subtotal < minimumOrder && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          y: 10,
                        }}
                        className="mb-4 overflow-hidden rounded-xl bg-orange-50 px-4 py-3"
                      >
                        <p className="text-sm text-orange-700">
                          Minimum order value is{" "}
                          <span className="font-bold">₹299</span>.
                        </p>

                        <p className="mt-1 text-xs text-orange-600">
                          Add ₹{remainingForMinimum} more to checkout.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subtotal */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>

                    <motion.span
                      key={subtotal}
                      initial={{
                        scale: 1.15,
                        opacity: 0.5,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl font-black text-[#111111]"
                    >
                      ₹{subtotal}
                    </motion.span>
                  </div>

                  {/* Checkout */}
                  <Button
                    className="h-12 w-full rounded-xl bg-[#25D366] text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#1ebe5d] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    disabled={subtotal < minimumOrder}
                    onClick={handleWhatsAppCheckout}
                  >
                    Checkout on WhatsApp
                  </Button>

                  <p className="mt-3 text-center text-xs text-gray-400">
                    You'll complete your order through WhatsApp.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
