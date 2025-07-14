import Hero from "../components/Hero";
import Services from "../components/Services";
import CountDown from "../components/CountDown";
import OurChefs from "../components/OurChefs";
import Features from "../components/Features";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Hero />
      <Services />
      <Features />
      <CountDown />
      <OurChefs />
      <Contact />
    </div>
  );
};

export default Home;
