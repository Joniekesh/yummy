import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import React from "react";

interface Props {
  name: string;
  url: string;
  sales: number;
  icon: IconType;
  currency?: boolean;
}

const Card = ({ name, url, sales, icon, currency }: Props) => {
  return (
    <Link
      to={url}
      className="ring group ring-red-400 rounded-lg p-2 h-[100px] flex flex-col justify-between hover:bg-red-500 hover:text-white"
    >
      <div className="flex items-center justify-between">
        <div className="text-[30px] text-red-500 font-bold group-hover:text-white">
          {React.createElement(icon)}
        </div>
        <div className="text-[20px]">{name}</div>
      </div>
      <div className="flex self-end text-[30px] font-[600]">
        {currency ? "$" + sales?.toFixed(2) : sales}
      </div>
    </Link>
  );
};

export default Card;
