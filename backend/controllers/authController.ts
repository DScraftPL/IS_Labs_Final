import { Request, Response } from "express"
import models from "../models/Schemas"
import generateToken from "../functions/generateToken"
import Jwt from "jsonwebtoken"

interface DecodedToken {
  id: string;
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body

    console.log("Registering user...")

    const session = await models.UserModel.startSession()
    session.startTransaction()

    const userExists = await models.UserModel.findOne({ email }).session(session)

    if (userExists) {
      console.log("User already exists")
      res.status(400).json({ message: "User already exists" })
      return
    }

    console.log("Creating user...")

    const users: any = await models.UserModel.create([{
      username,
      email,
      password,
      role
    }], { session })

    const user = users[0]

    console.log(user)

    if (user) {
      await session.commitTransaction()
      session.endSession()

      console.log("Response sent:", {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.role)
      });

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.role)
      })
    } else {
      await session.abortTransaction()
      session.endSession()

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
    const session = await models.UserModel.startSession()
    session.startTransaction()

    const { email, password } = req.body
    const user: any = await models.UserModel.findOne({ email }).session(session);

    console.log(user)

    if (user && (await user.matchPassword(password))) {
      await session.commitTransaction()
      session.endSession()
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.role)
      })
    } else {
      await session.abortTransaction()
      session.endSession()
      res.status(401).json({ message: "Invalid email or password" })
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const updateName = async (req: Request, res: Response) => {
  try {
    const session = await models.UserModel.startSession()
    session.startTransaction()

    const { email, password, username } = req.body
    const user: any = await models.UserModel.findOne({ email }).session(session);

    if (user && (await user.matchPassword(password))) {
      user.username = username
      await user.save()

      await session.commitTransaction()
      session.endSession()

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.role)
      })
    } else {
      await session.abortTransaction()
      session.endSession()
      res.status(401).json({ message: "Invalid email or password" })
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const refeshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  if (!refreshToken || typeof refreshToken !== "string") {
    res.status(401).json({ message: "No refresh token provided" })
    return
  }
  const session = await models.UserModel.startSession()
  session.startTransaction()
  try {
    console.log(refreshToken)
    const decoded = Jwt.verify(refreshToken, process.env.JWT_SECRET as string) as DecodedToken
    const user: any = await models.UserModel.findById(decoded.id).session(session).select("-password")
    if (!user) {
      res.status(401).json({ message: "Invalid refresh token" })
      return
    }

    await session.commitTransaction()
    session.endSession()

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id, user.role)
    })

  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error("Error verifying refresh token:", error)
    res.status(401).json({ message: "Invalid refresh token" })
    return
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const session = await models.UserModel.startSession()
    session.startTransaction()

    const { email, password, username } = req.body
    const user: any = await models.UserModel.findOne({ email }).session(session);

    if(username !== user.username) {
      res.status(401).json({ message: "Username does not match" })
      return
    }

    if (user && (await user.matchPassword(password))) {
      await models.UserModel.deleteOne({ email }).session(session)

      await session.commitTransaction()
      session.endSession()

      res.json({ message: "User deleted" })
    } else {
      await session.abortTransaction()
      session.endSession()
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
  updateName,
  refeshToken,
  deleteUser
}
