import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-center min-h-[90vh] w-screen relative">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start px-4 md:px-8">
        <div className="text-white max-w-[500px] space-y-4">
          <div>
            <span className="text-[26px] block">Get Your</span>
            <h1 className="text-[36px] font-bold text-[#D99703]">
              Desired Food
            </h1>
            <span className="text-[26px] block">In 30 Minutes</span>
          </div>
          <p className="font-small text-base">
            A meal at Yummy Restaurant is the one you won’t soon forget and
            value you won’t believe.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/foods"
              className="px-4 py-2 text-sm rounded-3xl bg-[#D99703] text-black font-medium hover:bg-white hover:text-[] transition"
            >
              Order Now
            </Link>
            <div className="px-4 py-2 text-sm rounded-3xl bg-[#D99703] text-black font-medium hover:bg-white hover:text-[#D99703] cursor-pointer transition">
              Learn More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
