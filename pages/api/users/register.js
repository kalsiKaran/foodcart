import axios from "axios";
import { REGISTER } from "../../../constants";

const handler = async (req, res) => {
  const User = req.body;

  try {
    const response = await axios.post(REGISTER, User);

    if (response.status === 201) {
      res.status(201).json(response.data);
    }else{
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: error.response.data.message });
  }

};

export default handler;
