import Supplier from "../models/supplier-models.js"
import User from "../models/user-models.js";
import DST from "../models/dst-models.js";

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
                supplierName: existingUser.fullName,
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

export const getSupplier = async (req, res) => {
    try {
        const filteredSupplier = await Supplier.find().select("profile isDST -_id")
        
        return res.status(201).json({filteredSupplier})
    } catch (error) {
        console.log("Error while getting supplier: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const updateSupplier = async (req, res) => {
    try {
        const userid = req.user._id
        const { companyName, phone, address } = req?.body

        const updateSupplier = await Supplier.findOneAndUpdate({ userid }, {
            profile: {
                companyName,
                phone,
                address
            }
        })

        if(updateSupplier){
            return res.status(201).json(updateSupplier)
        } else {
            return res.status(401).json({ error: "Supplier not found!"})
        }

    } catch (error) {
        console.log("Error while updating supplier: ", error.message)
        return res.status(500).json({ error: error.message })
    }
}

export const applyforDST = async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ userid: req.user._id })

        if(supplier.isDST == true){
            return res.status(401).json({ message: "Supplier already applied for DST!"})
        }

        const newDST = await DST.create({
            supplierid: supplier._id,
            status: "pending",
            approvedBy: null
        })

        return res.status(201).json({ newDST })
    } catch (error) {
        console.log("Error while applying for DST: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}