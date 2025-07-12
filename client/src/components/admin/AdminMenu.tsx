import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenulinks } from "../../mockData";
import type { INavLink } from "../../interfaces";
import { logout } from "../../redux/actions/authaction";
import { useAppDispatch } from "../../redux/hooks";

const AdminMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleNavigate = (link: INavLink) => {
    if (link.name === "Logout") {
      dispatch(logout());
    } else {
      navigate(link.url);
    }
  };

  return (
    <div
      // style={{ width: "30px" }}
      className="flex-0.5 h-screen overflow-y-auto bg-red-500 text-white p-4"
    >
      <div className="sticky top-0">
        <Link to="/">Home</Link>
        <div className="mt-[20px] flex flex-col gap-5">
          {adminMenulinks.map((link) => {
            const isActive = location.pathname === link.url;
            return (
              <div onClick={() => handleNavigate(link)} key={link.name}>
                <div
                  className={`flex items-center gap-[10px] rounded-[5px] p-3 text-[16px] cursor-pointer transform transition duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-red-400 ring"
                      : "hover:bg-red-400 hover:scale-[1.01]"
                  }`}
                >
                  <div className="">{<link.icon />}</div>
                  <div className="hidden lg:flex">{link.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
