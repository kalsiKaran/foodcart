import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Account from "../../components/profile/Account";
import Order from "../../components/profile/Order";
import Password from "../../components/profile/Password";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";

const Profile = ({ user }) => {
  
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();

  const handleSignOut = async () => {
    
    if (confirm("Are you sure you want to sign out?")) {
      try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        if (res.status === 200) {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          toast.success("Sign out successfully", {
            position: "bottom-left",
            theme: "colored",
          });
        }
      } catch (err) {
        toast.error(err.response?.data?.message);
        console.log(err);
      }
    }
  };

  return (
    <div className="flex pr-10 min-h-[calc(100vh_-_433px)] md:flex-row flex-col md:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0 lg:h-[80vh] justify-center flex flex-col shadow-2xl">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0 ">
          <Image
            src={user?.image ? user?.image : "/images/client2.jpg"}
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">{user.fullName}</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Account</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Password</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Logout</button>
          </li>
        </ul>
      </div>
      {/* {tabs === 0 && <Account user={user} />}
      {tabs === 1 && <Password user={user} />}
      {tabs === 2 && <Order />} */}
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  // const user = await axios.get(
  //   `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  // );

  const user = {
    image: "",
    fullName: "Testing"
  }

  return {
    props: {
      user: user,
    },
  };
}

export default Profile;
