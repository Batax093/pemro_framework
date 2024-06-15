import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAnnouncement = () => {
    const [ loading, setLoading ] = useState(false);
    const [ announcements, setAnnouncements ] = useState([]);
    
    useEffect(() => {
        const getAnnouncement = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/announcement/list", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }  
    
                setAnnouncements(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getAnnouncement()
    }, [])

    return { loading, announcements };
}

export default useGetAnnouncement