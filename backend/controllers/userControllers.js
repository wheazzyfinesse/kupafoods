import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    console.log(req.body)
    try {

        const { username, email } = req.body
        console.log("first")
        if (!username || !email) return res.status(401).json("Please fill all the required fields")
        // Check if user already exists
        const user = await User.findOne({ email })
        console.log(user)
        if (user) return res.status(400).json('User already exists, please log in to your account')
        // Create a new user
        const newUser = await User.create(req.body)
        console.log(newUser)
        const userId = newUser._id.toString()
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const { password: _, ...userInfo } = newUser._doc
        res.status(200).json({ userInfo, token })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        if (!email) return res.status(401).json("Please fill all the required fields")
        const user = await User.findOne({ email })
        console.log(console.log(user))
        if (!user) return res.status(401).json("Invalid Credentials! Please check your credentials or register to create an account")

        if (!req.body.password) {
            if (req.body.providerId === "google.com") {
                const userId = user._id
                const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" })
                const { password: _, ...userInfo } = user._doc
                return res.status(200).json({ userInfo, token })
            }
            return res.status(401).json("Invalid Credentials! Please check your credentials or register to create an account")
        }
        const userId = user._id.toString()
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const { password: _, ...userInfo } = user._doc

        return res.status(200).json({ userInfo, token })


    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}
export { register, login } 