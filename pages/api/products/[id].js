import { SINGLE_PRODUCT } from "../../../constants";
import axios from "axios";

const handler = async (req, res) => {
  const { method, query } = req;

  try {
    if (method === 'GET') {
      const productId = query.id; // Fetch the ID from query parameters
      
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      console.log(query)

      const product = await axios.get(`${SINGLE_PRODUCT}/${productId}`);
      
      res.status(200).json(product.data);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
