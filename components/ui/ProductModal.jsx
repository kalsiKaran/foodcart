import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import Link from "next/link";
import { addProduct } from "../../redux/cartSlice";
import { useEffect } from "react";
import axios from "axios";

import Skeleton from "react-loading-skeleton";

const ProductModal = ({ setIsProductModal, productId}) => {

  const [Product, setProduct] = useState([]);
  const [Variants, setVariants] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [TotalPrice, setTotalPrice] = useState(0);
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
        const product = response.data.product;
        
        setTotalPrice(product.selling_price)
        setPrice(product.selling_price)
        
        setProduct(product);
        setVariants(response.data.variants);
        setLoading(false);
        
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };

    fetchProductDetails();
  }, [productId]);


  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const findCart = cart.products.find((item) => item.id === Product.id);

  const [foodQuantity, setFoodQuantity] = useState(1);
  const [variant, setVariant] = useState([]);
  
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
    setTotalPrice(number * foodQuantity)
    setPrice(number);
  };

  const handleVariant = (e, item) => {
    changePrice(item.variant_price);
    setVariant([...variant, item]);
  };

  const addToCart = () => {
    console.log(Product)
    dispatch(
      addProduct({
        ...Product,
        variant,
        price: Price,
        totalPrice: TotalPrice,
        quantity: 1,
        foodQuantity,
      })
    );
    setIsProductModal(false);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-black after:absolute after:top-0 after:left-0 after:opacity-30 backdrop-blur grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10  z-50 md:w-full w-[370px] bg-white p-10 rounded-2xl">
          
            <div className="relative w-full md:h-full h-56 w-full md:w-80 rounded-xl overflow-hidden">
              {Product.product_image && !Loading ? 
                <Image
                  src={Product.product_image}
                  alt=""
                  layout="fill"
                  className="w-full object-cover"
                />:
                <Skeleton style={{ width: '100%', height: '100%' }} />
              }
            </div>

            <div>
              {Loading ?
              <> 
                <Skeleton width={150} height={40} />
                <Skeleton width={50} height={30} />
              </>:
              <>
                <Link href={`/product/${Product.id}`}>
                  <Title addClass="inline-block text-[32px] cursor-pointer hover:text-amber-500 transition-all duration-500">{Product.product_name}</Title>
                </Link>
                <p className="font-bold text-red-500 text-xl">${Price}</p>
              </>
              }

              { Variants.length > 0 && <p className="font-bold text-md mt-3">Select size</p> }
              {Variants?.map((item, _idx) => (
                <div className="grid grid-cols-2 mt-2">
                  <label key={_idx} className="inline-flex cursor-pointer items-center rounded-full">
                    <div className="relative inline-flex">
                      <input
                        type="radio"
                        name="variants"
                        defaultChecked={_idx === 0}
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
              
              {Loading ?
              <div className="mt-3">
                <Skeleton height={25} width={100} />
                <div className="mt-1 flex">
                  <Skeleton height={25} width={30} />
                  <Skeleton height={25} width={10} style={{margin: "0 10px"}} />
                  <Skeleton height={25} width={30} style={{marginRight: 10 }}/>
                  <Skeleton height={25} width={30} />
                </div>

                <div className="mt-8 flex">
                  <Skeleton height={25} width={100} />
                </div>
              </div>:
              <div>
                <p className="font-bold text-md mt-5">Select Quantity</p>
                <div className="flex items-center rounded-lg">
                  <button className="text-white text-sm font-semibold bg-red-400 py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(0, Product)} disabled={foodQuantity == 1}><i className="fa-solid fa-minus"></i></button>
                    <h6 className="font-bold mx-3">{foodQuantity}</h6>
                  <button className="text-white text-sm font-semibold bg-green-400 py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(1, Product)}><i className="fa-solid fa-plus"></i></button> 
                    <h6 className="font-bold mx-3 text-xl">${TotalPrice}</h6>
                </div>

                  <button className="mt-8 text-white text-sm font-semibold bg-amber-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 disabled:hover:scale-100 disabled:opacity-60 disabled:shadow-none" disabled={findCart} onClick={addToCart}>ADD TO CART</button>
              </div>
                }
            </div>

            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className="hover:text-red-500 hover:scale-110 transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default ProductModal;
