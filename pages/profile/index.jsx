import { setIsloggedIn, setPoints } from "../../redux/authSlice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Avatar from "react-avatar";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { BiWallet } from "react-icons/bi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchUser = async () => {
      try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setUser(res.data);
        dispatch(setPoints(res.data?.points));
      }catch(err){
        console.log(err)
        setUser(null);
      }
    } 

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    
    if (confirm("Are you sure you want to sign out?")) {
      try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        if (res.status === 200) {
          toast.success("Sign out successfully", {
            position: "bottom-left",
            theme: "colored",
          });

          router.push("/auth/login");
          dispatch(setIsloggedIn(false));
        }
      } catch (err) {
        toast.error(err.response?.data?.message);
        console.log(err);
      }
    }
  };

  return (
    <div className="w-72 mx-auto border-2 mt-20 sm:mt-16 mb-24 rounded-xl">
        {user ? 
          <div className="relative flex flex-col items-center py-8">
            <div className="relative overflow-hidden h-24 w-24 rounded-full ">
              { user?.photo ? 
                <Image src={user.photo} alt={user.name} className="h-full w-full" objectFit="cover" layout="fill" />:
                <Avatar name={user.name} />
              }
            </div>
            <h1 className="font-bold mt-6 text-xl capitalize">{user.name}</h1>
            {user.email && <h1 className="font-semibold mt-2 text-sm text-slate-400">{user.email}</h1>}
            <div className="grid grid-cols-2 gap-5 mt-6">
              <button className="w-24 rounded-md bg-amber-400 py-2 px-3 font-semibold uppercase text-white hover:scale-110 transition duration-300" onClick={() => router.push('/menu')}>Order</button>
              <button className="w-24 rounded-md bg-red-400 py-2 px-3 font-semibold uppercase text-white hover:scale-110 transition duration-300" onClick={handleSignOut}>Logout</button>
            </div>
            <div className="absolute right-2 top-2 flex items-center bg-red-50 text-red-500 py-1 px-2 rounded-md">
              <BiWallet className="text-xl" />
              <h6 className="text-md ml-1 font-semibold">{user.points}</h6>
            </div>
          </div>:
          <div className="flex flex-col items-center py-8">
            <Skeleton height={96} width={96} circle={true} />
            <Skeleton height={20} width={96} style={{marginTop: 20}} />
            <Skeleton height={16} width={125} style={{marginTop: 15}} />
            <div className="grid grid-cols-2 gap-5 mt-6">
              <Skeleton height={30} width={100} />
              <Skeleton height={30} width={100} />
            </div>
          </div>
        }
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

export default Profile;
