import { Request, Response } from "express"
import models from "../models/Schemas"
import generateToken from "../functions/generateToken"

const registerUser = async (req: Request, res: Response) => {
  try {
    const {username, email, password} = req.body

    const userExists = await models.UserModel.findOne({ email })

    if(userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await models.UserModel.create({
      username,
      email,
      password
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    } 
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await models.UserModel.findOne({ email });

    if(user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export default {
  registerUser,
  loginUser
}
