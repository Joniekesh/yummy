import { SlBadge } from "react-icons/sl";
import { RiPlaneFill } from "react-icons/ri";
import { PiTreeEvergreen } from "react-icons/pi";
import { MdComputer } from "react-icons/md";

const items = [
  {
    id: 1,
    name: "Quality Food",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum exercitationem inventore voluptatum consectetur quidem?",
    icon: SlBadge,
  },
  {
    id: 2,
    name: "Fastest Delivery",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum exercitationem inventore voluptatum consectetur quidem?",
    icon: RiPlaneFill,
  },
  {
    id: 3,
    name: "Fresh Food",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum exercitationem inventore voluptatum consectetur quidem?",
    icon: PiTreeEvergreen,
  },
  {
    id: 4,
    name: "Easy To Order",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum exercitationem inventore voluptatum consectetur quidem?",
    icon: MdComputer,
  },
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 w-full gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-red-300 rounded-md p-4 shadow-md"
        >
          <div className="text-red-500 text-[30px]">{<item.icon />}</div>
          <div className="font-semibold text-lg">{item.name}</div>
          <div className="text-gray-600 text-sm text-center px-2">
            {item.desc}
          </div>
          <div className="text-red-500 hover:underline cursor-pointer">
            Learn More...
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
