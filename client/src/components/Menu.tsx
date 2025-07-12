import { links } from "../mockData";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/actions/authActiontem";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ setOpen, setOpenCart }: Props) => {
  const dispatch = useAppDispatch();

  const { quantity } = useAppSelector((state) => state.cart);

  const auth = useAppSelector((state) => state.auth);
  const user = auth?.user;

  return (
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-999999 w-full h-full">
      <div className="sm:hidden  fixed top-0 right-0 w-[70vw] flex flex-col gap-5 items-center justify-center bg-red-500 h-[100vh] text-white">
        {links.map((link) => (
          <Link
            key={link.id}
            onClick={() => setOpen((prev) => !prev)}
            to={link.url}
            className="cursor-pointer px-2 py-1 rounded-[5px] w-[200px] text-center transform transition duration-500 ease-in-out hover:bg-red-400 hover:scale-[1.01]"
          >
            {link.name}
          </Link>
        ))}

        <div
          onClick={() => {
            setOpenCart((prev) => !prev);
            setOpen(false);
          }}
          className="relative flex items-center justify-center
           ring-white rounded-[5px] px-2 py-1 w-[max-content] h-[40px] text-center cursor-pointer transform transition duration-200 ease-in-out bg-red-400  hover:scale-[1.01]"
        >
          <FaCartPlus className="mx-5" />
          <span className="absolute bg-red-600 h-[16px] w-[16px] rounded-full text-white top-[5px] right-[20px] flex items-center justify-center text-center text-[12px]">
            {quantity}
          </span>
        </div>

        {user ? (
          <div className="flex flex-col gap-[10px]">
            <Link
              to={`/${user.role}`}
              className="ring ring-white rounded-[5px] px-2 py-1 w-[200px] text-center cursor-pointer transform transition duration-200 ease-in-out hover:bg-red-400  hover:scale-[1.01]"
            >
              Dashboard
            </Link>

            <div
              className="ring ring-white rounded-[5px] px-2 py-1 w-[200px] text-center cursor-pointer transform transition duration-200 ease-in-out hover:bg-red-400  hover:scale-[1.01]"
              onClick={() => dispatch(logout())}
            >
              Logout
            </div>
          </div>
        ) : (
          <Link
            to="/auth"
            className="ring ring-white rounded-[5px] px-2 py-1 w-[200px] text-center cursor-pointer transform transition duration-200 ease-in-out hover:bg-red-400  hover:scale-[1.01]"
          >
            sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
