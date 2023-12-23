import { toast } from "react-toastify";
import axios from 'axios';

export const login = async (phone, password) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      phone: phone,
      password: password,
    });

    if (response.status === 200) {
      toast.success('Login successfully', {
        position: 'bottom-left',
        theme: 'colored',
      });
      return { success: true };
    } else {
        toast.error('Login failed', {
            position: 'bottom-left',
            theme: 'colored',
        });
      return { success: false, message: 'Login failed' };
    }
  } catch (error) {
    if(error.response?.status === 401){
        toast.error('Phone or Password is incorrect', {
            position: 'bottom-left',
            theme: 'colored',
        });
    }else{
        toast.error('Login failed', {
            position: 'bottom-left',
            theme: 'colored',
        });
    }
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};
