import { useAuthContext } from '../context/authContext';
import useLogout from "../hooks/useLogout";
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom';


function Navbar() {
  const { logout } = useLogout(); 
  const { authUser }  = useAuthContext();

  const handleLogout = () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmed) {
      logout();
    }
  };

  return (
    <div className="flex flex-col items-center pt-3.5 bg-white">
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
              <span className="text-cream-500 p-5">Hello, {authUser.fullName}</span>
            </div>
            
          </div>
          
          <nav className="flex gap-5 justify-between my-auto text-black max-md:flex-wrap max-md:max-w-full">
            <Link to="/" className="nav-link hover:text-cream-500">HOME</Link>
            <Link to={"/supplier"} className="nav-link hover:text-cream-500">SUPPLIER</Link>
            <Link to="/announcement" className="nav-link hover:text-cream-500">ANNOUNCEMENT</Link>
            {authUser.role !== "supplier" && authUser.role !== "umum" && <Link to="/approve" className="nav-link hover:text-cream-500">APPROVE DST</Link>}
            <BiLogOut className="text-3xl cursor-pointer nav-link hover:text-cream-500" onClick={handleLogout} />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar