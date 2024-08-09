/* eslint-disable react/prop-types */
import { useState } from "react";
import useGetSupplier from "../hooks/useGetSupplier";
import useUpdateSupplier from "../hooks/useUpdateSupplier";
import usePostDST from "../hooks/usePostDST";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../context/authContext";
import Footer from "../components/Footer";


function SupplierCard({ data, index, setShowModal, setShowUpdate }) {
  const { profile } = data
  const { authUser } = useAuthContext();

  const handleView = () => {
    setShowModal(index);
  };

  const handleUpdate = () => {
    setShowUpdate(index);
  };

  return (
    <>
       <section className="text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-5 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-cream-100 text-cream-500 flex-shrink-0">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                {profile.companyName}
              </h2>
              <p className="leading-relaxed text-base">
                {profile.email}
              </p>
              <button onClick={handleView} className="mt-3 text-xl text-cream-500 inline-flex items-center">
                View
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            { authUser.role === "administrator" && <button onClick={handleUpdate} className="flex mx-auto mt-25 text-white bg-cream-500 border-0 py-2 px-8 focus:outline-none hover:bg-cream-600 rounded text-lg">
              Edit
            </button>}
          </div>
        </div>
      </section>
    </>
  );
}
function SupplierModals({ data, setShowModal }) {
  const { registerDST } = usePostDST();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerDST(data.userid);
    setShowModal(NaN);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full px-40 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t w-full">
              <h3 className="text-3xl text-cream-500 font-semibold text-center w-full">
                {data.profile.companyName}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Supplier Name : {data.profile.supplierName}
              </p>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Supplier Phone : {data.profile.phone}
              </p>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Comodity : {data.profile.address}
              </p>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Supplier Email : {data.email}
              </p>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Address : {data.profile.comodity}
              </p>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Supplier DST Status : {data.isDST ? 'True' : 'False'}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="mr-2 bg-cream-50 hover:bg-cream-100 text-cream-500 font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => setShowModal(NaN)}
              >
                Close
              </button>
              <button
                className="bg-cream-300 hover:bg-cream-500 text-cream-50 font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleSubmit}
              >
                Daftar Supplier Tetap
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}


function UpdateModals({ data, setShowUpdate }) {
  const { updateSupplier } = useUpdateSupplier();

  const [inputs, setInputs] = useState({
    companyName: data.profile.companyName || "",
    phone: data.profile.phone || "",
    address: data.profile.address || "",
    comodity: data.profile.comodity || "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const updateData = {
        companyName: inputs.companyName,
        phone: inputs.phone,
        address: inputs.address,
        comodity: inputs.comodity,
    };
    await updateSupplier(data._id, updateData);
    // refres page
    window.location.reload();
    setShowUpdate(NaN);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[30%] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-cream-500 font-semibold text-center w-full">
                {data.profile.companyName}
              </h3>
            </div>
            {/*body*/}
            <div className="flex flex-col justify-items-center ml-3 mr-3 mt-3 space-y-2">
              <label htmlFor="supplierName" className="sr-only">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="px-10 py-5 mt-8 bg-cream-50 rounded-md max-md:pr-5"
                placeholder="Company Name"
                value={inputs.companyName}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, companyName: e.target.value }))
                }
              />
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                className="px-10 py-6 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
                placeholder="Phone"
                value={inputs.phone}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="px-10 pt-6 pb-24 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
                placeholder="Address"
                value={inputs.address}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, address: e.target.value }))
                }
              />
              <label htmlFor="email" className="sr-only">
                Comodity
              </label>
              <input
                type="text"
                id="comodity"
                className="px-10 py-6 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
                placeholder="Comodity"
                value={inputs.comodity}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, comodity: e.target.value }))
                }
              />
              <div></div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="mr-2 bg-cream-50 hover:bg-cream-100 text-cream-500 font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => setShowUpdate(NaN)}
              >
                Close
              </button>
              <button
                className="bg-cream-300 hover:bg-cream-500 text-cream-50 font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleClick}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

const Supplier = () => {
  const { suppliers } = useGetSupplier();
  const [showModal, setShowModal] = useState(NaN);
  const [showUpdate, setShowUpdate] = useState(NaN);

  return (
    <>
      {!isNaN(showModal) && <SupplierModals data={suppliers.filteredSupplier[showModal]} setShowModal={setShowModal} />}
      {!isNaN(showUpdate) && <UpdateModals data={suppliers.filteredSupplier[showUpdate]} setShowUpdate={setShowUpdate} />}
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-cream-500">Supplier</h1>
            <p className="mt-5 text-2xl font-light text-cream-300">Data supplier yang telah daftar</p>
          </header>
          <main className="mt-24 w-full max-md:mt-10">
            {Array.isArray(suppliers.filteredSupplier) && suppliers.filteredSupplier.length > 0 ? (
              suppliers.filteredSupplier.map((supplier, index) => (
                    <SupplierCard
                      key={index}
                      data={supplier}
                      index={index}
                      setShowModal={setShowModal}
                      setShowUpdate={setShowUpdate}
                    />
              ))
            ) : (
              <div className="text-center text-2xl font-light text-cream-300">
                Belum ada Supplier.
              </div>
            )}
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Supplier;
