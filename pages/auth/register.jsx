import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { registerSchema } from "../../schema/register";
import { toast } from "react-toastify";
import { login } from "../../components/Login";

const Register = () => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 201) {
        toast.success("User created successfully");
        
        const { phone, password } = values;
        login(phone, password);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
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
      placeholder: "Your Password Again",
      value: values.c_password,
      errorMessage: errors.c_password,
      touched: touched.c_password,
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
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
          <Link href="/auth/login">
            <span className="text-sm underline cursor-pointer text-secondary">
              Do you have a account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};


export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token || '';
  console.log(req.url)

  if(token){
    return{
      redirect: {
        destination: '/menu',
        permanent: false
      }
    }
  }

  return {
    props: {},
  };
}


export default Register;
