import bcrypt from "bcryptjs"
import User from "../models/user-models.js"
import generateToken from "../utils/jsonWebToken.js"

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, gender } = req.body

        if(password !== confirmPassword ){
            return res.status(401).json({ error: "Passwords don't match!"})
        }

        
        const user = await User.findOne({ email })

        if(user){
            return res.status(401).json({ error: "User already exists!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            gender,
        })

        console.log("newUser", newUser);

        if(newUser){
            generateToken(newUser._id, newUser.role, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                gender: newUser.gender,
                role: newUser.role,
            })
        } else {
            res.status(401).json({ error: "Invalid user data!"})
        }
    } catch (error) {
        console.log("Error while signing up", error.message)
        return res.status(500).json({ error: "Internal Server Error! "})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(401).json({ error: "Invalid credentials!"})
        }

        generateToken(user._id, user.role, res)

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            gender: user.gender,   
            role: user.role, 
        })
    } catch (error) {
        console.log("Error while signing up", error.message)
        res.status(500).json({ error: "Internal Server Error!"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge : 0})
        res.status(201).json({ message: "Logout Successful!"})
    } catch (error) {
        console.log("Error while signing up", error.message)
        return res.status(500).json({ error: "Internal Server Error!"})
    }
}