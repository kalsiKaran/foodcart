import { useFormik } from "formik";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { changePasswordSchema } from "../../schema/changePassword";
import { toast } from "react-toastify";
import axios from "axios";

const ChangePassword = () => {

    const onSubmit = async (values, actions) => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
            values
          );
          if (res.status === 200) {
            toast.success('Password changed successfully', {
              position: 'bottom-left',
              theme: 'colored',
            });
          } 
        } catch (err) {
          toast.error(err.response.data.message);
        }
        actions.resetForm();
      };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur, isValid } =
    useFormik({
      initialValues: {
        new_password: "",
        confirmNewPassword: "",
      },
      onSubmit,
      validationSchema: changePasswordSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "new_password",
      type: "password",
      placeholder: "Enter New Password",
      value: values.new_password,
      errorMessage: errors.new_password,
      touched: touched.new_password,
    },
    {
      id: 2,
      name: "confirmNewPassword",
      type: "password",
      placeholder: "Confirm New Password",
      value: values.confirmNewPassword,
      errorMessage: errors.confirmNewPassword,
      touched: touched.confirmNewPassword,
    },
  ];
  return (
    <div className="w-80 mx-auto border-2 mt-20 sm:mt-16 mb-24 rounded-xl">
        <form className="w-full p-5" onSubmit={handleSubmit} >
            <Title addClass="text-2xl mb-6">Change Password</Title>
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
                <button className="btn-primary" type="submit" disabled={!isValid || values.new_password !== values.confirmNewPassword || !values.new_password || !values.confirmNewPassword}>
                    Submit
                </button>
            </div>
        </form>
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

export default ChangePassword;
