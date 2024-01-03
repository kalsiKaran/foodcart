import axios from "axios";
import { BANNERS } from "../../../constants";

const handler = async (req, res) => {
  const { method } = req;
  
  if (method === "GET") {
    try {
      const banners = await axios.get(BANNERS);
      res.status(200).json(banners.data.banners);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
