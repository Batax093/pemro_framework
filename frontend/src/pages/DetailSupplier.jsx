import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';



function ImageCard({ src, alt, title }) {
  return (
    <div className="flex flex-col grow px-8 pt-2 pb-5 mt-24 w-full text-2xl font-extrabold tracking-tight text-center whitespace-nowrap rounded-md shadow-sm bg-stone-500 text-stone-400 max-md:px-5 max-md:mt-10">
      <img loading="lazy" src={src} alt={alt} className="w-full aspect-[1.49]" />
      <div className="self-center mt-1.5">{title}</div>
    </div>
  );
}

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function SupplierDetails({ supplierName, productName, weight }) {
  return (
    <div className="flex flex-col text-2xl tracking-wider text-center text-stone-500 max-md:mt-8 max-md:max-w-full">
      <h2 className="self-end text-4xl font-bold tracking-tighter">Detail Supplier</h2>
      <div className="mt-24 text-3xl tracking-widest max-md:mt-10 max-md:max-w-full">
        <span className="font-bold text-stone-500">{supplierName}</span>
      </div>
      <p className="mt-8 max-md:max-w-full">{productName}</p>
      <p className="mt-8 max-md:max-w-full">{weight}</p>
    </div>
  );
}

SupplierDetails.propTypes = {
  supplierName: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
};

function Footer() {
  return (
    <footer className="flex gap-5 items-start px-3 pt-7 pb-3.5 w-full font-black bg-stone-400 text-stone-500 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-0 self-start text-xs">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&" alt="Company Logo" className="shrink-0 aspect-[0.93] w-[39px]" />
        <div className="my-auto">KOPI<span className="text-stone-500">IN</span></div>
      </div>
      <div className="flex-auto my-auto text-xs max-md:max-w-full">
        Made by <span className="text-stone-500">Love</span>
      </div>
    </footer>
  );
}

function DetailSupplier() {
  return (
    <>
    <Navbar />
    <div className="flex flex-col min-h-screen bg-white">
      <section className="flex flex-col flex-grow pt-14">
        <div className="ml-24 max-w-full w-[801px]">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
              <ImageCard src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=b1d7a673afae4361a48ecfd33debe811&" alt="Arabika Coffee Beans" title="Arabika" />
            </div>
            <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
              <SupplierDetails 
                supplierName="PT Kopi Indonesia" 
                productName="Biji kopi arabika" 
                weight="500 gram" 
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
    </>
  );
}

export default DetailSupplier;
