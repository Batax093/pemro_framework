import { useState } from "react";
import toast from "react-hot-toast";

const usePostSupplier = () => {
    const [loading, setLoading] = useState(false);

    const registerSupplier = async (companyName, phone, address, comodity) => {
        const success = handleInputErrors(companyName, phone, address, comodity);
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/supplier/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyName, phone, address, comodity }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Supplier registered successfully!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, registerSupplier };
};

export default usePostSupplier;

function handleInputErrors(companyName, phone, address, comodity) {
    if (!companyName || !phone || !address || !comodity) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}
