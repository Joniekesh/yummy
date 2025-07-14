import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="text-white flex items-center justify-center cursor-pointer flex-row gap-2"
    >
      <img
        className="max-w-[30px] max-h-[40px] object-cover rounded-full"
        src="/plane.png"
        alt=""
      />
      <span className="text-lg font-semibold">Yummy</span>
    </div>
  );
};

export default Logo;
