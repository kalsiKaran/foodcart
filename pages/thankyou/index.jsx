import Title from "../../components/ui/Title";
import { FaCheckCircle } from "react-icons/fa";

const Index = () => {

  return (
    <div className="mt-10 mb-16 mx-5 md:mx-auto py-10 px-5 w-auto md:w-96 shadow-xl border rounded-lg flex flex-col items-center">
        <FaCheckCircle size={72} className="text-green-500" />
        <Title addClass="text-5xl mt-8">Thank You!</Title>
        <h1 className="mt-5 font-semibold text-xl text-slate-500">Your Order is Being Prepared!</h1>
    </div>
  );
};


export async function getServerSideProps(context) {
    const { req } = context;
    const orderSuccess = req.cookies.orderSuccess || '';
    
    if(!orderSuccess){
      return{
        redirect: {
          destination: '/cart',
          permanent: false
        }
      }
    }
  
    return {
      props: {},
    };
}

export default Index;
