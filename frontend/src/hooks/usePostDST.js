import { useState } from "react";
import toast from "react-hot-toast";

const usePostDST = () => {
    const [loading, setLoading] = useState(false);

    const registerDST = async (userid) => {
        setLoading(true);
        try {
            const res = await fetch("/api/supplier/permanent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("DST registered is pending!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, registerDST };
};  

export default usePostDST;