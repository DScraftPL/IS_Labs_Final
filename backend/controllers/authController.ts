import { Request, Response } from "express"
import models from "../models/Schemas"
import generateToken from "../functions/generateToken"

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    const userExists = await models.UserModel.findOne({ email })

    if (userExists) {
      res.status(400).json({ message: "User already exists" })
      return
    }

    console.log("Creating user...")

    const user = await models.UserModel.create({
      username,
      email,
      password
    })

    console.log(user)

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      console.error("User creation failed")
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ message: "Server error" })
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await models.UserModel.findOne({ email });

    console.log(user)

    if (user && (await user.matchPassword(password))) {
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
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const updateName = async (req: Request, res: Response) => {
  try {
    const { email, password, username }  = req.body
    const user = await models.UserModel.findOne({ email });

    if(user && (await user.matchPassword(password))) {
      user.username = username
      await user.save()

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
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export default {
  registerUser,
  loginUser,
  updateName
}
