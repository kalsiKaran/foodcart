import axios from "axios";
import { BASE_URL } from "../../../constants";

const handler = async (req, res) => {
  const { method } = req;
  
  if (method === "GET") {
    try {
      const categories = await axios.get(`${BASE_URL}/menu`);
      res.status(200).json(categories.data.categories);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
