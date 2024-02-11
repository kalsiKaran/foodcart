import axios from "axios";
import { USERORDERS } from "../../../constants";

const handler = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const response = await axios.get(USERORDERS, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

      res.status(200).json(response.data.orders);
    } catch (err) {
      console.log(err);
      res.status(err.response.status).json(err.data)
    }

};

export default handler;
