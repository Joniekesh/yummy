import { Link, useLocation } from "react-router-dom";
import type { INavLink } from "../interfaces";

interface Props {
  link: INavLink;
}

const Linkitem = ({ link }: Props) => {
  const location = useLocation();
  const active = location.pathname;

  return (
    <Link
      to={link.url}
      className={`${link.url === active ? "text-red-500" : ""}`}
    >
      {link.name}
    </Link>
  );
};

export default Linkitem;
