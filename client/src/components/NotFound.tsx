import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-red-300 flex flex-col gap-10 text-[100px] items-center justify-center">
      <h1>404</h1>
      <Link to="/" className="text-[30px] text-red-500">
        GO HOME
      </Link>
    </div>
  );
};

export default NotFound;
