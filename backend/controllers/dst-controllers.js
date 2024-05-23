import User from "../models/user-models.js";
import Supplier from "../models/supplier-models.js";
import DST from "../models/dst-models.js";

export const approveDST = async (req, res) => {
    try {
        const { supplierid } = req.body

        const existingSupplier = await Supplier.findOne({ _id: supplierid })

        if(!existingSupplier){
            return res.status(404).json({ error: "Supplier not found!"})
        }

        existingSupplier.isDST = true
        await existingSupplier.save()

        res.status(201).json({ message: "DST approved successfully!"})

    } catch (error) {
        console.log("Error while approving DST: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}