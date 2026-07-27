import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StickerSheets from "@/components/home/StickerSheets";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <StickerSheets />
      <Footer />
    </main>
  );
}