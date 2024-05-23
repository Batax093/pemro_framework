import Supplier from "../models/supplier-models.js"
import User from "../models/user-models.js";

export const registerSupplier = async (req, res) => {
    try {
        const { companyName, phone, address } = req.body
        const userid = req.user._id

        if(!userid){
            return res.status(401).json({ message: "User not found!"})
        }

        const existingUser = await User.findOne({ _id: userid, role: "umum" })

        if(!existingUser){
            return res.status(401).json({ message: "User not found! or already supplier!"})
        }

        existingUser.role = "supplier"
        await existingUser.save()

        const newSupplier = new Supplier({
            userid: existingUser._id,
            profile: {
                companyName,
                phone,
                address
            }
        })

        await newSupplier.save()

        res.status(201).json({ message: "Supplier registered successfully!"})
    } catch (error) {
        console.log("Error while signing up", error.message)
        return res.status(500).json({ error: "Internal Server Error!"})
    }
}