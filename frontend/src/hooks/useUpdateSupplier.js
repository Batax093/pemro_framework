import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateSupplier = () => {
    const [ loading, setLoading ] = useState(false);

    const updateSupplier = async (userid, companyName, phone, address) => {
        const success = handleInputErrors(companyName, phone, address);
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/supplier/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid, companyName, phone, address }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, updateSupplier };
}

export default useUpdateSupplier;

function handleInputErrors(companyName, phone, address) {
    if (!companyName || !phone || !address) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}