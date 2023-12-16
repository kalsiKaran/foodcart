import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import Link from "next/link";
import { addProduct } from "../../redux/cartSlice";

const ProductModal = ({ setIsProductModal, product }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const findCart = cart.products.find((item) => item._id === product._id);


  const [foodQuantity, setFoodQuantity] = useState(1);
  const [TotalPrice, setTotalPrice] = useState(product.prices[0]);
  const [Price, setPrice] = useState(product.prices[0]);
  const [extras, setExtras] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const quantityChange = (type, price) => {
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
    setTotalPrice((TotalPrice + number * foodQuantity))
    setPrice(Price + number);
  };

  const handleExtras = (e, item) => {
    setIsChecked(!isChecked)
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const addToCart = () => {
    dispatch(
      addProduct({
        ...product,
        extras,
        price: Price,
        totalPrice: TotalPrice,
        quantity: 1,
        foodQuantity,
      })
    );
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-black after:absolute after:top-0 after:left-0 after:opacity-30 backdrop-blur grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10  z-50 md:w-full w-[370px] bg-white p-10 rounded-2xl">
          
            <div className="relative w-full md:h-full h-56 w-full md:w-64 rounded-xl overflow-hidden">
              <Image
                src={product.img}
                alt=""
                layout="fill"
                className="w-full object-cover"
              />
            </div>

            <div>
              <Link href={`/product/${product._id}`}>
                <Title addClass="text-[32px] cursor-pointer hover:text-amber-500 transition-all duration-500">{product.title}</Title>
              </Link>
              <p className="font-bold text-red-500 text-xl">${Price}</p>

              <p className="font-bold text-md mt-3">Extras</p>
              {product.extraOptions.map((item) => (
                <label className={`${isChecked ? 'bg-red-400' : 'bg-red-50'} cursor-pointer rounded-md px-2 shadow-sm inline-flex py-1 transition-all duration-300`} key={item._id}>
                  <input
                    type="checkbox"
                    className="hidden"
                    onChange={(e) => handleExtras(e, item)}
                  />
                  <span className={`text-xs uppercase font-semibold ${isChecked ? 'text-white' : 'text-red-500 transition-all duration-300'}`}>{item.text}</span>
                </label>
              ))}

              <div>
                <p className="font-bold text-md mt-3">Select Quantity</p>
                <div className="flex items-center rounded-lg">
                  <button className="text-white text-sm font-semibold bg-red-400 py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(0, product)} disabled={foodQuantity == 1}><i className="fa-solid fa-minus"></i></button>
                    <h6 className="font-bold mx-3">{foodQuantity}</h6>
                  <button className="text-white text-sm font-semibold bg-green-400 py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(1, product)}><i className="fa-solid fa-plus"></i></button>
                    <h6 className="font-bold mx-3 text-xl">${TotalPrice}</h6>

                </div>

                  <button className="mt-8 text-white text-sm font-semibold bg-amber-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 disabled:hover:scale-100 disabled:opacity-60 disabled:shadow-none" disabled={findCart} onClick={addToCart}>ADD TO CART</button>
              </div>

            </div>

            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className="hover:scale-110 transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default ProductModal;
