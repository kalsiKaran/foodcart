import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import MenuItem from "../product/MenuItem";
import { BiBookHeart } from "react-icons/bi";
import Link from "next/link";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 30000,
};


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
        <div className="flex items-center px-3 -mr-6 -ml-3 pb-10 mt-5 snap-x overflow-x-auto scrollbar-hidden">
          {filterList.map((item, _idx) => (
            <div key={_idx} className="mr-3 min-w-[250px] sm:min-w-[300px] snap-center">
              <MenuItem product={item} />
            </div>
          ))}
        </div>:
        <div className="flex flex-col items-center pt-10">
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
