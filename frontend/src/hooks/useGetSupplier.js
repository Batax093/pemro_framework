import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetSupplier = () => {
    const [loading, setLoading] = useState(false);
    const [suppliers, setSupplier] = useState([]);

    useEffect(() => {
      setLoading(true);
      try {
          fetch('http://localhost:3000/api/supplier/list')
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setSupplier(data.filteredSupplier);
              setLoading(false);
            });
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }, []);

    return { loading, suppliers };
};

export default useGetSupplier
