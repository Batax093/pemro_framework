import Supplier from "../models/supplier-models.js";
import DSTmodels from "../models/dst-models.js";

export const approveDST = async (req, res) => {
    try {
        const { receiverid } = req.params;

        if (!receiverid) {
            return res.status(400).json({ error: "Receiver ID is required" });
        }

        const existingSupplier = await Supplier.findById(receiverid);

        if (!existingSupplier) {
            return res.status(404).json({ error: "Supplier not found!" });
        }

        if (!existingSupplier.profile.comodity || !existingSupplier.email) {
            return res.status(400).json({ error: "Supplier profile is incomplete: comodity and email are required." });
        }

        existingSupplier.isDST = true;
        await existingSupplier.save();

        const updateDST = await DSTmodels.findOneAndUpdate(
            { supplierid: receiverid },
            {
                status: "approved",
                approvedBy: req.user.fullName
            },
            { new: true } 
        );

        if (!updateDST) {
            return res.status(404).json({ error: "DST document not found!" });
        }

        res.status(201).json({ message: "DST approved successfully!", updateDST });

    } catch (error) {
        console.error("Error while approving DST:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getDST = async (req, res) => {
    try {
        const DST = await DSTmodels.find().select("companyName supplierid status approvedBy -_id")

        return res.status(201).json({ DST })
    } catch (error) {
        console.log("Error while getting DST: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}