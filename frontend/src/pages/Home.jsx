import useLogout from "../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
function Header() {
  const { logout } = useLogout();

  return (
    <header className="flex flex-col items-center pt-3.5 bg-white">
      <div className="flex flex-col self-stretch px-5 w-full max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full text-base font-black max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-0 text-stone-500">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a3a8837372790f6a0677ab4b14c0459c08ebdba3958ac0805e14f2d8625532d?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 aspect-square w-[70px]" alt="KopiIn Logo" />
            <div className="my-auto">
              <span>KOPI<span className="text-stone-500">IN</span></span>
            </div>
          </div>
          <nav className="flex gap-5 justify-between my-auto text-black max-md:flex-wrap max-md:max-w-full">
            <Link to="/">HOME</Link>
            <Link to="/announcement">ANNOUNCEMENT</Link>
            <a href="#about-us">ABOUT US</a>
            <a href="#account">ACCOUNT</a>
            <a href="#home"></a>
            <BiLogOut className="text-3xl cursor-pointer" onClick={logout} />
          </nav>
        </div>
        <div className="flex gap-5 justify-center items-center mt-14 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a3d4c2095268ed61816a7327665df32f69ecc96798e1d823edce4962b0dcbb3?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 self-stretch my-auto w-12 aspect-[0.52] fill-black" alt="" />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/661df0d225d97af78d225c81736dcaa29f52228f19437afe96a371eb78e0a5f4?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="self-stretch w-full shadow-lg aspect-[1.75] max-md:max-w-full" alt="" />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e64f3dd2e6e8fe9235c44b3ced7dafc21b0d8af6a7ae26364a524f077bb0dad?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 self-stretch my-auto w-12 aspect-[0.52] fill-black" alt="" />
        </div>
      </div>
    </header>
  );
}

function CatalogueSection() {
  const coffee = "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&"
  const coffeeTypes = [
    { id: coffee, title: "Arabika" },
    { id: coffee, title: "Robusta" },
    { id: coffee, title: "Liberica" },
    { id: coffee, title: "Excelsa" },
    { id: coffee, title: "Gayo" },
    { id: coffee, title: "Kolombia" },
  ];

  return (
    <main className="px-5 mt-14 w-full max-w-[1251px] mx-auto max-md:mt-10 max-md:max-w-full">
      <h1 className="self-center mt-32 text-4xl font-bold tracking-widest text-center text-stone-500 max-md:mt-10 max-md:max-w-full">
        Catalogue Coffee Bean
      </h1>
      <p className="self-center mt-3.5 text-2xl font-light tracking-wide text-center text-stone-400 max-md:max-w-full">
        Biji Kopi Pilihan Untuk Penikmat Kopi Sejati
      </p>
      <div className="grid grid-cols-3 gap-5 mt-14 justify-center max-md:grid-cols-1">
        {coffeeTypes.map((coffee) => (
          <section key={coffee.id} className="flex flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-9 pt-2 pb-5 w-full text-2xl font-extrabold tracking-tight text-center whitespace-nowrap rounded-md shadow-sm bg-stone-500 text-stone-400 max-md:px-5 max-md:mt-10">
              <img loading="lazy" src={coffee.id} className="w-full aspect-[1.49]" alt={`${coffee.title} beans`} />
              <div className="self-center mt-1.5">{coffee.title}</div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function OutletsSection() {
  const outlet = "https://cdn.builder.io/api/v1/image/assets/TEMP/0402e2ab79ec857e8926195d4129d62b0d266be17255200f6211298cfea9b91b?apiKey=b1d7a673afae4361a48ecfd33debe811&"
  const outlets = [
    { id: outlet, name: "Kopiin Cab. Rungkut" },
    { id: outlet, name: "Kopiin Cab. Mulyerejo" },
    { id: outlet, name: "Kopiin Cab. Wiyung" },
    { id: outlet, name: "Kopiin Cab. Keputih" },
    { id: outlet, name: "Kopiin Cab. Tunjungan" },
    { id: outlet, name: "Kopiin Cab. Gubeng" },
    { id: outlet, name: "Kopiin Cab. Kertajaya" },
    { id: outlet, name: "Kopiin Cab. Merr" },
    { id: outlet, name: "Kopiin Cab. Gayungan" },
  ];

  return (
    <section className="px-5 mt-14 w-full max-w-[1363px] mx-auto max-md:mt-10 max-md:max-w-full">
      <h2 className="mt-36 text-4xl font-bold tracking-widest text-center text-stone-500 max-md:mt-10">Our Outlets</h2>
      <p className="mt-6 text-2xl font-light tracking-wide text-center text-stone-400 max-md:max-w-full">
        Temukan Toko Terdekat Dari Tempat Anda
      </p>
      <div className="flex flex-wrap gap-5 mt-14 justify-center">
        {outlets.map((outlet) => (
          <article key={outlet.id} className="flex flex-col w-[30%] bg-lime-50 rounded-xl border border-solid shadow-sm border-stone-500 p-4 max-md:w-full">
            <div className="flex flex-1 justify-between items-center">
              <div className="text-2xl font-medium tracking-tight text-stone-500">{outlet.name}</div>
              <div className="w-16 h-16 bg-stone-500 flex items-center justify-center rounded-full">
                <img loading="lazy" src={outlet.id} className="w-8 h-8" alt="" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function JoinSection() {
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
          <p className="text-base text-stone-500 max-md:mt-10">
            <span className="text-3xl font-light tracking-wide text-center">
              Nikmati berbagai keuntungan dan kemudahan dalam berbisnis
            </span>
            <br />
            <br />
            <span className="text-3xl font-bold tracking-widest text-center">
              Mari bergabung dan menjadi bagian dari
              <br />
              <span className="text-4xl text-black">KOPIIN</span>
            </span>
          </p>
          <form className="flex flex-col items-center mt-8 space-y-4">
            <label htmlFor="companyName" className="sr-only">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="w-full px-5 py-4 bg-lime-50 rounded-md"
              placeholder="Company Name"
            />
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-5 py-4 bg-lime-50 rounded-md"
              placeholder="Phone"
            />
            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <textarea
              id="address"
              className="w-full px-5 py-4 bg-lime-50 rounded-md"
              placeholder="Address"
            />
            <button
              type="submit"
              className="px-8 py-3 mt-7 font-black rounded-md bg-stone-500 text-stone-400"
            >
              Daftar
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="flex gap-5 items-start self-stretch px-3 pt-7 pb-3.5 mt-14 w-full font-black bg-stone-400 text-stone-500 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-0 self-start text-xs">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 aspect-[0.93] w-[39px]" alt="Footer Logo" />
        <div className="my-auto">KOPI<span className="text-stone-500">IN</span></div>
      </div>
      <div className="flex-auto my-auto text-xs max-md:max-w-full">
        Made by <span className="text-stone-500">Love</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Header />
      <CatalogueSection />
      <OutletsSection/>
      <JoinSection/>
      <Footer />
    </>
  );
}

export default Home;