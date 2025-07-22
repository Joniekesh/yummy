import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-[#D99703] flex flex-col gap-10 text-[100px] items-center justify-center">
      <h1 className='text-[200px]'>404</h1>
      <span className='text-[40px] text-center'>Oops! Page Not Found!</span>

      <Link to="/" className="text-[30px] text-red-500">
        GO HOME
      </Link>
    </div>
  );
};

export default NotFound;
