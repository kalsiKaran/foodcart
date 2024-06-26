import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { registerSchema } from "../../schema/register";
import { toast } from "react-toastify";
import { login } from "../../components/Login";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 201) {
        const { phone, password } = values;
        login(phone, password, router, dispatch);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
    actions.resetForm();
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        password: "",
        c_password: "",
      },
      onSubmit,
      validationSchema: registerSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Your Full Name",
      value: values.name,
      errorMessage: errors.name,
      touched: touched.name,
    },
    {
      id: 2,
      name: "phone",
      type: "text",
      placeholder: "Your Phone Number",
      value: values.phone,
      errorMessage: errors.phone,
      touched: touched.phone,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 4,
      name: "c_password",
      type: "password",
      placeholder: "Confirm Password",
      value: values.c_password,
      errorMessage: errors.c_password,
      touched: touched.c_password,
    },
  ];

  return (
    <div className="w-full pt-10 sm:pt-20 pb-32 sm:pb-26 px-5 sm:px-10">
      <form
        className="flex flex-col items-center p-10 rounded-md border shadow-xl md:w-1/2 lg:w-1/3 w-full mx-auto bg-white"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Register</Title>
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
            REGISTER
          </button>
          <div className="flex items-center">
            <span className="text-sm text-gray-400">
              Already have an account?
            </span>
            <Link href="/auth/login">
              <span className="text-sm cursor-pointer hover:underline text-primary ml-2">Sign In!</span>
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


export default Register;
