import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import LinkItem from "./LinkItem";
import type { INavLink } from "../interfaces";
import { links } from "../mockData";
import { FaCartPlus } from "react-icons/fa";
import Menu from "./Menu";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Cart from "./Cart";
import { logout } from "../redux/actions/authActiontem";
import Logo from "./Logo";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { quantity } = useAppSelector((state) => state.cart);

  const auth = useAppSelector((state) => state.auth);
  const user = auth?.user;

  const dispatch = useAppDispatch();

  return (
    <div className="w-full h-[70px] px-4 md:px-10 flex items-center justify-between text-[18px] fixed top-0 left-0 z-[9999999] bg-[#161618] text-white">
      {open && <Menu setOpen={setOpen} setOpenCart={setOpenCart} />}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      <Logo />
      <div className="hidden md:flex items-center gap-10 text-lg cursor-pointer">
        {links.map((link: INavLink) => (
          <LinkItem key={link.id} link={link} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => setOpenCart((prev) => !prev)}
          className="relative  cursor-pointer"
        >
          <FaCartPlus className="mx-5" />
          <span className="absolute top-[-10px] right-[12px] flex items-center justify-center h-[16px] w-[16px] rounded-full bg-[#D99703] text-[12px] text-black">
            {quantity}
          </span>
        </div>
        <div className="hidden md:flex">
          {user ? (
            <div className="flex items-center justify-center gap-[10px]">
              <Link to={`/${user.role}`} className="">
                <img
                  className="w-[36px] h-[36px] rounded-full object-cover"
                  src="/avatar.jpg"
                  alt=""
                />
              </Link>

              <div
                onClick={() => dispatch(logout())}
                className="cursor-pointer"
              >
                Logout
              </div>
            </div>
          ) : (
            <Link to="/auth" className="hover:text-[#F8BA05]">
              Sign In
            </Link>
          )}
        </div>

        <div
          className="flex items-center md:hidden cursor-pointer text-[30px] z-[9999999]"
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
