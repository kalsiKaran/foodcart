import { BASE_URL } from "../../../constants";
import axios from "axios";

const handler = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
      const response = await axios.get(`${BASE_URL}/auth/logout`, config);
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(400).json(res.data)
    }

};

export default handler;
