import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuItem from "../product/MenuItem";
import { BiBookHeart } from "react-icons/bi";
import Link from "next/link";

const Favourites = ({productList}) => {
  const [filterList, setFilterList] = useState([]);
  const favouriteList = useSelector((state) => state.favourites.favouriteList);

  useEffect(() => {
    setFilterList(
      productList?.filter((product) => favouriteList.includes(product.id))
    );
  }, [favouriteList, productList]);

  return (
    <div>
      {filterList.length > 0 ?
        <div className="flex items-center px-3 -mr-6 -ml-3 pb-10 mt-10 snap-x overflow-x-auto scrollbar-hidden">
          {filterList.map((item, _idx) => (
            <div key={_idx} className="mr-3 min-w-[220px] sm:min-w-[280px] snap-center group-sm-card">
              <MenuItem product={item} />
            </div>
          ))}
        </div>:
        <div className="flex flex-col items-center py-10">
          <BiBookHeart className="text-6xl text-gray-400 -rotate-12" />
          <span className="text-center my-4 text-gray-400 text-sm sm:text-lg">Seems like there&apos;s nothing in your favorites yet. <br /> Let&apos;s change that!</span>
          <Link href="/menu">
              <button className="py-2 px-4 bg-amber-300 rounded-md text-sm font-semibold hover:scale-95 transition duration-400">Explore Menu</button>
          </Link>
        </div>
      }
    </div>
  );
};

export default Favourites;
