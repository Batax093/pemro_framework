import PropTypes from 'prop-types';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import useLogout from "../hooks/useLogout";
import useGetAnnouncement from '../hooks/useGetAnnouncement';

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

  function SupplierStatus({ imageSrc, altText, companyName, status, statusBgColor }) {
    return (
        <article className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pt-11 w-full text-3xl tracking-widest text-center rounded-xl bg-cream-300 max-md:mt-10">
                <div className="bg-cream-300 flex justify-center p-4">
                    <img loading="lazy" src={imageSrc} alt={altText} className="self-center max-w-full aspect-[1.49] w-[269px]" />
                </div>
                <div className="mt-6 font-bold text-2xl text-cream-500 text-center">{companyName}</div>
                <div className={`justify-center px-11 py-5 mt-7 font-bold text-center text-cream-300 ${statusBgColor} rounded-b-lg`}>
                    {status}
                </div>
            </div>
        </article>
    );
}

SupplierStatus.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    statusBgColor: PropTypes.string.isRequired,
};

function StatusSection() {
    const { loading, suppliers } = useGetAnnouncement();

    console.log("Suppliers:", suppliers);  // Logging

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex justify-center mt-20 w-full max-md:mt-10">
                    <div className="flex justify-between w-full max-w-[90%]">
                        {suppliers?.map((supplier, index) => (
                            <SupplierStatus
                                key={index}
                                imageSrc={supplier.imageSrc}
                                altText={supplier.altText}
                                companyName={supplier.companyName}
                                status={supplier.status}
                                statusBgColor={supplier.statusBgColor}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
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
  
  function Announcement() {
    return (
        <>
        <Header />
        <StatusSection />
        <Footer />
      </>
    );
  }
  
  export default Announcement;