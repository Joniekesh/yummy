import Hero from "../components/Hero";
import Services from "../components/Services";
import CountDown from "../components/CountDown";

const Home = () => {
  return (
    <div className="flex flex-col mt-25 gap-5">
      <Hero />
      <Services />
      <CountDown />
    </div>
  );
};

export default Home;
