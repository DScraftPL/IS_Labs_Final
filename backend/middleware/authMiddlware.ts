import Jwt from "jsonwebtoken";
import models from "../models/Schemas";

interface DecodedToken {
  id: string;
}

const protect = async (req: any, res: any, next: any) => {
  let token: string;
  
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      req.user = await models.UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
}

export default protect;