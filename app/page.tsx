import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StickerSheets from "@/components/home/StickerSheets";
import Categories from "@/components/home/Categories";
import PromotionalSection from "@/components/home/PromotionalSection";
import TrustBadges from "@/components/home/TrustBadges";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Popular Picks */}
      <FeaturedProducts />

      {/* Sticker Sheets */}
      <StickerSheets />

      {/* Collections */}
      <Categories />

      {/* Promotional Section */}
      <PromotionalSection />

      {/* Trust */}
      <TrustBadges />

      <Footer />
    </main>
  );
}
