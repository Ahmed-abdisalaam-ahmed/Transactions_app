import User from "../modules/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {
    let {name , email, password , role, profile} = req.body

    try {
        email = email.toLowerCase()
        const exists = await User.findOne({ email })
        if(exists) return res.status(401).json({message : "Email already exist's"})

        // if not exists
        const user = await User.create({name , email , password, role, profile})
        const token = generateToken(user.id)
        res.status(201).json({token})

    } catch (err) {
        console.log("register Error ",err)
        next(err)
    }
}

export const login = async (req, res, next) => {
    let {email, password} = req.body;
    try {
        email = email.toLowerCase()
        const user = await User.findOne({email})
        if (!email || !(await user.comparePassword(password))){
            return res.status(401).json({message: "Invalid email and Password"})
        }
        console.log("user info", user)
        const token = generateToken(user._id)
        res.status(201).json( { token}  )
    } catch (err) {
        next(err)
        console.log("login in",err)
    }

}
