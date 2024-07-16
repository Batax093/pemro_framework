/* eslint-disable react/prop-types */
import useGetDST from "../hooks/useGetDST";
import useApproveDST from "../hooks/useApproveDST";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

function ApproveDSTCard({ data }) {
    const { profile } = data;
    const { loading, approveDST } = useApproveDST();
  
    const handleApprove = async () => {
      const confirmed = window.confirm(`Daftarkan ${data.companyName} menjadi Supplier Tetap?`);
      if (confirmed) {
        try {
          await approveDST(data.supplierid, data);
          toast.success(`${data.companyName} berhasil menjadi Supplier Tetap`);
        } catch (error) {
          toast.error(`Gagal untuk mendaftarkan ${data.companyName} menjadi Supplier Tetap: ${error.message}`);
        }
      }
    };
  
    return (
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5232c79d7362828f1fee16a95faaa227f83d273c37f55e500adf2494fd68166?apiKey=b1d7a673afae4361a48ecfd33debe811&"
          alt={`${profile?.company || "Company"} logo`}
          className="grow shrink-0 mt-28 max-w-full aspect-[0.85] w-[188px] max-md:mt-10"
        />
        <div className="flex-grow bg-cream-50 p-4 rounded-lg shadow-md mt-10">
          <h2 className="text-gray-900 text-lg font-medium my-3">{data.companyName}</h2>
          <p className="leading-relaxed text-base mb-4">{data.email}</p>
          <button
            onClick={handleApprove}
            className="mt-3 text-white bg-cream-500 hover:bg-cream-600 focus:outline-none focus:ring-2 focus:ring-cream-500 focus:ring-opacity-50 rounded-lg px-4 py-2 inline-flex items-center"
          >
            {loading ? "Approving..." : "Approve"}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  }
  

function ApproveDST() {
  const { dst } = useGetDST();

  if (!dst) {
    return <div>Loading...</div>;
  }

  if (!dst.DST || dst.DST.length === 0) {
    return <p className="text-center text-gray-500">Daftar Supplier Tetap Kosong.</p>;
  }

  const filteredDST = dst.DST.filter(DST => DST.status !== 'approved');

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Daftar Supplier Tetap</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">Data Ajuan Supplier Tetap</p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-cream-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {filteredDST.map((DST, index) => (
              <ApproveDSTCard key={index} data={DST} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ApproveDST;
