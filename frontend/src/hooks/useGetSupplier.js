import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSupplier = () => {
    const [ loading, setLoading ] = useState(false);
    const [ suppliers, setSuppliers ] = useState([]);

    useEffect(() => {
      const getSupplier = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/supplier/list", {
                method: "GET",
            })
            const data = await res.json();
            if (data.error) {
              throw new Error(data.error);
            }
            setSuppliers(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
      }

      getSupplier();
    }, []);

    return { loading, suppliers };
}

export default useGetSupplier