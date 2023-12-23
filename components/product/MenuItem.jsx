import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import ProductModal from "../ui/ProductModal";
import Title from "../ui/Title";

const MenuItem = ({ product }) => {
  const [isProductModal, setIsProductModal] = useState(false);

  return (
    <div className="container mx-auto p-6 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex flex-col">
      <div className="h-[200px] overflow-hidden rounded-2xl">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full hover:scale-110 transition-all">
            {product.product_image ? 
              <Image
                src={product.product_image}
                alt=""
                layout="fill"
                className="w-full object-cover"
              />:
              <div className="animate-pulse h-full w-full">
                <div className="h-full w-full bg-slate-200"></div>
              </div>
            }
          </div>
        </Link>
      </div>
        <div className="mb-auto">
          <div className="flex items-center justify-between mt-5 mb-2">
            <Title addClass="text-xl font-semibold leading-none">{product.product_name}</Title>
            <p className="text-2xl text-red-500 font-bold text-gray-500">${product.selling_price}</p>
          </div>
          <h1 className="text-md font-semibold text-gray-500">{product.description}</h1>
        </div>
          <button className="text-white text-sm font-semibold bg-red-500 mt-4 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 flex items-center w-fit"
            onClick={() => setIsProductModal(true)}>
              <h6 className="mr-2">Add TO CART</h6><RiShoppingCart2Fill />
          </button>

      { isProductModal && <ProductModal setIsProductModal={setIsProductModal} productId={product.id} /> }
    </div>
  );
};

export default MenuItem;
