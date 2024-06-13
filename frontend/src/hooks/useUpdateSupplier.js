import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateSupplier = () => {
  const [loading, setLoading] = useState(false);

  const updateSupplier = async (supplierId, updateData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/supplier/update/${supplierId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Supplier updated successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateSupplier };
};

export default useUpdateSupplier;
