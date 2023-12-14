import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import {
  quantityDecrease,
  quantityIncrease,
  reset,
} from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Cart = ({ userList }) => {
  const { data: session } = useSession();

  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  const dispatch = useDispatch();

  const user = userList?.find((user) => user.email === session?.user?.email);

  const [productState, setProductState] = useState([]);

  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    products: productState,
    method: 0,
  };

  useEffect(() => {
    const productTitles = cart.products.map((product) => {
      return {
        title: product.title,
        foodQuantity: product.foodQuantity,
        extras: product.extras,
      };
    });
    setProductState(productTitles);
  }, [cart.products]);
  console.log(productState);
  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure you want to create this order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );

          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order created successfully");
          }
        }
      } else {
        router.push("/auth/login");
        throw new Error("You must be logged in to create an order");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
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
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] p-10 w-full">
          <Title addClass="text-[40px] text-center">Cart</Title>
          {cart.products.length > 0 ? (
            <div className="w-full">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cart.products.map((product) => (
                    <div key={product._id} className="container mx-auto p-6 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
                      <div className="h-[200px] overflow-hidden relative rounded-xl ">
                        <Image className="h-full w-full object-cover transition duration-500 hover:scale-110" src={product.img} layout="fill" />
                      </div>
                      <div>
                        <div>
                          <Link href={'product/'+product._id}><h1 className="cursor-pointer hover:text-amber-400 mt-5 text-xl font-semibold transition duration-500">{product.title}</h1></Link>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <p className="font-bold text-xl text-gray-500">${product.price}</p>
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
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold">Your cart is empty</h1>
              <button
                className="btn-primary mt-4"
                onClick={() => router.push("/menu")}
              >
                Go to menu
              </button>
            </div>
          )}
        </div>

        {cart.products.length &&
          <div className="bg-neutral-50 min-h-[calc(100vh_-_433px)] md:h-screen flex flex-col justify-center p-8 lg:w-auto md:w-[280px] w-full md:text-start sticky top-0">
            <Title addClass="text-[32px] whitespace-nowrap">CART TOTAL</Title>

            <div className="mt-2">
              
              <p className="mt-2 font-bold text-gray-500">Subtotal: <span className="mt-5 text-gray-900 font-bold">${cart.total}</span></p>
              <p className="mt-2 font-bold text-gray-500">Discount: <span className="mt-5 text-gray-900 font-bold">$0.00</span></p>
              <p className="mt-2 font-bold text-gray-500">Total: <span className="mt-5 text-gray-900 font-bold">${cart.total}</span></p>
            </div>

            <div>
              <button
                className="text-white text-md font-semibold bg-amber-400 mt-8 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 whitespace-nowrap"
                onClick={createOrder}
              >
                CHECKOUT NOW!
              </button>
            </div>
          </div>
        }
        </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;

{
  /* */
}
