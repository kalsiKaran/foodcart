import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const MenuItem = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const findCart = cart.products.find((item) => item._id === product._id);

  const addToCart = () => {
    dispatch(
      addProduct({
        ...product,
        extras: [],
        price: product.prices[0],
        quantity: 1,
        foodQuantity: 1,
      })
    );
  };

  return (
    <div className="container mx-auto p-6 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex flex-col">
      <div className="h-[200px] overflow-hidden rounded-2xl">
        <Link href={`/product/${product._id}`}>
          <div className="relative w-full h-full hover:scale-110 transition-all">
            <Image
              src={product.img}
              alt=""
              layout="fill"
              className="w-full object-cover"
            />
          </div>
        </Link>
      </div>
        <div className="mb-auto">
          <div className="flex items-center justify-between mt-5">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="font-bold text-gray-500">${product.prices[0]}</p>
          </div>
          <h1 className="text-md font-bold text-gray-500">{product.desc}</h1>
        </div>
          <button className="text-white text-sm font-semibold disabled:opacity-75 bg-red-400 mt-4 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu disabled:hover:scale-100 hover:scale-110 flex items-center w-fit"
            disabled={findCart} onClick={addToCart}>
              <h6 className="mr-2">Add TO CART</h6><RiShoppingCart2Fill />
          </button>
    </div>
  );
};

export default MenuItem;
