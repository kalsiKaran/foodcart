import axios from "axios";
import { LOGIN } from "../../../constants";
import { serialize } from 'cookie';

const handler = async (req, res) => {
  const User = req.body;

  try {
    const response = await axios.post(LOGIN, User)
    
    if (response.status === 200) {
      const token = response.data.accessToken;

      const setToken = serialize('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
      });

      res.setHeader('Set-Cookie', setToken);
      res.status(200).json(response.data);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (err) {
    console.error('Login Error:', err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || 'Login failed' });
  }
};

export default handler;
