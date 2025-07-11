import type { IconType } from "react-icons";

export interface INavLink {
  id: number;
  name: string;
  url: string;
}

export interface IAdminLink {
  id: number;
  name: string;
  url: string;
  icon: IconType;
}

export interface ICard {
  name: string;
  url: string;
  count: number;
  icon: IconType;
  currency?: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  desc?: string;
  slug: string;
  thumbnail: string;
  createdAt?: string;
  updatedAt?: string;
  user?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  desc: string;
  image: string;
  category: string;
  price: number;
  createdAt?: string;
}

export interface ICartProduct {
  _id: string;
  name: string;
  desc: string;
  image: string;
  price: number;
  qty: number;
}
