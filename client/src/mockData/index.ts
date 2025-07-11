import type {
  INavLink,
  ICategory,
  IProduct,
  IAdminLink,
  ICard,
} from "../interfaces";
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

export const categories: ICategory[] = [
  {
    _id: "1",
    name: "Juicy Burgers",
    slug: "burger",
    thumbnail: "/burger10.jpg",
    desc: "yummy burger",
  },
  {
    _id: "2",
    name: "Yummy Sandwiches",
    slug: "sandwich",
    thumbnail: "/sw1.jpg",
    desc: "yummy sandwich",
  },
  {
    _id: "3",
    name: "Cheezy Pizzas",
    slug: "pizza",
    thumbnail: "/pizza3.jpg",
    desc: "yummy pizza",
  },
  {
    _id: "4",
    name: "Crunchy French Fries",
    slug: "frenchfry",
    thumbnail: "/ff1.jpg",
    desc: "yummy french fry",
  },
];

export const products: IProduct[] = [
  {
    _id: "1",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger10.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "2",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger2.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "3",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger3.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "4",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger4.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "5",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger5.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "6",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger6.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "7",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger7.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "8",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger8.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "9",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger9.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "10",
    name: "Juicy Burgers",
    desc: "yummy burger",
    image: "/burger1.jpg",
    category: "burger",
    price: 15,
  },
  {
    _id: "11",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw1.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "12",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw2.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "13",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw3.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "14",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw4.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "15",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw5.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "16",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw6.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "17",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw7.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "18",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw8.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "19",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw9.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "20",
    name: "Yummy Sandwiche",
    desc: "yummy sandwich",
    image: "/sw10.jpg",
    category: "sandwich",
    price: 15,
  },
  {
    _id: "21",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza1.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "22",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza2.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "23",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza3.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "24",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza4.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "25",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza5.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "26",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza6.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "27",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza7.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "28",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza8.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "29",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza9.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "30",
    name: "Cheezy Pizzas",
    desc: "cheezy pizza",
    image: "/pizza10.jpg",
    category: "pizza",
    price: 15,
  },
  {
    _id: "31",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff1.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "32",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff2.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "33",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff3.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "34",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff4.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "35",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff5.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "36",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff6.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "37",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff7.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "38",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff8.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "39",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff9.jpg",
    category: "frenchfry",
    price: 15,
  },
  {
    _id: "40",
    name: "Crunchy French Fries",
    desc: "Crunchy French Fries",
    image: "/ff1.jpg",
    category: "frenchfry",
    price: 15,
  },
];
