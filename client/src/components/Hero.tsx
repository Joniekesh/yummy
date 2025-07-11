import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex px-4 sm:px-10 justify-center flex-col sm:flex-row gap-10">
      <div className="w-full sm:w-1/2 flex flex-col font-bold gap-5 sm:gap-10">
        <div>
          <span className="text-[26px]">Get Your</span>
          <h1 className="text-red-500 text-[36px]">Desired Food</h1>
          <span className="text-[26px]">In 30 Minutes</span>
        </div>
        <p className="font-medium text-base ">
          A meal at jonie restaurant is the one you wont soon forget and value
          you wont believe.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/foods"
            className="px-1 py-2 text-sm rounded-[5px] bg-red-500 text-white font-[400] ring-1 cursor-pointer"
          >
            Order Now
          </Link>
          <div className="px-1 py-2 text-sm rounded-[5px] bg-red-500 text-white font-[400] ring-1 cursor-pointer">
            Learn More
          </div>
        </div>
      </div>
      <div className="w-full lg:-mt-10 -mt-10 sm:mt-0 sm:w-1/2 flex items-center justify-center">
        <img
          src="/pizza-hero.png"
          alt=""
          className="flex items-center justify-center object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
