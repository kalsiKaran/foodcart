import axios from "axios";
import { CREATEORDER } from "../../../constants";
import { serialize } from 'cookie';

const handler = async (req, res) => {
  const Details = req.body;
  const token = req.cookies.token;

  if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await axios.post(CREATEORDER, Details, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 200) {
        
      const orderCreated = serialize('orderSuccess', true, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
      });

      res.setHeader('Set-Cookie', orderCreated);

      res.status(200).json(response.data);
    }else{
      res.status(response.status).json(response.data);
    }
  } catch (err) {
    console.log('error', err.response.data);
    res.status(500).json({ message: err.response.data });
  }

};

export default handler;
