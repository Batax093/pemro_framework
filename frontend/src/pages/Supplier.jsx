/* eslint-disable react/prop-types */
import useLogout from "../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import useGetSupplier from "../hooks/useGetSupplier";
import useUpdateSupplier from "../hooks/useUpdateSupplier";

function Header() {
  const { logout } = useLogout(); 

  const handleLogout = () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmed) {
      logout();
    }
  };

  return (
    <header className="flex flex-col items-center pt-3.5 bg-white">
      <div className="flex flex-col self-stretch px-5 w-full max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full text-base font-black max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-0 text-cream-500">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a3a8837372790f6a0677ab4b14c0459c08ebdba3958ac0805e14f2d8625532d?apiKey=b1d7a673afae4361a48ecfd33debe811&'"
              className="shrink-0 aspect-square w-[70px]"
              alt="KopiIn Logo"
            />
            <div className="my-auto text-black">
              <span>KOPI<span className="text-cream-500">IN</span></span>
            </div>
          </div>
          <nav className="flex gap-5 justify-between my-auto text-black max-md:flex-wrap max-md:max-w-full">
            <Link to="/" className="nav-link hover:text-cream-500">HOME</Link>
            <Link to={"/supplier"} className="nav-link hover:text-cream-500">SUPPLIER</Link>
            <Link to="/announcement" className="nav-link hover:text-cream-500">ANNOUNCEMENT</Link>
            <BiLogOut className="text-3xl cursor-pointer nav-link hover:text-cream-500" onClick={handleLogout} />
          </nav>
        </div>
      </div>
    </header>
  );
}

function SupplierCard({ data, index, setShowModal, setShowUpdate }) {
  const { profile } = data

  const handleView = () => {
    setShowModal(index);
  };

  const handleUpdate = () => {
    setShowUpdate(index);
  };

  return (
    <section className="flex gap-5 mb-10 p-8 bg-cream-50 rounded-xl w-[1236px] max-md:flex-wrap max-md:pr-5">
      <div className="flex-auto max-md:max-w-full">
        <figure className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[45%] max-md:w-full">
            <img loading="lazy" src='https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=6aa320d50fc04f13ae8b58abb91612c7&' className="w-full aspect-[1.56] max-md:mt-4" alt={`${profile.company} logo`} />
          </div>
          <figcaption className="flex flex-col ml-5 w-[55%] text-center text-cream-500 max-md:w-full">
            <h2 className="text-4xl mt-7 tracking-widest font-bold">{profile.companyName}</h2>
            <p className="text-3xl mt-1.5 tracking-widest">{profile.email}</p>
          </figcaption>
        </figure>
      </div>
      <nav className="flex flex-col my-auto text-base font-black whitespace-nowrap text-cream-400">
        <button onClick={handleView} className="justify-center px-14 py-5 mb-6 rounded-xl bg-cream-500 text-cream-300 max-md:px-5" tabIndex="0">View</button>
        <button onClick={handleUpdate} className="justify-center px-16 py-5 rounded-xl bg-cream-500 text-cream-300 max-md:pr-6 max-md:pl-5" tabIndex="0">Edit</button>
      </nav>
    </section>
  );
}
function SupplierModals({data, setShowModal}) {
  return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl text-cream-500 font-semibold">
                    {data.profile.companyName}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(NaN)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
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
                    Supplier Address : {data.profile.address}
                  </p>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Supplier Email : {data.email}
                  </p>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Comodity : {data.profile.comodity}
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
                    onClick={() => setShowModal(NaN)}
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
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl text-cream-500 font-semibold">
                {data.profile.companyName}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowUpdate(NaN)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="flex flex-col justify-items-center ml-3 mr-3 mt-3 space-y-2">
              <label htmlFor="supplierName" className="sr-only">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="px-20 py-5 mt-8 bg-cream-50 rounded-md max-md:pr-5"
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
                className="px-20 py-6 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
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
                className="px-20 pt-6 pb-24 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
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
                className="px-20 py-6 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
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


function Supplier() {
  const { suppliers } = useGetSupplier();
  const [ showModal, setShowModal ] = useState(NaN);
  const [ showUpdate, setShowUpdate ] = useState(NaN);

  return (
    <>
    {!isNaN(showModal) && <SupplierModals data={suppliers.filteredSupplier[showModal]} setShowModal={setShowModal} />}
    {!isNaN(showUpdate) && <UpdateModals data={suppliers.filteredSupplier[showUpdate]} setShowUpdate={setShowUpdate} />}
    <Header />
    <div className="flex flex-col items-center pt-12 bg-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-cream-500">Supplier</h1>
        <p className="mt-5 text-2xl font-light text-cream-300">Data supplier yang telah daftar</p>
      </header>
      <main className="mt-24 w-full max-md:mt-10">
        {Array.isArray(suppliers.filteredSupplier) && suppliers.filteredSupplier.map((supplier, index) => (
          <SupplierCard
            key={index}
            data={supplier}
            index={index}
            setShowModal={setShowModal}
            setShowUpdate={setShowUpdate}
          />
        ))}
      </main>
      <footer className="flex gap-5 items-start self-stretch px-3 pt-7 pb-3.5 mt-14 w-full font-black bg-cream-300 text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-0 self-start text-xs">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 aspect-[0.93] w-[39px]" alt="Footer Logo" />
          <div className="my-auto">KOPI<span className="text-cream-500">IN</span></div>
        </div>
        <div className="flex-auto my-auto text-xs max-md:max-w-full">
          Made by <span className="text-cream-500">Love</span>
        </div>
    </footer>
    </div>
    </>
  );
}

export default Supplier;