import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import Title from "../ui/Title";
import Link from "next/link";
import { addProduct } from "../../redux/cartSlice";
import { useEffect } from "react";
import axios from "axios";
import { RiShoppingCart2Fill } from "react-icons/ri";
import Dialog from '@mui/material/Dialog';

import Skeleton from "react-loading-skeleton";

const ProductModal = ({ setIsProductModal, productId}) => {

  const [Product, setProduct] = useState([]);
  const [Variants, setVariants] = useState([]);
  const [variant, setVariant] = useState({});

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

  useEffect(() => {
    const selectedVariant = Variants.find((item) => item.variant_price === TotalPrice);
    setVariant(selectedVariant || "")
  }, [TotalPrice, Variants]);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const findCart = cart.products.find((item) => item.id === Product.id);

  const [foodQuantity, setFoodQuantity] = useState(1);
  
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
    setVariant(item);
  };

  const addToCart = () => {
    dispatch(
      addProduct({
        ...Product,
        quantity: foodQuantity,
        foodQuantity,
        price: Price,
        totalPrice: TotalPrice,
        variant: variant?.variant_name
      })
    );
    setIsProductModal(false);
  };

  return (
    
    <Dialog 
      onClose={() => setIsProductModal(false)} 
      open={true} 
      fullWidth={true} 
      maxWidth="md"
      sx={{
        '& .MuiDialog-container': {
          alignItems: {xs: "end", sm: "center"},
        '.MuiDialog-paper': { overflow: 'visible', width: '100%', margin: 0, borderRadius: 3 } 
        }
      }}
    >
      <div className=" sm:bg-white relative sm:grid sm:grid-cols-2 gap-0 sm:gap-10  z-50 w-full bg-white sm:p-10 rounded-2xl">
      
       {/* Desktop */}
        <div className="hidden sm:block relative w-full h-full rounded-xl overflow-hidden">
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

        <div className="hidden sm:block">
          {Loading ?
          <> 
            <Skeleton width={150} height={40} />
            <Skeleton width={50} height={30} />
          </>:
          <>
            <Link href={`/product/${Product.id}`}>
              <span>
                <Title addClass="leading-tight inline-block text-[32px] cursor-pointer hover:text-amber-500 transition-all duration-500">{Product.product_name}</Title>
              </span>
            </Link>
            <p className="font-bold text-red-500 text-xl">₹{Price}</p>
          </>
          }

          { Variants.length > 0 && <p className="font-bold text-md mt-3">Select size</p> }
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
                <h6 className="font-bold mx-3 text-xl">₹{TotalPrice}</h6>
            </div>

              <button className="mt-8 text-white text-sm font-semibold bg-amber-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 disabled:hover:scale-100 disabled:opacity-60 disabled:shadow-none flex items-center" disabled={findCart} onClick={addToCart}><RiShoppingCart2Fill className="mr-2 text-xl" /> {!findCart ? "ADD TO CART" : "IN CART"}</button>
          </div>
            }
        </div>


        {/* Mobile view */}
        <div className="sm:hidden">
          <div className="bg-white p-3 rounded-t-xl flex flex-col shadow-sm">
            { Loading ? 
            <>
              <Skeleton height={192} width="100%" />
              <Skeleton height={28} width={150} style={{marginTop: 10}} />
            </>:
            <>
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                {Product.product_image &&
                  <Image
                    src={Product.product_image}
                    alt=""
                    layout="fill"
                    className="w-full object-cover"
                  />
                }
              </div>
              <Title addClass="mt-2 inline-block text-2xl cursor-pointer">{Product.product_name}</Title>
            </>
            }
          </div>

          <div className="px-3 max-h-[35vh] overflow-auto my-4">
            <div className="bg-white rounded-xl p-3">
              {Loading ? 
                <>
                  <Skeleton height={16} width={120} style={{ marginBottom: 20 }} />
                  <div className="grid grid-cols-2 gap-40">
                    <Skeleton height={16} width="100%" count={3} />
                    <Skeleton height={16} width="100%" count={3} />
                  </div>
                </>:
                <>
                  { Variants.length > 0 && 
                    <div className="border-b border-b-gray-100 pb-2">
                      <p className="text-md font-semibold">Size</p>
                      <p className="text-sm">Select any 1 option</p>
                    </div> }
                  {Variants?.map((item, _idx) => (
                    <label key={_idx} className="flex items-center mt-3 cursor-pointer rounded-full">
                      <span className={`${item.variant_price === Price ? "text-gray-900" : "text-gray-400"} text-sm capitalize font-semibold grow`}>{item.variant_name}</span>
                      
                      <span className="text-sm font-semibold text-gray-800 mr-3">₹{item.variant_price}</span>
                      <div className="relative inline-flex">
                        <input
                          type="radio"
                          name="variants"
                          defaultChecked={item.variant_price === Price}
                          className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-xl border-2 border-gray-300 transition-all checked:border-red-400 checked:bg-red-400 hover:scale-110" onChange={(e) => handleVariant(e, item)} />
                        <div className="pb-[1px] pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <i className="fas fa-check text-xs"></i>
                        </div>
                      </div>
                    </label>
                  ))}
                </>
              }
            </div>
          </div>

          {Loading ?
            <div className="flex justify-between bg-white px-3 py-2">
              <Skeleton height={40} width={80} />
              <Skeleton height={40} width={140} />
            </div>:
            <div className="bg-white py-2 px-3 flex items-center justify-between">
              <div className="flex items-center rounded-lg bg-slate-100 p-2">
                <button className="bg-white text-sm font-semibold text-black py-1 px-3 rounded-lg shadow-md" onClick={() => quantityChange(0, Product)} disabled={foodQuantity == 1}><i className="fa-solid fa-minus"></i></button>
                  <h6 className="font-bold mx-3">{foodQuantity}</h6>
                <button className="bg-white text-sm font-semibold text-black py-1 px-3 rounded-lg shadow-md" onClick={() => quantityChange(1, Product)}><i className="fa-solid fa-plus"></i></button>
              </div>

              <button className="flex items-center text-white bg-red-500 py-2 px-10 rounded-md font-semibold disabled:opacity-60" disabled={findCart} onClick={addToCart}>{!findCart ? "Add Item" : "Added"}<span className="ml-2">₹{TotalPrice}</span></button>
            </div>
          }

        </div>


        <button
          className="absolute -top-12 p-2 md:p-0 bg-neutral-800/70 rounded-full md:rounded-0 md:bg-transparent right-1/2 translate-x-1/2 md:translate-x-0 md:top-4 md:right-4"
          onClick={() => setIsProductModal(false)}
        >
          <IoCloseSharp className="text-white text-xl md:text-black hover:text-red-500 hover:scale-110 transition-all" />
        </button>
      </div>
    </Dialog>
  );
};

export default ProductModal;
