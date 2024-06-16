import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetDST = () => {
    const [ loading, setLoading ] = useState(false);
    const [ dst, setdst ] = useState([]);

    useEffect(() => {
        const getDST = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/dst/list", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
    
                setdst(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getDST();
    }, [])

    return { loading, dst };
}

// const useGetDST = () => {
//     const [loading, setLoading] = useState(false);
//     const [dst, setDst] = useState([]);

//     console.log("dst", dst);

//     const dsttest = async () => {
//         console.log("dsttest")
//     };

//     dsttest();
// const useGetDST = () => {
//     const [ loading, setLoading ] = useState(false);
//     const [ dst, setdst ] = useState([]);

//     useEffect(() => {
//         const getDST = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch("/api/dst/list", {
//                     method: "GET",
//                     headers: { "Content-Type": "application/json" },
//                 });
//                 const data = await res.json();
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }

//                 console.log("Fetched DST data:", data); // Debug log
//                 setDst(data.DST);
//                 setdst(data);

//             } catch (error) {
//                 toast.error(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getDST();

//     }, []);

//     return { loading, dst };
// };
export default useGetDST