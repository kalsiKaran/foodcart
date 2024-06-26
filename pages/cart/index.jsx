import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import {
  quantityDecrease,
  quantityIncrease,
  reset,
} from "../../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { makePayment } from "../../components/payment";
import { MAXDISCOUNT, PAYMENTMETHOD } from "../../constants";
import { TbShoppingCartX } from "react-icons/tb";
import { setPoints } from "../../redux/authSlice";

const Cart = ({ loggedIn }) => {

  const cart = useSelector((state) => state.cart);
  const userPoints = useSelector((state) => state.auth.userPoints);

  const router = useRouter();

  const dispatch = useDispatch();

  const [paymentType, setPaymentType] = useState("HandCash");
  const [productState, setProductState] = useState([]);
  const [tableId, setTableId] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const [Discount, setDiscount] = useState(0);

  const applyDiscount = () => {
    if(userPoints > MAXDISCOUNT){
      setDiscount(MAXDISCOUNT);
    }else{
      setDiscount(userPoints);
    }
  }

  useEffect(() => {
    applyDiscount();
  }, []);

  const handleDiscount = (type) => {
    if(type === 0){
      setDiscount(0);
    }else{
      applyDiscount();
    }
  }
  
  useEffect(() => {
    const storedTableId = localStorage.getItem('tableId');
    setTableId(storedTableId);
  }, []);

  useEffect(() => {
    setCartLength(cart.products.length);
  }, [cart]);


  const newOrder = {
    table_no: tableId || null,
    payment_type: paymentType,
    total: cart.total - Discount,
    points: Discount,
    sub_total: cart.total,
    products: productState,
  };

  useEffect(() => {
    const productTitles = cart.products.map((product) => {
      return {
        id: product.id,
        qty: product.quantity,
        price: product.price,
        subtotal: product.totalPrice,
        variant: product.variant || ""
      };
    });
    setProductState(productTitles);
  }, [cart.products]);

  
  const handlePayment = () => {
    makePayment();
  }

  const createOrder = async () => {
    if (loggedIn) {
    try {
        if (confirm("Are you sure you want to create this order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );

          if (res.status === 200) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
            dispatch(setPoints(res.data?.points));
            dispatch(reset());
            toast.success("Order created successfully");
            router.push("/thankyou");
          }
        }
      } catch (error) {
        toast.error("Something went wrong.");
        console.log(error.response?.data?.message);
      }
    } else {
      router.push("/auth/login");
      toast.error("You must be logged in to create an order");
    }
  };

  const quantityChange = (type, price) => {
    if (type === 0) {
      dispatch(quantityDecrease(price));
    }
    if (type === 1) {
      dispatch(quantityIncrease(price));
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)] bg-neutral-100 pb-16 sm:pb-0">
      <div className="flex justify-between md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] p-2 md:p-4 w-full">
          {cartLength > 0 ? (
            <div className="w-full">
              <Title addClass="text-[40px] text-center mb-4 mt-5">Cart</Title>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cart.products.map((product) => (
                    <div key={product.id} className="container mx-auto p-6 bg-white max-w-sm rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">
                      <div className="h-[200px] overflow-hidden relative rounded-xl ">
                        {product.product_image ? 
                          <Image className="h-full w-full object-cover transition duration-500 hover:scale-110" src={product.product_image} layout="fill" alt={product.product_name} />:
                          <div className="animate-pulse h-full w-full">
                            <div className="h-full w-full bg-slate-200"></div>
                          </div>
                        }
                      </div>
                      <div>
                        <div>
                          <Link href={'product/'+product.id}><h1 className="cursor-pointer hover:text-amber-400 mt-5 text-xl font-semibold transition duration-500">{product.product_name}</h1></Link>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <p className="font-bold text-xl text-gray-500">₹{product.price}</p>
                          <div className="flex items-center rounded-lg">
                            <button className="text-white text-sm font-semibold bg-red-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(0, product)}><i className="fa-solid fa-minus"></i></button>
                              <h6 className="font-bold mx-3">{product.foodQuantity}</h6>
                            <button className="text-white text-sm font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={() => quantityChange(1, product)}><i className="fa-solid fa-plus"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-20">
              <TbShoppingCartX size={72} />
              <h1 className="text-2xl font-semibold mt-6">Your cart is empty</h1>
              <h1 className="text-md font-regular text-slate-400 mt-2 text-center">Looks like you haven&apos;t made your choice yet..</h1>
              <Link href="/menu"
                className="btn-primary mt-8"
              >
                Go to menu
              </Link>
            </div>
          )}
        </div>

        {cartLength > 0 &&
          <div className="min-h-[calc(100vh_-_433px)] md:h-screen flex flex-col mt-0 md:mt-5 py-8 px-4 md:w-[400px] w-full md:text-start sticky top-0  z-10">

            <div className="bg-white p-5 pb-2 rounded-md">
            <h6 className="text-lg whitespace-nowrap font-semibold mb-3">Payment Method</h6>

              {PAYMENTMETHOD.map((payment)=>(
                <label className="mb-3 group block" key={payment.value}>
                  <input type="radio" name="payment" value={payment.value} className="hidden peer appearance-none" checked={payment.value === paymentType} onChange={() => setPaymentType(payment.value)} />
                  <div className="flex items-center rounded-md p-4 border-2 peer-checked:border-amber-400 cursor-pointer">
                    <span className="group-hover:scale-110 transition duration-300">{payment.icon}</span>
                    <h1 className="font-semibold uppercase ml-3">{payment.title}</h1>
                  </div>
                </label>
              ))}
            </div>

            {userPoints > 0 &&
              <div className="bg-white py-5 px-4 rounded-md mt-3">
                {Discount > 0 ? 
                  <div>
                    <p className="whitespace-nowrap text-xs font-regular text-gray-500 italic leading-0">Congratulations! Your discount is applied.</p>
                    <p className="text-xs font-regular text-gray-500 italic leading-0">You are saving <span className="font-semibold text-sm">₹{Discount}🥳🥳</span></p>
                    <p className="uppercase font-semibold text-right underline text-red-500 text-xs mt-2 mr-1 cursor-pointer" onClick={() => handleDiscount(0)}>Remove</p>
                  </div>:
                  <div>
                    <p className="text-xs font-regular text-gray-500 italic leading-0">You have <span className="font-semibold text-sm">{userPoints}</span> Points. Get the discount of upto ₹{MAXDISCOUNT}.</p>
                    <p className="uppercase font-semibold text-right underline text-red-500 text-xs cursor-pointer mt-2 mr-1" onClick={() => handleDiscount(1)}>Apply</p>
                  </div>
                }
              </div>
            }
            <div className="bg-white py-5 px-4 rounded-md mt-3">
              <h6 className="text-lg whitespace-nowrap font-semibold mb-3">Order Summary</h6>
              
              <p className="pb-1 font-semibold text-gray-500 flex justify-between">Subtotal: <span className="text-gray-900 font-semibold">₹{cart.total}</span></p>
              <p className="py-1 border-y font-semibold text-gray-500 flex justify-between">Discount: <span className="text-gray-900 font-semibold">₹{Discount}</span></p>
              <p className="pt-1 font-semibold text-gray-500 flex justify-between">Total: <span className="text-gray-900 font-semibold">₹{cart.total  - Discount}</span></p>
            </div>

            <button
              className="fixed bottom-0 left-0 sm:relative w-full text-white text-md font-semibold bg-amber-400 mt-5 py-4 sm:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 whitespace-nowrap"
              onClick={createOrder}
            >
              CHECKOUT NOW!
            </button>
          </div>
        }
        </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.token || null;

  return {
    props: {
      loggedIn: token ? true : false
    },
  };
};

export default Cart;