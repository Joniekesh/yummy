import Countdown from "react-countdown";

const CountDown = () => {
  return (
    <div className="flex-col mt-10 w-full py-4 px-4 md:px-10 bg-black text-white flex sm:flex-row items-center justify-center gap-4">
      <div className="flex flex-col gap-4">
        <div className="text-[30px] font-bold">
          Delicious Burger and French Fry
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
          deleniti nisi adipisci eligendi cupiditate, sint dolorum,
        </p>
        <Countdown
          date={Date.now() + 500000000}
          className="text-orange-400 text-[30px] font-bold"
        />
        <div className="px-4 py-2 text-sm rounded-3xl bg-[#D99703] text-black font-medium hover:bg-white hover:text-[] transition w-[max-content] cursor-pointer">
          Order Now
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img
          src="/burger.png"
          alt=""
          className="w-[100%] h-[100%] object-cover"
        />
      </div>
    </div>
  );
};

export default CountDown;
