import PropType from "prop-types";
import useLogout from "../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

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

function SupplierCard({ company, product, imgSrc, editLink }) {
  return (
    <section className="flex gap-5 mb-10 p-8 bg-lime-50 rounded-xl w-[1236px] max-md:flex-wrap max-md:pr-5">
      <div className="flex-auto max-md:max-w-full">
        <figure className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[45%] max-md:w-full">
            <img loading="lazy" src={imgSrc} className="w-full aspect-[1.56] max-md:mt-4" alt={`${company} logo`} />
          </div>
          <figcaption className="flex flex-col ml-5 w-[55%] text-center text-stone-500 max-md:w-full">
            <h2 className="text-4xl mt-7 tracking-widest font-bold">{company}</h2>
            <p className="text-3xl mt-1.5 tracking-widest">{product}</p>
          </figcaption>
        </figure>
      </div>
      <nav className="flex flex-col my-auto text-base font-black whitespace-nowrap text-stone-400">
        <Link to='/detail' className="justify-center px-14 py-5 mb-6 rounded-xl bg-stone-500 text-white max-md:px-5" tabIndex="0">View</Link>
        <a href={editLink} className="justify-center px-16 py-5 rounded-xl bg-stone-500 text-white max-md:pr-6 max-md:pl-5" tabIndex="0">Edit</a>
      </nav>
    </section>
  );
}

SupplierCard.propTypes = {
  company: PropType.string.isRequired,
  product: PropType.string.isRequired,
  imgSrc: PropType.string.isRequired,
  viewLink: PropType.string.isRequired,
  editLink: PropType.string.isRequired,
}

function Supplier() {
  const supplierData = [
    {
      company: "PT Kopi Indonesia",
      product: "Arabika",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f69da5a984b4b689b668aea0aeadf24a7146405e5bfee34ffc7472d4be60e6d5?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      viewLink: "#",
      editLink: "#"
    },
    {
      company: "PT Luwak Nusantara",
      product: "Gayo",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f69da5a984b4b689b668aea0aeadf24a7146405e5bfee34ffc7472d4be60e6d5?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      viewLink: "#",
      editLink: "#"
    },
    {
      company: "PT White Coffee",
      product: "Klombia",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f69da5a984b4b689b668aea0aeadf24a7146405e5bfee34ffc7472d4be60e6d5?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      viewLink: "#",
      editLink: "#"
    }
  ];

  return (
    <>
    <Header />
    <div className="flex flex-col items-center pt-12 bg-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-stone-500">Supplier</h1>
        <p className="mt-5 text-2xl font-light text-stone-400">Data supplier yang telah daftar</p>
      </header>
      <main className="mt-24 w-full max-md:mt-10">
        {supplierData.map((supplier, index) => (
          <SupplierCard
            key={index}
            company={supplier.company}
            product={supplier.product}
            imgSrc={supplier.imgSrc}
            viewLink={supplier.viewLink}
            editLink={supplier.editLink}
          />
        ))}
      </main>
      <footer className="flex gap-5 items-start self-stretch px-3 pt-7 pb-3.5 mt-12 w-full font-black bg-stone-400 text-stone-500 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-0 self-start text-xs">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 aspect-[0.93] w-[39px]" alt="KopiIn logo" />
          <div className="my-auto"> KOPI<span className="text-stone-500">IN</span> </div>
        </div>
        <div className="flex-auto my-auto text-xs max-md:max-w-full"> Made by <span className="text-stone-500">Love</span> </div>
      </footer>
    </div>
    </>
  );
}

export default Supplier;
