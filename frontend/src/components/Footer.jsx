const Footer = () => {
  return (
    <footer className="flex gap-5 items-start self-stretch px-3 pt-7 pb-3.5 mt-14 w-full font-black bg-cream-300 text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-0 self-start text-xs">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&"
          className="shrink-0 aspect-[0.93] w-[39px]"
          alt="Footer Logo"
        />
        <div className="my-auto">KOPI<span className="text-cream-500">IN</span></div>
      </div>
      <div className="flex-auto my-auto text-xs max-md:max-w-full">
        Made by <span className="text-cream-500">Love</span>
      </div>
    </footer>
  );
};

export default Footer;
