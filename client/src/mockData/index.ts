import type { INavLink, IAdminLink, ICard } from "../interfaces";
import { MdDashboard, MdCategory } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { FaUsers, FaCartPlus } from "react-icons/fa";
import { LuPizza, LuLogOut } from "react-icons/lu";
import { CgDollar } from "react-icons/cg";

export const links: INavLink[] = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "Foods",
    url: "/foods",
  },
  {
    id: 3,
    name: "Contact",
    url: "/contact",
  },
  {
    id: 4,
    name: "About",
    url: "/about",
  },
];

export const adminMenulinks: IAdminLink[] = [
  {
    id: 1,
    name: "Dashboard",
    url: "/admin",
    icon: MdDashboard,
  },
  {
    id: 2,
    name: "Analytics",
    url: "/admin/analytics",
    icon: SiSimpleanalytics,
  },
  {
    id: 3,
    name: "Categories",
    url: "/admin/categories",
    icon: MdCategory,
  },
  {
    id: 4,
    name: "Users",
    url: "/admin/users",
    icon: FaUsers,
  },
  {
    id: 5,
    name: "Products",
    url: "/admin/products",
    icon: LuPizza,
  },
  {
    id: 6,
    name: "Orders",
    url: "/admin/orders",
    icon: FaCartPlus,
  },
  {
    id: 7,
    name: "Logout",
    url: "#",
    icon: LuLogOut,
  },
];

export const adminCards: ICard[] = [
  {
    name: "Sales",
    url: "#",
    count: 129000,
    icon: CgDollar,
    currency: true,
  },
  {
    name: "Orders",
    url: "/admin/orders",
    count: 999,
    icon: FaCartPlus,
  },
  {
    name: "Users",
    url: "/admin/users",
    count: 599,
    icon: FaUsers,
  },
  {
    name: "Products",
    url: "/admin/products",
    count: 890,
    icon: LuPizza,
  },
];
