import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesPreview from "@/components/home/FeaturesPreview";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
