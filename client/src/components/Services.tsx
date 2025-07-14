import { SlBadge } from "react-icons/sl";
import { RiPlaneFill } from "react-icons/ri";
import { PiTreeEvergreen } from "react-icons/pi";
import { MdComputer } from "react-icons/md";

const items = [
  {
    id: 1,
    name: "Quality Food",
    icon: SlBadge,
  },
  {
    id: 2,
    name: "Fastest Delivery",
    icon: RiPlaneFill,
  },
  {
    id: 3,
    name: "Fresh Food",
    icon: PiTreeEvergreen,
  },
  {
    id: 4,
    name: "Easy To Order",
    icon: MdComputer,
  },
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-10 w-full gap-2 -mt-10 z-999">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-red-200 rounded-md px-4 py-3 shadow-md"
        >
          <div className="bg-[#D99703] text-[30px] rounded-full flex items-center justify-center p-1">
            {<item.icon />}
          </div>
          <div className="font-semibold text-lg">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Services;
