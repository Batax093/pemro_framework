import { useState } from "react";
import toast from "react-hot-toast";

const useApproveDST = () => {
    const [ loading, setLoading ] = useState(false);

    const approveDST = async (userid) => {
        setLoading(true);
        try {
            const res = await fetch("/api/dst/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid }),
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
    };

    return { loading, approveDST };
};

export default useApproveDST