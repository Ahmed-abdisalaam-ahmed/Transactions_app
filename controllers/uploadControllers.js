import User from "../modules/User.js"
import cloudinary from "../utils/cloudinary.js";

export const uploadFile = (req, res , next) => {
    if(!req.file) {
        return res.status(401).json({ message : " No file Uploaded"})
    }

    const stream = cloudinary.uploader.upload_stream(
        {folder: "shihabi_image", resource_type: "auto"},
        async (error, result) => {

            if(error) return next(error);
            try {
                if (!req.user || !req.user._id) {
                    return res.status(401).json({ message: "User not authenticated" });
                }
                await User.findByIdAndUpdate(req.user._id, {profile: result.secure_url} )

                res.status(201).json({
                    success: true,
                    fileUrl: result.secure_url
                });
            } catch (err) {
                next(err)
            }
        }
    )
    stream.end(req.file.buffer)
}