import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateSupplier = () => {
    const [ loading, setLoading ] = useState(false);

    const updateSupplier = async (receiverid, companyName, comodity, phone, address) => {
        const success = handleInputErrors(companyName, comodity, phone, address);
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/supplier/update/${receiverid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                params: JSON.stringify({ receiverid }),
                body: JSON.stringify({ receiverid, companyName, comodity, phone, address }),
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

function handleInputErrors(companyName, comodity, phone, address) {
    if (!companyName || !comodity || !phone || !address) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}