import { PRODUCTS } from "../../../constants";
import axios from "axios";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    try {
      const products = await axios.get(PRODUCTS);
      res.status(200).json(products.data.products);
    } catch (err) {
      console.log(err);
    }
  }

};

export default handler;
