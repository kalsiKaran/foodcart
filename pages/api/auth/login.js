import axios from "axios";
import { BASE_URL } from "../../../constants";

const handler = async (req, res) => {
  const User = req.body;

  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, User)
    
    if (response.status === 200) {
      const token = response.data.accessToken;
      res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Strict`);

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
