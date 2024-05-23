import User from '../models/user-models.js';

const protectRole = async(req, res, next) => {
    try {
        const role = await User.findById(req.user._id).select("role");

        if (role !== "administrator" || role !== "manajer") {
            return res.status(401).json({ error: "Unauthorized!" });
        }

        next();
    } catch (error) {
        console.log("Error in protectRole middleware", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default protectRole