import axios from "axios";
import { CONFIG } from "../../../constants";

const handler = async (req, res) => {
  const { method } = req;
  
  if (method === "GET") {
    try {
      const config = await axios.get(CONFIG);
      res.status(200).json(config.data.config);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
