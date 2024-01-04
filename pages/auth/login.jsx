import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { loginSchema } from "../../schema/login";
import { login } from "../../components/Login";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const { phone, password } = values;
    login(phone, password, router, dispatch)
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        phone: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "phone",
      type: "phone",
      placeholder: "Your Phone Number",
      value: values.phone,
      errorMessage: errors.phone,
      touched: touched.phone,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="w-full pt-10 sm:pt-20 pb-32 sm:pb-26 px-5 sm:px-10">
      <form
        className="flex flex-col items-center p-10 rounded-md border shadow-xl md:w-1/2 lg:w-1/3 w-full mx-auto bg-white"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Login</Title>
        <div className="flex flex-col gap-y-3 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button className="btn-primary" type="submit">
            LOGIN
          </button>
          <div className="flex items-center">
            <span className="text-sm text-gray-400">
              Don&apos;t have an account?
            </span>
            <Link href="/auth/register">
              <span className="text-sm cursor-pointer hover:underline text-primary ml-2">Sign Up!</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token || '';
  
  if(token){
    return{
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }
  }

  return {
    props: {},
  };
}

export default Login;
