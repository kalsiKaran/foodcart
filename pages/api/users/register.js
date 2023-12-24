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
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ message: err });
  }

};

export default handler;
