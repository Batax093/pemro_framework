import { useState } from "react";
import toast from "react-hot-toast";

const useGetAnnouncement = () => {
    const [ loading, setLoading ] = useState(false);

    const getAnnouncement = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/announcement", {
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

    return { loading, getAnnouncement };
}

export default useGetAnnouncement
