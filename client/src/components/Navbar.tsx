import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import LinkItem from "./LinkItem";
import type { INavLink } from "../interfaces";
import { links } from "../mockData";
import { FaCartPlus } from "react-icons/fa";
import Menu from "./Menu";
import makeRequest from "../utils/makeRequest";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Cart from "./Cart";
import getUser from "../utils/getUser";
import { clearCart } from "../redux/reducers/cartReducers";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { quantity } = useAppSelector((state) => state.cart);

  const user = getUser();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      const res = await makeRequest.post("/auth/logout");

      if (res.status === 200) {
        localStorage.setItem("user", "");
        dispatch(clearCart());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-15 px-4 flex items-center justify-between text-[20px] fixed top-0 left-0 z-900 bg-red-300">
      {open && <Menu setOpen={setOpen} setOpenCart={setOpenCart} />}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      <Link
        to="/"
        className="py-1 px-2 font-bold rounded-sm bg-red-500 text-white"
      >
        Yummy
      </Link>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 text-lg cursor-pointer">
          {links.map((link: INavLink) => (
            <LinkItem key={link.id} link={link} />
          ))}
          <div
            onClick={() => setOpenCart((prev) => !prev)}
            className="relative"
          >
            <FaCartPlus className="mx-5" />
            <span className="absolute top-[-10px] right-[12px] flex items-center justify-center h-[16px] w-[16px] rounded-full bg-red-500 text-[12px] text-white">
              {quantity}
            </span>
          </div>
          {user ? (
            <div className="flex items-center justify-center gap-[10px]">
              <Link
                to={`/${user.role}`}
                className="py-1 px-2 rounded-sm bg-red-500 text-white"
              >
                Dashboard
              </Link>

              <div
                onClick={logout}
                className="py-1 px-2 rounded-sm bg-red-500 text-white"
              >
                Logout
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              className="py-1 px-2 rounded-sm bg-red-500 text-white"
            >
              Sign In
            </Link>
          )}
        </div>
        <div
          className="flex items-center sm:hidden cursor-pointer text-[30px] z-[9999999]"
          onClick={() => {
            setOpen((prev) => !prev);
            setOpenCart(false);
          }}
        >
          {open ? <IoMdClose className="text-white" /> : <FaHamburger />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
