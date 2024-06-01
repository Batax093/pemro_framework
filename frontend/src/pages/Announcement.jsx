import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
function Card({ title, description, image, altText }) {
  return (
    <article className="flex flex-col w-full max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow justify-center px-9 py-11 w-full rounded-3xl bg-stone-500 max-md:px-5">
        <img loading="lazy" src={image} alt={altText} className="w-full aspect-[1.49]" />
        <div className="justify-center self-stretch px-11 py-8 my-auto w-full text-xl tracking-tight bg-stone-400 text-stone-500 max-md:px-5 max-md:mt-8 max-md:max-w-full">
          {description}
        </div>
      </div>
      <h2 className="text-center mt-4">{title}</h2>
    </article>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

function StatusCard({ statusTitle, companyName, statusText, image, altText }) {
  return (
    <article className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pt-11 w-full text-3xl tracking-widest rounded-xl bg-stone-400 max-md:mt-10">
        <img loading="lazy" src={image} alt={altText} className="self-center max-w-full aspect-[1.49] w-[269px]" />
        <h3 className="mt-6 mr-7 ml-8 font-bold text-stone-500 max-md:mx-2.5">{statusTitle}</h3>
        <h4 className="mt-2 mr-7 ml-8 font-semibold text-stone-500 max-md:mx-2.5">{companyName}</h4>
        <div className="justify-center px-11 py-5 mt-10 text-center text-orange-200 rounded-none bg-stone-500 max-md:px-5">{statusText}</div>
      </div>
    </article>
  );
}

StatusCard.propTypes = {
  statusTitle: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

function MyComponent() {
  const articles = [
    {
      title: "Berita Kopiin",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla risus diam, eleifend consequat lacus elementum eget. Etiam non risus dui. Nullam a velit mi. Donec non ipsum eget purus cursus ultricies eget in magna. Cras hendrerit sit amet sem ut ullamcorper. Nam mauris turpis, sodales id finibus id, semper at arcu. Maecenas porttitor vehicula quam vel congue.",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      altText: "Article Image",
    },
    {
      title: "Berita Kopiin",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla risus diam, eleifend consequat lacus elementum eget. Etiam non risus dui. Nullam a velit mi. Donec non ipsum eget purus cursus ultricies eget in magna. Cras hendrerit sit amet sem ut ullamcorper. Nam mauris turpis, sodales id finibus id, semper at arcu. Maecenas porttitor vehicula quam vel congue.",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      altText: "Article Image",
    },
    {
      title: "Berita Kopiin",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla risus diam, eleifend consequat lacus elementum eget. Etiam non risus dui. Nullam a velit mi. Donec non ipsum eget purus cursus ultricies eget in magna. Cras hendrerit sit amet sem ut ullamcorper. Nam mauris turpis, sodales id finibus id, semper at arcu. Maecenas porttitor vehicula quam vel congue.",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      altText: "Article Image",
    },
  ];

  const statusCards = [
    {
      statusTitle: "Status Kopiin",
      companyName: "PT Kopi Indonesia",
      statusText: "Proses Pengajuan",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      altText: "Company Logo",
    },
    {
      statusTitle: "Status Kopiin",
      companyName: "CV Coffee Born",
      statusText: "Diterima",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      altText: "Company Logo",
    },
    {
      statusTitle: "Status Kopiin",
      companyName: "PT Luwak Nusantara",
      statusText: "Ditolak",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&",
      altText: "Company Logo",
    },
  ];

  return (
    <div className="flex flex-col items-center pt-3.5 bg-white">
      <header className="flex gap-5 justify-between w-full text-base font-black max-w-[1356px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-0 text-stone-500">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a3a8837372790f6a0677ab4b14c0459c08ebdba3958ac0805e14f2d8625532d?apiKey=b1d7a673afae4361a48ecfd33debe811&" alt="KOPIIN Logo" className="shrink-0 aspect-square w-[70px]" />
          <div className="my-auto">
            KOPI<span className="text-stone-500">IN</span>
          </div>
        </div>
        <nav className="flex gap-5 justify-between my-auto text-black max-md:flex-wrap max-md:max-w-full">
          <Link to="/">HOME</Link>
          <Link to="/announcement">ANNOUNCEMENT</Link>
          <a href="#">ABOUT US</a>
          <a href="#">ACCOUNT</a>
        </nav>
      </header>
      <h1 className="mt-11 text-4xl font-bold tracking-widest text-center text-stone-500 max-md:mt-10">Berita Kopiin</h1>
      <p className="mt-4 text-2xl font-light tracking-wide text-center text-stone-400 max-md:max-w-full">Kumpulan Berita Terbaru Seputar Dunia Kopi</p>
      <section className="mt-10 w-full max-w-[1191px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {articles.map((article, index) => (
            <Card key={index} {...article} />
          ))}
        </div>
      </section>
      <h2 className="mt-20 text-4xl font-bold tracking-widest text-center text-stone-500 max-md:mt-10">Status Kopiin</h2>
      <p className="mt-4 text-2xl font-light tracking-wide text-center text-stone-400 max-md:max-w-full">Cek Secara Berkala Pengajuanmu Untuk Menjadi Supplier Tetap Kopiin</p>
      <section className="px-5 mt-20 w-full max-w-[1091px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {statusCards.map((statusCard, index) => (
            <StatusCard key={index} {...statusCard} />
          ))}
        </div>
      </section>
      <footer className="flex gap-5 items-start self-stretch px-3 pt-7 pb-3.5 mt-32 w-full font-black bg-stone-400 text-stone-500 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-0 self-start text-xs">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&" alt="KOPIIN Footer Logo" className="shrink-0 aspect-[0.93] w-[39px]" />
          <div className="my-auto">
            KOPI<span className="text-stone-500">IN</span>
          </div>
        </div>
        <div className="flex-auto my-auto text-xs max-md:max-w-full">
          Made by <span className="text-stone-500">Love</span>
        </div>
      </footer>
    </div>
  );
}

export default MyComponent;
