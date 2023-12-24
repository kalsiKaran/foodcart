import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    
    if (confirm("Are you sure you want to sign out?")) {
      try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        if (res.status === 200) {
          toast.success("Sign out successfully", {
            position: "bottom-left",
            theme: "colored",
          });

          router.push("/auth/login")
        }
      } catch (err) {
        toast.error(err.response?.data?.message);
        console.log(err);
      }
    }
  };

  return (
    <div className="w-72 mx-auto border-2 my-16 rounded-xl">
        {user ? 
          <div className="flex flex-col items-center py-8">
            <div className="relative overflow-hidden h-24 w-24 rounded-full ">
              <Image src="/images/client2.jpg" alt="" className="h-full w-full" objectFit="cover" layout="fill" />
            </div>
            <h1 className="font-bold mt-6 text-xl">Testing name</h1>
            <div className="grid grid-cols-2 gap-5 mt-6">
              <button className="w-24 rounded-md bg-amber-400 py-2 px-3 font-semibold uppercase text-white hover:scale-110 transition duration-300" onClick={() => router.push('/menu')}>Order</button>
              <button className="w-24 rounded-md bg-red-400 py-2 px-3 font-semibold uppercase text-white hover:scale-110 transition duration-300" onClick={handleSignOut}>Logout</button>
            </div>
          </div>:
          <div className="flex flex-col items-center py-8">
            <Skeleton height={96} width={96} circle={true} />
            <Skeleton height={20} width={96} style={{marginTop: 20}} />
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

  try {
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`
    );

    const user = userResponse ? userResponse.data : null;

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        user: null,
      },
    };
  }

}

export default Profile;
