import React from 'react';
import PropTypes from 'prop-types';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useLogout from "../hooks/useLogout";

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
            <a href="#dst" className="nav-link hover:text-cream-500">SUPPLIER</a>
            <Link to="/about-us" className="nav-link hover:text-cream-500">ABOUT US</Link>
            <Link to="/announcement" className="nav-link hover:text-cream-500">ANNOUNCEMENT</Link>
            <BiLogOut className="text-3xl cursor-pointer nav-link hover:text-cream-500" onClick={handleLogout} />
          </nav>
        </div>
      </div>
    </header>
  );
}

function Info({ children }) {
    return (
        <main className="px-5 mt-8 w-full max-w-[1251px] mx-auto max-md:mt-10 max-md:max-w-full">
            <h1 className="self-center md-10 pb-10 text-6xl font-bold tracking-widest text-center text-black max-md:mt-10 max-md:max-w-full">
                KOPI<span className='text-cream-500'>IN</span>
            </h1>
            <div>
            <div className="flex flex-col items-center mt-8 p-12 font-black bg-cream-500 text-lg lg:text-2xl text-center text-black max-md:pr-5" style={{ letterSpacing: '2px', lineHeight: '2' }}>
                <p>
                    <span className="text-black p-2 rounded-lg">KOPI</span><span className='text-cream-100'>IN adalah destinasi utama bagi para pencinta kopi yang menginginkan pengalaman kopi yang otentik dan berkualitas. Sebagai toko kopi yang berdedikasi, kami menawarkan beragam biji kopi pilihan yang kami ambil langsung dari supplier-supplier ternama dan terpercaya. Dengan kehadiran di sembilan cabang yang tersebar luas, kami tidak hanya menawarkan kopi, tetapi juga menghadirkan sebuah komunitas tempat para pecinta kopi dapat berkumpul, berbagi cerita, dan mengeksplorasi ragam cita rasa kopi. Dengan fokus kami yang kuat pada kualitas, kami berkomitmen untuk memberikan pengalaman kopi yang tak terlupakan kepada setiap pelanggan kami.</span>
                </p>
            </div>

            </div>
            <h1 className="self-center mt-10 pb-10 text-3xl font-bold tracking-widest text-center text-black max-md:mt-10 max-md:max-w-full">
                KOPI<span className="text-cream-500 p-1 rounded">IN</span>: Temukan Aroma <span className="text-cream-500 p-1 rounded">Sejati</span> dalam Setiap <span className="text-cream-500 p-1 rounded">Tetes</span>
            </h1>
        </main>
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

Info.propTypes = {
    children: PropTypes.node,
};

Info.defaultProps = {
    children: null,
};

AboutUs.propTypes = {
    children: PropTypes.node,
};

AboutUs.defaultProps = {
    children: null,
};
function AboutUs() {
    return (
      <>
        <Header />
        <Info />
        <Footer />
      </>
    );
  }
  
  export default AboutUs;