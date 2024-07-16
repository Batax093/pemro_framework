import { useState } from "react";
import toast from "react-hot-toast";

const useApproveDST = () => {
    const [ loading, setLoading ] = useState(false);

    const approveDST = async (userid, updateData) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/dst/approve/${userid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({updateData}),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("DST approved successfully");
            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, approveDST };
};

export default useApproveDST