import Image from "next/image";
import { useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Index = ({ food }) => {
  const [prices, setPrices] = useState(food.prices);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);
  const cart = useSelector((state) => state.cart);

  const findCart = cart.products.find((item) => item._id === food._id);

  const dispatch = useDispatch();

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({
        ...food,
        foodQuantity: 1,
        title: food.title,
        img: food.img,
        extras,
        price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap bg-amber-50">
      <div class="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div class="md:flex items-center -mx-10">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div class="relative min-h-[300px]">
                    <Image
                      src={food?.img}
                      alt={food?.img}
                      layout="fill"
                      className="w-full relative z-10 object-cover rounded-md"
                      priority
                    />
                </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
                <div class="mb-10">
                    <h1 class="font-bold uppercase text-2xl mb-4">{food.title}</h1>
                    <p class="text-sm font-semibold">{food.desc}</p>
                </div>

                <div className="flex gap-x-4 my-6 md:justify-start justify-center">
                  {extraItems.map((item) => (
                    <label className="flex items-center gap-x-1" key={item._id}>
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        onChange={(e) => handleChange(e, item)}
                      />
                      <span className="text-sm font-semibold capitalize">{item.text}</span>
                    </label>
                  ))}
                </div>

                {food.category === "pizza" && (
                  <div>
                    <h4 className="text-xl font-bold">Choose the size</h4>
                    <div className="flex items-center gap-x-20 md:justify-start justify-center min-h-[100px]">
                      <div
                        className={`relative w-8 h-8 cursor-pointer hover:h-10 hover:w-10 transition-all ${
                          size === 0 && "border-4 border-primary rounded-full w-10 h-10"
                        }`}
                        onClick={() => handleSize(0)}
                      >
                        <Image src="/images/size.png" alt="" layout="fill" />
                        <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                          Small
                        </span>
                      </div>
                      <div
                        className={`relative w-12 h-12 cursor-pointer hover:h-14 hover:w-14 transition-all ${
                          size === 1 && "border-4 border-primary rounded-full w-16 h-16"
                        }`}
                        onClick={() => handleSize(1)}
                      >
                        <Image src="/images/size.png" alt="" layout="fill" />
                        <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                          Medium
                        </span>
                      </div>
                      <div
                        className={`relative w-16 h-16 cursor-pointer hover:h-20 hover:w-20 transition-all ${
                          size === 2 && "border-4 border-primary rounded-full w-20 h-20"
                        } `}
                        onClick={() => handleSize(2)}
                      >
                        <Image src="/images/size.png" alt="" layout="fill" />
                        <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                          Large
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                    <div class="inline-block align-bottom mr-5">
                        <span class="text-2xl leading-none align-baseline">$</span>
                        <span class="font-bold text-5xl leading-none align-baseline">{price}</span>
                    </div>
                    <div class="inline-block align-bottom">
                        <button class="text-white text-sm font-semibold disabled:opacity-75 bg-amber-400 py-3 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu disabled:hover:scale-100 hover:scale-110 flex items-center" onClick={handleClick} disabled={findCart}><RiShoppingCart2Fill className="mr-2 text-xl" /> ADD TO CART</button>
                    </div>
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
      food: res.data ? res.data : null,
    },
  };
};

export default Index;
