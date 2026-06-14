import jwt from 'jsonwebtoken'
import User from '../modules/User.js'

export const protect = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({message : "token is Required"});

    console.log(token)
    // console.log(req.headers.authorization)
    console.log("Token received:", token);
    console.log("Secret being used:", process.env.JWT_SECRET);

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decode", decode)
        const user = await User.findById(decode.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message : "Invalid or expired token"})
        console.log(err)
    }
}