import axios from "axios";
import { CATEGORIES } from "../../../constants";

const handler = async (req, res) => {
  const { method } = req;
  
  if (method === "GET") {
    try {
      const categories = await axios.get(CATEGORIES);
      res.status(200).json(categories.data.categories);
    } catch (err) {
      console.log('error logged',err);
    }
  }
};

export default handler;
