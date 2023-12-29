import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import ProductModal from "../ui/ProductModal";
import Title from "../ui/Title";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { handleFavourite } from "../../redux/favouriteSlice";

const MenuItem = ({ product }) => {
  const dispatch = useDispatch();
  
  const [isProductModal, setIsProductModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const favouriteList = useSelector((state) => state.favourites.favouriteList);

  useEffect(() => {
    setIsFavourite(favouriteList.some((item) => item === product.id))
  }, [favouriteList, product]);

  const setFavourite = (_id) => {
    dispatch(handleFavourite(_id));
  };
  return (
    <div className="container relative min-w-[172px] mx-auto bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl transition duration-300 flex flex-col group">
      <div className="h-32 sm:h-36 md:h-48 overflow-hidden rounded-t-2xl">
        <div className="relative w-full h-full overflow-hidden">
          {product.product_image ? 
            <Image
              src={product.product_image}
              alt={product.product_name}
              layout="fill"
              loading="eager"
              className="w-full object-cover group-hover:scale-105 transition-all duration-[3000ms]"
            />:
            <div className="animate-pulse h-full w-full">
              <div className="h-full w-full bg-slate-200"></div>
            </div>
          }
          
          <p className="text-sm font-semibold px-3 py-1 rounded-lg bg-amber-400/70 backdrop-blur-lg absolute right-2 bottom-2">${product.selling_price}</p>
        </div>
      </div>
        <div className="mb-auto px-3">
          <div className="flex items-center justify-between mt-2 sm:mt-3 mb-2">
            <Link href={`/product/${product.id}`}>
              <span className="w-full">
                <Title addClass="text-lg sm:text-xl font-semibold leading-none truncate">{product.product_name}</Title>
              </span>
            </Link>
          </div>
          <h1 className="text-md font-semibold text-gray-500">{product.description}</h1>
        </div>
        <div className="p-3 flex items-center justify-between">
          <button className="text-white text-xs sm:text-sm sm:font-semibold bg-red-500 py-2 px-4 rounded-lg shadow-md hover:scale-95 transition duration-500 flex items-center w-fit"
            onClick={() => setIsProductModal(true)}>
              <RiShoppingCart2Fill /><h6 className="ml-2">Add item</h6>
          </button>
          
          <div className="grid place-items-center text-2xl bg-red-50 cursor-pointer text-white rounded-full h-10 w-10 text-red-500 outline outline-transparent hover:outline-red-500/50 transition-all duration-300 animation" onClick={() => setFavourite(product.id)}>
            {isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>

        </div>

      { isProductModal && <ProductModal setIsProductModal={setIsProductModal} productId={product.id} /> }
    </div>
  );
};

export default MenuItem;
