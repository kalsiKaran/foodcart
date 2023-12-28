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
    <div className="container mx-auto p-3 md:p-6 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl transition duration-300 flex flex-col group">
      <div className="h-[200px] overflow-hidden rounded-2xl">
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

          <div className="absolute z-10 right-2 top-2" onClick={() => setFavourite(product.id)}>
            <span className="grid place-items-center text-2xl backdrop-blur-md cursor-pointer text-white rounded-full h-10 w-10 text-red-500 outline outline-transparent hover:outline-red-500/50 transition-all duration-300 animation">
              {isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}
            </span>
          </div>
        </div>
      </div>
        <div className="mb-auto">
          <div className="flex items-center justify-between mt-5 mb-2">
            <Link href={`/product/${product.id}`}>
              <span>
                <Title addClass="text-xl font-semibold leading-none">{product.product_name}</Title>
              </span>
            </Link>
            <p className="text-2xl text-red-500 font-bold text-gray-500">${product.selling_price}</p>
          </div>
          <h1 className="text-md font-semibold text-gray-500">{product.description}</h1>
        </div>
          <button className="text-white text-sm font-semibold bg-red-500 mt-4 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-105 flex items-center w-fit"
            onClick={() => setIsProductModal(true)}>
              <h6 className="mr-2">Add TO CART</h6><RiShoppingCart2Fill />
          </button>

      { isProductModal && <ProductModal setIsProductModal={setIsProductModal} productId={product.id} /> }
    </div>
  );
};

export default MenuItem;
