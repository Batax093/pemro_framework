/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import useLogout from "../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import usePostSupplier from "../hooks/usePostSupplier.js";
import { useAuthContext } from '../context/authContext.jsx';
import Footer from '../components/Footer.jsx';

function Header() {
  const { logout } = useLogout(); 
  const { authUser }  = useAuthContext();

  const handleLogout = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        const confirmed = window.confirm("Apakah Anda yakin ingin logout?");
        if (confirmed) {
          logout().then(resolve).catch(reject);
        } else {
          reject();
        }
      }),
      {
        loading: 'Logging out...',
        success: 'You have been logged out successfully!',
        error: 'Logout failed. Please try again.',
      }
    );
  };

  const images = [
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3297cc1a9b58dbb8ea3098787c21c15aafa750adafdd7e0caf2833e16d03b9d3?apiKey=6aa320d50fc04f13ae8b58abb91612c7&',
      alt: 'First slide',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dce69fca3aa9dc93357cb7177f5e384e63c7a2148ecdb061822de3ea9ea6b9aa?apiKey=6aa320d50fc04f13ae8b58abb91612c7&',
      alt: 'Second slide',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/591b80c0b4afc7e5cb3626d79b2d1f8fe65ae4e2845ad9050dc95e55bd388b8e?apiKey=6aa320d50fc04f13ae8b58abb91612c7&',
      alt: 'Third slide',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/84200a04b1aa23b15c5c87029bf5745cfd9ae2e8cfa472b50e3dce238ba59407?apiKey=6aa320d50fc04f13ae8b58abb91612c7&',
      alt: 'Fourth slide',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f2ea24a99d8842b5e54a638c9dd62eb0e87671880c0e29a905f27f01cdaaf33a?apiKey=6aa320d50fc04f13ae8b58abb91612c7&',
      alt: 'Fifth slide',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6854747051a17a4c5a86e045bd3a76694a4be95ef8cf403e73b83f44d8f21328?apiKey=6aa320d50fc04f13ae8b58abb91612c7&',
      alt: 'Sixth slide',
    }
  ];
  
    const [activeIndex, setActiveIndex] = useState(0);
  
    const prevSlide = () => {
      const prevIndex = (activeIndex === 0 ? images.length - 1 : activeIndex - 1);
      setActiveIndex(prevIndex);
    };
  
    const nextSlide = () => {
      const nextIndex = (activeIndex + 1) % images.length;
      setActiveIndex(nextIndex);
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
              <span className="text-cream-500 p-5">Hello, {authUser.fullName}</span>
            </div>
          </div>
          <nav className="flex gap-5 justify-between my-auto text-black max-md:flex-wrap max-md:max-w-full">
            <Link to={"/"} className="nav-link hover:text-cream-500">HOME</Link>
            <Link to="/supplier" className="nav-link hover:text-cream-500">SUPPLIER</Link>
            <Link to="/announcement" className="nav-link hover:text-cream-500">ANNOUNCEMENT</Link>
            {authUser.role === "administrator" && <Link to="/approve" className="nav-link hover:text-cream-500">APPROVE DST</Link>}
            <BiLogOut className="text-3xl cursor-pointer nav-link hover:text-cream-500" onClick={handleLogout} />
          </nav>
        </div>
        <div id="carouselExampleControls" className="relative w-full max-w-lg mx-auto mt-5 carousel">
          <div className="carousel-inner flex overflow-hidden relative h-64">
            {images.map((image, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'block' : 'hidden'} w-full flex-shrink-0`}>
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev absolute top-1/2 left-0 transform -translate-y-1/2 -ml-10 bg-cream-300 bg-opacity-50 text-cream-500 font-extrabold p-2 cursor-pointer rounded-full"
            role="button"
            onClick={prevSlide}
          >
            <span className="text-xl">&lt;</span>
          </a>
          <a
            className="carousel-control-next absolute top-1/2 right-0 transform -translate-y-1/2 -mr-10 bg-cream-300 bg-opacity-50 text-cream-500 font-extrabold p-2 cursor-pointer rounded-full"
            role="button"
            onClick={nextSlide}
          >
            <span className="text-xl">&gt;</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function CatalogueSection() {
  const coffee = "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&"
  const coffeeTypes = [
    { 
      id: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&", 
      title: "Arabika", 
      suppliers: ["UD Kelapa Jaya", "PT. Surya Agro Mandiri", "PT. Hinoka Alsindo", "CV. Freysea Indo Citra", "CV. Sundanika Indonesia"]
    },
    { 
      id: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&", 
      title: "Robusta", 
      suppliers: ["UD Kelapa Jaya", "PT. Surya Agro Mandiri", "CV. Freysea Indo Citra", "CV. Sundanika Indonesia", "Star Laboratories"]
    },
    { 
      id: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&", 
      title: "Liberica", 
      suppliers: ["UD Kelapa Jaya", "PT. Hinoka Alsindo", "CV. Freysea Indo Citra", "CV. Sundanika Indonesia", "Star Laboratories"]
    },
    { 
      id: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&", 
      title: "Excelsa", 
      suppliers: ["PT. Surya Agro Mandiri", "PT. Hinoka Alsindo", "PT. Lukman Jaya Haramain"]
    },
    { 
      id: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&", 
      title: "Gayo", 
      suppliers: ["PT. Surya Agro Mandiri", "CV. Freysea Indo Citra", "CV. Sundanika Indonesia"]
    },
    { 
      id: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&", 
      title: "Kolombia", 
      suppliers: ["PT. Surya Agro Mandiri", "PT. Hinoka Alsindo", "CV. Freysea Indo Citra", "PT. Lukman Jaya Haramain"]
    },
  ];

  const [popupInfo, setPopupInfo] = useState(null);

  const openPopup = (coffee) => {
    setPopupInfo(coffee);
  };

  const closePopup = () => {
    setPopupInfo(null);
  };

  return (
    <main className="px-5 mt-14 w-full max-w-[1251px] mx-auto max-md:mt-10 max-md:max-w-full">
      <h1 className="self-center mt-26 text-4xl font-bold tracking-widest text-center text-cream-500 max-md:mt-10 max-md:max-w-full">
        Catalogue Coffee Bean
      </h1>
      <p className="self-center mt-3.5 text-2xl font-light tracking-wide text-center text-cream-300 max-md:max-w-full">
        Biji Kopi Pilihan Untuk Penikmat Kopi Sejati
      </p>
      <div className="grid grid-cols-3 gap-4 mt-14">
        {coffeeTypes.map((coffee) => (
          <section key={coffee.id} className="flex flex-col">
            <div className="flex flex-col grow px-12 pt-2 pb-5 w-full text-2xl font-extrabold tracking-tight text-center whitespace-nowrap rounded-md shadow-sm bg-cream-500 text-cream-300 max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                src={coffee.id}
                className="w-full aspect-[1.49]"
                alt={`${coffee.title} beans`}
                onClick={() => openPopup(coffee)}
              />
              <div className="self-center mt-1.5">{coffee.title}</div>
            </div>
          </section>
        ))}
      </div>
      {popupInfo && (
        <div className="fixed top-0 left-0 w-full h-full text-xl bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-4xl font-bold mb-4">Suppliers:</h2>
            <ul>
              {popupInfo.suppliers.map((supplier, index) => (
                <li key={index}>{supplier}</li>
              ))}
            </ul>
            <button onClick={closePopup} className="text-cream-500 font-semibold bg-transparent border border-cream-500 rounded-md mt-5 px-4 py-2 hover:bg-cream-500 hover:text-white transition duration-300">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}



function OutletsSection() {
  const outlet = "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&"
  const outlets = [
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Rungkut", address: "Jl. Rungkut Mapan Blok CA No. 5, Rungkut, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/d7f3b763fcb1abe963107caebd110e1704ae6247feca195806b2107b915d9533?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Mulyerejo", address: "Jl. Mulyerejo Harapan Blok F No. 99, Mulyerejo, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/730e203b61bd1db9e5051e1028b91e208ec1ea42052922b799e78d3642676f08?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Keputih", address: "Jl. Keputih Raya No. 5, Keputih, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b7d1e904b96a33275a8c4fbfefd14680e6f2745f5e556b8d18a563ac1ccb773?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Wiyung", address: "Jl. Wiyung No. 65, Wiyung, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c1638277baa38aaddfe055b9e8fef01f9321bd6729ce45d35b598827e25c2a2?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Tunjungan", address: "Jl. Tunjungan No. 1, Tunjungan, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca6adad788c2f3bda2200154dad740309e03342369056729aac8873f004657fc?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Gubeng", address: "Jl. Gubeng No. 10, Gubeng, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/483074c78dbfe13d0fec747707c5afad7ff48fa5d2951d66873c2a4c7bb49c46?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Kertajaya", address: "Jl. Kertajaya No. 89, Kertajaya, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/7d4c1ff0dd1dcfec196de5d443a19da326c5f5b0a3754460784f0dd5aadc3a0c?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Merr", address: "Jl. Merr No. 11, Merr, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/014fba11e4d4a647b04b2c8df9cc784a82d39b02bf479716e26e96153a3df158?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
    { id: "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&", name: "Kopiin Cab. Gayungan", address: "Jl. Gayungan No. 10, Gayungan, Surabaya", imagePopup: "https://cdn.builder.io/api/v1/image/assets/TEMP/163675f3adcf484877f52a46797458a93e19269913285d3b9f40bf751e1a2d00?apiKey=6aa320d50fc04f13ae8b58abb91612c7&" },
  ];

  const [popupInfo, setPopupInfo] = useState(null);

  const openPopup = (outlet) => {
    setPopupInfo(outlet);
  };

  const closePopup = () => {
    setPopupInfo(null);
  };

  return (
    <section className="px-5 mt-14 w-full max-w-[1363px] mx-auto max-md:mt-10 max-md:max-w-full">
      <h2 className="mt-36 text-4xl font-bold tracking-widest text-center text-cream-500 max-md:mt-10">Our Outlets</h2>
      <p className="mt-3.5 text-2xl font-light tracking-wide text-center text-cream-300 max-md:max-w-full">
        Temukan Toko Terdekat Dari Tempat Anda
      </p>
      <div className="flex flex-wrap gap-5 mt-14 justify-center">
        {outlets.map((outlet) => (
          <article key={outlet.id} className="flex flex-col w-[30%] bg-cream-50 rounded-xl border border-solid shadow-sm border-stone-500 p-4 max-md:w-full" onClick={() => openPopup(outlet)}>
            <div className="flex flex-1 justify-between items-center">
              <div className="text-2xl font-medium tracking-tight text-cream-500">{outlet.name}</div>
              <div className="w-16 h-16 bg-cream-500 flex items-center justify-center">
                <img loading="lazy" src={outlet.id} className="w-8 h-8" alt="" />
              </div>
            </div>
          </article>
        ))}
      </div>
      {popupInfo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-4xl font-bold mb-4">Outlet Address:</h2>
            <p className="text-lg">{popupInfo.address}</p>
            <div className="mt-4">
              <img loading="lazy" src={popupInfo.imagePopup} className="w-full" alt="" />
            </div>
            <button onClick={closePopup} className="text-cream-500 font-semibold bg-transparent border border-cream-500 rounded-md mt-5 px-4 py-2 hover:bg-cream-500 hover:text-white transition duration-300">Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

const JoinSection = () => {
  const { loading, registerSupplier } = usePostSupplier();
  const [ companyName, setCompanyName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ comodity, setComodity ] = useState('');
  const [ address, setAddress ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerSupplier(companyName, phone, comodity, address);
  }

  return (
    <section className="mt-32 w-full max-w-[1255px] max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-row max-md:flex-col max-md:gap-0">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/eabfc0bbbe4cf88694643a382d96f226eb10b223d21b157258613c1ce72d045d?apiKey=b1d7a673afae4361a48ecfd33debe811&"
          className="w-2/3 aspect-[1.2] max-md:mt-10 max-md:max-w-full"
          alt="Join"
        />
        <aside className="flex flex-col ml-5 w-1/3 max-md:ml-0 max-md:w-full">
          <p className="text-base text-cream-500 max-md:mt-10">
            <span className="text-3xl font-light tracking-wide text-center">
              Nikmati berbagai keuntungan dan kemudahan dalam berbisnis
            </span>
            <br />
            <br />
            <span className="text-3xl font-bold tracking-widest text-center">
              Mari bergabung dan menjadi bagian dari
              <br />
              <div className="my-auto text-black text-4xl">
                <span>KOPI<span className="text-cream-500">IN</span></span>
            </div>
            </span>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col justify-items-center mt-3 space-y-2">
            <label htmlFor="companyName" className="sr-only">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="px-20 py-5 mt-8 bg-cream-50 rounded-md max-md:pr-5"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="px-20 py-6 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input 
              type="text" 
              id="comodity"
              className="px-20 py-6 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5]"
              placeholder="Comodity"
              value={comodity}
              onChange={(e) => setComodity(e.target.value)}
            />
            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <input
              id="address"
              className="px-20 pt-6 pb-24 mt-3.5 whitespace-nowrap bg-cream-50 rounded-md max-md:pr-5"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div>
              <button
                disabled={loading}
                type="submit"
                className="justify-center self-center px-8 py-3 mt-7 font-black whitespace-nowrap rounded-md bg-cream-500 text-cream-300 max-md:px-5"
              >
                {loading ? <span className="loading-spinner"></span> : 'Register'}
              </button>
            </div>
          </form>
        </aside>
      </div>
    </section>
  );
}

function Info({ children }) {
  return (
      <main className="px-5 mt-14 w-full max-w-[1251px] mx-auto max-md:mt-10 max-md:max-w-full">
          <h1 className="self-center mt-20 pb-6 text-4xl font-bold tracking-widest text-center text-black max-md:mt-10 max-md:max-w-full">
              KOPI<span className='text-cream-500'>IN</span>
          </h1>
          <div>
          <div className="flex flex-col items-center p-6 font-black bg-cream-500 text-lg lg:text-base text-center text-black max-md:pr-5" style={{ letterSpacing: '1px', lineHeight: '2' }}>
              <p>
                  <span className="text-black p-2 rounded-lg">KOPI</span><span className='text-cream-100'>IN adalah destinasi utama bagi para pencinta kopi yang menginginkan pengalaman kopi yang otentik dan berkualitas. Sebagai toko kopi yang berdedikasi, kami menawarkan beragam biji kopi pilihan yang kami ambil langsung dari supplier-supplier ternama dan terpercaya. Dengan kehadiran di sembilan cabang yang tersebar luas, kami tidak hanya menawarkan kopi, tetapi juga menghadirkan sebuah komunitas tempat para pecinta kopi dapat berkumpul, berbagi cerita, dan mengeksplorasi ragam cita rasa kopi. Dengan fokus kami yang kuat pada kualitas, kami berkomitmen untuk memberikan pengalaman kopi yang tak terlupakan kepada setiap pelanggan kami.</span>
              </p>
          </div>

          </div>
          <h1 className="self-center mt-10 text-lg font-bold tracking-widest text-center text-black max-md:mt-10 max-md:max-w-full">
              KOPI<span className="text-cream-500 p-1 rounded">IN</span>: Temukan Aroma <span className="text-cream-500 p-1 rounded">Sejati</span> dalam Setiap <span className="text-cream-500 p-1 rounded">Tetes</span>
          </h1>
      </main>
  );
}

Info.propTypes = {
  children: PropTypes.node,
};

Info.defaultProps = {
  children: null,
};

function Home() {
  return (
    <>
      <Header />
      <CatalogueSection />
      <OutletsSection/>
      <JoinSection/>
      <Info />
      <Footer />
    </>
  );
}

export default Home;