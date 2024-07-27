import MainLayout from "../layouts/MainLayout";
import About from "./About";
import HeroSection from "./HeroSection";

const LandingPage = () => {
  return (
    <div>
      <MainLayout>
        <HeroSection />
        <About/>
      </MainLayout>
    </div>
  );
};

export default LandingPage;
