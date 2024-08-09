import Supplier from "../models/supplier-models.js"
import User from "../models/user-models.js";
import DST from "../models/dst-models.js";
import { sendEmail } from "../utils/nodemailer.js"

export const registerSupplier = async (req, res) => {
    try {
        const { companyName, phone, address, comodity } = req.body
        const userid = req.user._id

        if(!userid){
            return res.status(401).json({ message: "User not found!"})
        }

        const existingUser = await User.findOne({ _id: userid, role: "umum" })

        if(!existingUser){
            return res.status(401).json({ message: "User not found! or already supplier!"})
        }

        if(existingUser.role === "manajer" || existingUser.role === "administrator"){
            return res.status(401),json({ message: "You are not allowed to register supplier!"})
        }

        existingUser.role = "supplier"
        await existingUser.save()

        const newSupplier = new Supplier({
            userid: existingUser._id,
            email: existingUser.email,
            profile: {
                supplierName: existingUser.fullName,
                companyName,
                phone,
                address,
                comodity
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
        const filteredSupplier = await Supplier.find().select("userid email profile isDST _id")
        
        return res.status(201).json({filteredSupplier})
    } catch (error) {
        console.log("Error while getting supplier: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const updateSupplier = async (req, res) => {
    try {
        const { receiverid } = req.params;
        const { companyName, phone, address, comodity } = req.body;

        if (!receiverid) {
            return res.status(401).json({ error: "Receiver ID is required!" });
        }

        const existingSupplier = await Supplier.findById(receiverid);

        if (!existingSupplier) {
            return res.status(401).json({ error: "Supplier not found!" });
        }

        const { supplierName } = await User.findOne({ _id: existingSupplier.userid }).select("fullName -_id");

        const updateFields = {};
        if (companyName) updateFields['profile.companyName'] = companyName;
        if (phone) updateFields['profile.phone'] = phone;
        if (address) updateFields['profile.address'] = address;
        if (comodity) updateFields['profile.comodity'] = comodity;

        const updatedSupplier = await Supplier.findOneAndUpdate(
            { _id: receiverid },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(401).json({ error: "Supplier not found!" });
        }

        const emailSubject = 'Announcement: Supplier Profile Updated'
        const emailText = 'Your supplier profile has been successfully updated.'

        const emailHtml = `
            <p>Dear ${supplierName || existingSupplier.profile.supplierName},</p>
            <p>Your supplier profile has been successfully updated with the following details:</p>
            <ul>
                ${supplierName ? `<li>Supplier Name: ${supplierName}</li>` : ''}
                ${companyName ? `<li>Company Name: ${companyName}</li>` : ''}
                ${phone ? `<li>Phone: ${phone}</li>` : ''}
                ${address ? `<li>Address: ${address}</li>` : ''}
                ${comodity ? `<li>Comodity: ${comodity}</li>` : ''}
            </ul>
            <p>Thank you,</p>
            <p>Kopi Kreatif</p>
        `;

        await sendEmail(existingSupplier.email, emailSubject, emailText, emailHtml);

        return res.status(201).json({ updatedSupplier });

    } catch (error) {
        console.error("Error while updating supplier:", error.message);
        return res.status(500).json({ error: error.message });
    }
}


export const applyforDST = async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ userid: req.user._id })

        if(!supplier){
            return res.status(401).json({ message: "Supplier not found!"})
        }

        if(supplier.isDST == true){
            return res.status(401).json({ message: "Supplier already applied for DST!"})
        }

        const newDST = await DST.create({
            companyName: supplier.profile.companyName,
            supplierid: supplier._id,
            status: 'Pending',
            approvedBy: null
        })

        return res.status(201).json({ newDST })
    } catch (error) {
        console.log("Error while applying for DST: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const detailSupplier = async (req, res) => {
    try {
        const { receiverid } = req.params;

        if (!receiverid) {
            return res.status(401).json({ error: "Receiver ID is required!" }); 
        }

        const selectedSupplier = await Supplier.findById(receiverid).select("profile isDST");

        if (!selectedSupplier) {
            return res.status(401).json({ error: "Supplier not found!" });
        }

        return res.status(201).json({ selectedSupplier });
    } catch (error) {
        console.log("Error while getting supplier: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}