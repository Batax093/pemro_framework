import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import useLogout from "../hooks/useLogout";
import toast from "react-hot-toast";
import useGetSupplier from '../hooks/useGetSupplier';
import useUpdateSupplier from '../hooks/useUpdateSupplier';
import postDST from '../hooks/usePostDST';
import useApproveDST from '../hooks/useApproveDST';

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
              <Link to="/supplier" className="nav-link hover:text-cream-500">SUPPLIER</Link>
              <Link to="/announcement" className="nav-link hover:text-cream-500">ANNOUNCEMENT</Link>
              <BiLogOut className="text-3xl cursor-pointer nav-link hover:text-cream-500" onClick={handleLogout} />
            </nav>
          </div>
        </div>
      </header>
    );
  }

  function MyComponent() {
  
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [popupType, setPopupType] = useState("");
    const { loading, suppliers } = useGetSupplier();
    const navigate = useNavigate();
  
    const handleUpdateClick = (supplier) => {
      setCurrentSupplier(supplier);
      setPopupType("update");
      setPopupVisible(true);
    };
  
    const handleViewClick = (supplier) => {
      setCurrentSupplier(supplier);
      setPopupType("view");
      setPopupVisible(true);
    };
  
    const handleClosePopup = () => {
      setPopupVisible(false);
      setCurrentSupplier(null);
      setPopupType("");
    };

    const userDetails = JSON.parse(localStorage.getItem("authUser"));
    console.log(userDetails);

    const SupplierItem = ({ name, type, onView, onUpdate }) => (
      <div className="flex gap-5 items-center mt-3.5 max-w-full bg-cream-100 rounded-3xl w-[1211px] max-md:flex-wrap max-md:pl-5">
        <div className="flex-auto self-stretch my-auto text-2xl font-bold tracking-tighter text-cream-500">
          {name}
        </div>
        <div className="flex-auto self-stretch my-auto text-lg font-medium tracking-tight text-center text-cream-500">
          {type}
        </div>
        <div className="flex gap-0 self-stretch text-lg font-black tracking-tight text-center whitespace-nowrap">
          <div
            className={"justify-center px-9 py-10 bg-cream-300 text-cream-500 max-md:px-5" + (userDetails.role != 'manajer' ? " rounded-r-3xl" : "")}
            role="button"
            tabIndex={0}
            onClick={onView}
          >
            View
          </div>
          <div
            className="justify-center px-10 py-10 text-cream-300 rounded-r-3xl bg-cream-500 max-md:px-5"
            role="button"
            tabIndex={0}
            onClick={onUpdate}
            hidden={userDetails.role != 'manajer' && userDetails.role != 'administrator'}
          >
            Update
          </div>
        </div>
      </div>
    );
  
    const SupplierPopup = ({ supplier, type, onClose }) => {
      const [formData, setFormData] = useState({
        id: supplier._id,
        name: supplier.profile.companyName,
        type: supplier.profile.comodity,
        address: supplier.profile.address,
        phone: supplier.profile.phone
      });
  
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
  
      const { loading, updateSupplier } = useUpdateSupplier();
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await updateSupplier(formData.id, formData.name, formData.type, formData.phone, formData.address);
          toast.success("Supplier updated successfully");
        } catch (error) {
          toast.error("Failed to update supplier");
        }
        onClose();
      };
  
      const handleApproveDST = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/dst/approve/' + supplier._id + '', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ supplierId: supplier._id })
            });

            if (!response.ok) {
                throw new Error('Failed to approve DST request');
            }

            toast.success("DST request approved successfully");
        } catch (error) {
            toast.error("Failed to approve DST request");
        }
        onClose();
    };

    const handleSubmitDSTInView = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/dst/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ supplierId: supplier._id })
            });

            if (!response.ok) {
                throw new Error('Failed to submit DST request');
            }

            const result = await response.json();
            toast.success("DST request submitted successfully");

            // Redirect to the announcement page
            navigate('/announcements');
        } catch (error) {
            toast.error("Failed to submit DST request");
        }
        onClose();
    };
  
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 w-[500px] rounded-xl">
            <h2 className="text-xl font-bold mb-7">{type === "view" ? "View Supplier" : "Update Supplier"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-cream-500">Nama Perusahaan</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={type === "view"}
                  className="mt-1 block w-full h-[40px] text-center rounded-md border-cream-500 border shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-cream-500">Nama Commodity</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  disabled={type === "view"}
                  className="mt-1 block w-full h-[40px] text-center rounded-md border-cream-500 border shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-cream-500">Alamat</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={type === "view"}
                  className="mt-1 block w-full h-[40px] text-center rounded-md border-cream-500 border shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-cream-500">No Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={type === "view"}
                  className="mt-1 block w-full h-[40px] text-center rounded-md border-cream-500 border shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                {type === "update" ? (
                  <>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mr-2 bg-cream-50 hover:bg-cream-100 text-cream-500 font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-cream-300 hover:bg-cream-500 text-cream-50 font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleApproveDST}
                      className="ml-2 bg-cream-300 hover:bg-cream-500 text-cream-50 font-bold py-2 px-4 rounded"
                    >
                      Approve Be DST
                    </button>
                  </>
                ) : (
                  <>
                    {type === "view" && (
                      <button
                        type="button"
                        onClick={handleSubmitDSTInView}
                        className="mr-2 bg-cream-50 hover:bg-cream-100 text-cream-500 font-bold py-2 px-4 rounded"
                        hidden={userDetails.role != 'umum' && userDetails.role != 'supplier'}
                      >
                        Submit Be DST
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-cream-300 hover:bg-cream-500 text-cream-50 font-bold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      );
    };
  
    return (
      <div className="flex flex-col items-center pt-3.5 bg-white">
        <main>
          <section>
            <h1 className="mt-11 text-4xl font-bold tracking-widest text-center text-cream-500 max-md:mt-10">Supplier Kopiin</h1>
            <h2 className="mt-4 mb-10 text-2xl font-light tracking-wide text-center text-cream-300">Daftar Supplier Kopiin</h2>
            {suppliers.map((supplier, index) => (
              <SupplierItem
                key={index}
                name={supplier.profile.companyName}
                type={supplier.profile.comodity}
                onView={() => handleViewClick(supplier)}
                onUpdate={() => handleUpdateClick(supplier)}
              />
            ))}
          </section>
        </main>
        {isPopupVisible && currentSupplier && (
          <SupplierPopup supplier={currentSupplier} type={popupType} onClose={handleClosePopup} />
        )}
      </div>
    );
  }

  function Footer() {
    return (
      <footer className="flex gap-5 items-start self-stretch px-3 pt-7 pb-3.5 mt-14 w-full font-black bg-cream-300 text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-0 self-start text-xs">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 aspect-[0.93] w-[39px]" alt="Footer Logo" />
          <div className="my-auto">KOPI<span className="text-cream-500">IN</span></div>
        </div>
        <div className="flex-auto my-auto text-xs max-md:max-w-full">
          Made by <span className="text-cream-500">Love</span>
        </div>
      </footer>
    );
  }

  function Supplier() {
    return (
        <>
        <Header />
        <MyComponent />
        <Footer />
      </>
    );
  }
  
  export default Supplier;