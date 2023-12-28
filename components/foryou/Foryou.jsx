import Title from "../ui/Title";
import { RiMedal2Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Favourites from "./Favourites";

const TABS = [
    {
        title: "Recommended",
        icon: <RiMedal2Line size={20} className="mr-1" />
    },
    {
        title: "Favourites",
        icon: <AiOutlineHeart size={20} className="mr-1" />
    },
]

const Foryou = ({productList}) => {
    const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="bg-slate-100 py-6">
        <div className="container mx-auto my-5 relative p-5 rounded-lg z-10">
            <Title addClass="text-2xl md:text-4xl uppercase mb-5 md:mb-10 text-center">For You</Title>

            <div className="grid grid-cols-2 w-80 mx-auto bg-slate-200 border-gray-300 rounded-lg overflow-hidden p-2">
                {TABS.map((item, _idx) => (
                    <button key={_idx} className={`${activeTab === _idx && 'bg-white text-red-500 shadow-md'} flex items-center justify-center text-sm font-semibold opacity-75 p-2 rounded-md transition-all duration-300`} onClick={() => setActiveTab(_idx)}>{item.icon}{item.title}</button>
                ))}
            </div>

            {activeTab === 1 && <Favourites productList={productList} />}
        </div>
    </div>
  );
};

export default Foryou;
