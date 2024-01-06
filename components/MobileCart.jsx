import { useState } from "react";
import { reset } from "../redux/cartSlice";
import Link from "next/link";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

const MobileCart = ({cart}) => {
    const dispatch = useDispatch();
    const [Remove, setRemove] = useState();
    
  return (
    <div className="rounded-t-lg overflow-hidden flex fixed left-0 bottom-0 w-full shadow-[0px_-5px_20px_rgba(0,0,0,0.10)] z-50">
        <div className="flex items-center justify-between py-3 px-4 bg-white grow">
            <h6 className="font-semibold grow">{cart.quantity} item{cart.quantity>1 && 's'} added</h6>
            <Link href='/cart'>
                <div className="flex items-center bg-red-500 rounded-lg px-3 py-1">
                    <div className="text-center text-xs font-semibold">
                        <p className="text-white">₹{cart.total}</p>
                        <p className="text-white/90">View Cart</p>
                    </div>
                    <span className="text-xl text-white ml-3"><IoArrowForwardCircle /></span>
                </div>
            </Link>


            <div className="flex items-center ml-3">
                <span onClick={(() => setRemove(!Remove))} className="z-10 text-md text-gray-600 h-5 w-5 grid place-content-center bg-slate-100 rounded-full"><IoClose /></span>
            </div>
        </div>

        <div onClick={() => dispatch(reset())} className={`${Remove ? 'w-[78px]' : 'w-0'} cursor-pointer h-auto transition-all duration-500`}>
            <div className="bg-red-100 px-4 py-2 h-full inline-flex items-center text-red-600 text-xs font-semibold">Remove</div>
        </div>
    </div>

  );
};

export default MobileCart;
