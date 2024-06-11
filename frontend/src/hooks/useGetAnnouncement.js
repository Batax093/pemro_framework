import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetAnnouncement = () => {
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        setLoading(true);
        try {
            fetch('http://localhost:3000/api/announcement/list')
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                setSuppliers(data.suppliers);
                setLoading(false);
              });
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      }, []);

    return { loading, suppliers };
};

export default useGetAnnouncement;
