// import Category from "../../../models/Category";
// import dbConnect from "../../../util/dbConnect";

// const handler = async (req, res) => {
//   await dbConnect();
//   const {
//     method,
//     query: { id },
//   } = req;

//   if (method === "GET") {
//     try {
//       const category = await Category.findById(id);
//       res.status(200).json(category);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   if (method === "DELETE") {
//     try {
//       const category = await Category.findByIdAndDelete(id);
//       res.status(200).json(category);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// export default handler;

import axios from 'axios';

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  if (method === 'GET') {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const category = response.data;
      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  }

  if (method === 'DELETE') {
    try {
      // Perform deletion logic
      res.status(200).json({ message: `Deleted category with ID ${id}` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
};

export default handler;
