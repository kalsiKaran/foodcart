import { USER } from "../../../constants";
import axios from "axios";

const handler = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const response = await axios.get(USER, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(err.response.status).json(err.data)
    }

};

export default handler;
