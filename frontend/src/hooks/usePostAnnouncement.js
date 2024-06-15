import { useState } from "react";
import toast from "react-hot-toast";

const usePostAnnouncement = () => {
    const [ loading, setLoading ] = useState(false);
    
    const postAnnouncement = async (title, content) => {
        const success = handleInputErrors(title, content);
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/announcement/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Announcement posted successfully!");
            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, postAnnouncement };
}

export default usePostAnnouncement

function handleInputErrors(title, content) {
    if (!title || !content) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}