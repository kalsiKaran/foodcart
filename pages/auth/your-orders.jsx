import Title from "../../components/ui/Title";
import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const yourOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {
      try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`);
        setOrders(res.data);
        console.log(res.data)
      }catch(err){
        console.log(err)
        setUser(null);
      }
    } 

    fetchUser();
  }, []);

  return (
    <div className="px-4 sm:px-0 container mx-auto mt-10 sm:mt-16 mb-24">
      <Title addClass="text-2xl mb-6">Your Orders</Title>
      <div className="border rounded-xl">
          
        <div className="flex items-center justify-between gap-4 p-5 bg-slate-100/60">
          <h6 className="text-center text-xs uppercase text-neutral-500 font-semibold w-8">#</h6>
          <h6 className="w-32 text-center text-xs uppercase text-neutral-500 font-semibold">Order Date</h6>
          <h6 className="w-32 text-center text-xs uppercase text-neutral-500 font-semibold">Total Products</h6>
          <h6 className="hidden sm:block w-32 text-center text-xs uppercase text-neutral-500 font-semibold">Sub Total</h6>
          <h6 className="w-32 text-center text-xs uppercase text-neutral-500 font-semibold">Total</h6>
          <h6 className="hidden sm:block w-32 text-center text-xs uppercase text-neutral-500 font-semibold">Status</h6>
        </div>
        {orders ?
          <div className="max-h-72 overflow-auto">
            {orders.map((item, _idx) => (
              <div key={_idx} className="flex items-center justify-between gap-4 p-4 even:bg-neutral-100/30">
                  <h6 className="w-8 text-center text-sm uppercase text-neutral-700 font-semibold">{_idx+1}</h6>
                  <h6 className="w-32 text-center text-sm uppercase text-neutral-700 font-semibold">{item.order_date} <p className="sm:hidden text-xs bg-green-50 text-green-500 px-2 py-1 mt-1 rounded-md">{item.order_status}</p></h6>
                  <h6 className="w-32 text-center text-sm uppercase text-neutral-700 font-semibold">{item.total_products}</h6>
                  <h6 className="hidden sm:block w-32 text-center text-sm uppercase text-neutral-700 font-semibold">₹{item.sub_total}</h6>
                  <h6 className="w-32 text-center text-sm uppercase text-neutral-700 font-semibold">₹{item.total}</h6>
                  <h6 className="hidden sm:block w-32 text-center text-xs uppercase text-neutral-700 font-semibold"><span className="bg-green-50 text-green-500 px-3 py-1 rounded-md">{item.order_status}</span></h6>
              </div>
            ))}
          </div>:
          <div className="grid grid-cols-6 gap-6 p-4">
            <Skeleton height={32} width={'100%'}/>
            <Skeleton height={32} width={'100%'}/>
            <Skeleton height={32} width={'100%'}/>
            <Skeleton height={32} width={'100%'}/>
            <Skeleton height={32} width={'100%'}/>
            <Skeleton height={32} width={'100%'}/>
          </div>
        }
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token || '';
  
  if(!token){
    return{
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }

}

export default yourOrders;
