import Image from "next/image";
import { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Title from "../../components/ui/Title";

const Index = ({ food, Variants }) => {
  const [Price, setPrice] = useState(food.selling_price);
  const [variant, setVariant] = useState({});
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [ TotalPrice, setTotalPrice ] = useState(food.selling_price)

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const selectedVariant = Variants.find((item) => item.variant_price === TotalPrice);
    setVariant(selectedVariant || "")
  }, [Variants]);

  const findCart = cart.products.find((item) => item.id === food.id);

  const dispatch = useDispatch();

  const quantityChange = (type, priceData) => {
    if (type === 0) {
      setFoodQuantity(foodQuantity -= 1);
      setTotalPrice(TotalPrice -= Price)
    }
    if (type === 1) {
      setFoodQuantity(foodQuantity += 1);
      setTotalPrice(TotalPrice += Price)
    }
  };

  const changePrice = (number) => {
    setTotalPrice(number * foodQuantity)
    setPrice(number);
  };

  const handleVariant = (e, item) => {
    changePrice(item.variant_price);
    setVariant(item);
  };

  const handleClick = () => {
    dispatch(
      addProduct({
        ...food,
        quantity: 1,
        foodQuantity,
        price: Price,
        totalPrice: TotalPrice,
        variant: variant?.variant_name
      })
    );
  };

  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] px-5 py-5 md:py-10 flex-wrap bg-amber-50">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-5 md:p-10 lg:p-10 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative min-h-[200px] md:min-h-[300px]">
                    <Image
                      src={food?.product_image}
                      alt={food?.product_name}
                      layout="fill"
                      className="w-full relative z-10 object-cover rounded-md"
                      priority
                    />
                </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
                <div>
                    <h1 className="font-bold uppercase text-2xl">{food.product_name}</h1>
                    <div className="inline-block align-bottom mr-5">
                      <Title addClass="font-bold text-5xl leading-none align-baseline text-red-400">${Price}</Title>
                    </div>
                </div>

                {Variants.length > 0 && <p className="font-bold text-md mt-4">Select size</p>}
                {Variants?.map((item, _idx) => (
                  <div className="grid grid-cols-2 mt-2" key={_idx}>
                    <label key={_idx} className="inline-flex cursor-pointer items-center rounded-full">
                      <div className="relative inline-flex">
                        <input
                          type="radio"
                          name="variants"
                          defaultChecked={item.variant_price === Price}
                          className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-xl border-2 border-gray-300 transition-all checked:border-red-400 checked:bg-red-400 hover:scale-110" onChange={(e) => handleVariant(e, item)} />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <i className="fas fa-check text-xs"></i>
                        </div>
                      </div>
                      <span className='text-xs uppercase font-bold ml-2'>{item.variant_name}</span>
                    </label>

                    <span className="text-xs font-bold text-gray-400">+{item.variant_price}</span>
                  </div>
                ))}

                  <p className="font-bold text-md mt-4">Select Quantity</p>
                  <div className="flex items-center rounded-lg">
                    <button className="text-white text-sm font-semibold bg-red-400 py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(0, food)} disabled={foodQuantity == 1}><i className="fa-solid fa-minus"></i></button>
                      <h6 className="font-bold mx-3">{foodQuantity}</h6>
                    <button className="text-white text-sm font-semibold bg-green-400 py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(1, food)}><i className="fa-solid fa-plus"></i></button>
                    <h6 className="font-bold mx-3 text-xl">${TotalPrice}</h6>

                  </div>
                <div className="inline-block align-bottom mt-8">

                    <button className="text-white text-sm font-semibold disabled:opacity-75 bg-amber-400 py-3 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu disabled:hover:scale-100 hover:scale-110 flex items-center" onClick={handleClick} disabled={findCart}><RiShoppingCart2Fill className="mr-2 text-xl" /> {!findCart ? "ADD TO CART" : "IN CART"}</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );
  return {
    props: {
      food: res.data.product ? res.data.product : null,
      Variants: res.data.variants ? res.data.variants : null
    },
  };
};

export default Index;
