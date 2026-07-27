import { MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-14 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black">
              चित्रSTICKS
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Premium waterproof vinyl stickers designed for laptops,
              bikes, helmets, bottles and everything you love.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 font-bold">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Single Stickers</li>
              <li>Sticker Sheets</li>
              <li>Custom Stickers</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 font-bold">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Shipping</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 font-bold">
              Connect
            </h3>

            <div className="space-y-4">

              <a
                href="https://www.instagram.com/chitrsticks_stickerz/"
                target="_blank"
                className="flex items-center gap-3 text-gray-400 hover:text-white"
              >
                <span>📷</span>
                Instagram
              </a>

              <a
                href="https://wa.me/91 91371 09849"
                className="flex items-center gap-3 text-gray-400 hover:text-white"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                Contact Us
              </div>

            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © 2026 चित्रSTICKS. All rights reserved.
        </div>

      </div>
    </footer>
  );
}