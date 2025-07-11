import Countdown from "react-countdown";

const CountDown = () => {
  return (
    <div className="flex-col w-full py-4 px-4 sm:px-10 bg-black text-white flex sm:flex-row items-center justify-center gap-4">
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
        <div className="flex self-start bg-red-500 text-white p-[5px] cursor-pointer rouded-md text-base">
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
