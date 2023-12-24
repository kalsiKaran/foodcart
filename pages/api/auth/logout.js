import { LOGOUT } from "../../../constants";
import axios from "axios";
import { serialize } from "cookie";

const handler = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const response = await axios.get(LOGOUT, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const clearToken = serialize('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(0)
      });

      res.setHeader('Set-Cookie', clearToken);
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(400).json(res.data)
    }

};

export default handler;
