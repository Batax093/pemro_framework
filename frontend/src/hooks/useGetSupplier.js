import { useState } from "react";
import toast from "react-hot-toast";

const useGetSupplier = () => {
    const [ loading, setLoading ] = useState(false);

    const getSupplier = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/supplier", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, getSupplier };
}

export default useGetSupplier
