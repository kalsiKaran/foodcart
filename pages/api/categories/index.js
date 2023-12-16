import Category from "../../../models/Category";
import dbConnect from "../../../util/dbConnect";
import axios from 'axios';

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  // if (method === 'GET') {
  //   try {
      
  //     const response = await axios.get('https://dummyjson.com/products');
  //     const categories = response.data; // Assuming the data is in an array format
  //     res.status(200).json(categories);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }

  if (method === "GET") {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
