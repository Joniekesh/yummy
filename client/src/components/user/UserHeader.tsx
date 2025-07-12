import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const UserHeader = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex sticky left-0 top-0 p-4 bg-red-500 text-white z-[99999]">
      <div className="flex items-center justify-between w-full">
        <Link to="/">Home</Link>
        <div>Welcome, {user?.fullName}</div>
      </div>
    </div>
  );
};

export default UserHeader;
