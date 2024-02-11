import axios from "axios";
import { CHANGEPASSWORD } from "../../../constants";

const handler = async (req, res) => {
  const Password = req.body;
  
  const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const response = await axios.post(CHANGEPASSWORD, Password, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        res.status(201).json(response.data);
      }else{
        res.status(response.status).json(response.data);
      }
    } catch (error) {
      res.status(500).json({ message: error.response.data.message });
    }

};

export default handler;
