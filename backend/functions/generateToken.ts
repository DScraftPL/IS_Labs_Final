import Jwt from "jsonwebtoken";

const generateToken = (id: any, role: any) => {
  return Jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "30m",
  })
}

export default generateToken