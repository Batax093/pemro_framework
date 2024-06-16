/* eslint-disable react/prop-types */
import useGetDST from "../hooks/useGetDST";
import useApproveDST from "../hooks/useApproveDST";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function ApproveDSTCard({ data }) {
  const { profile } = data;
  const { loading, approveDST } = useApproveDST();

  const handleApprove = async () => {
      const confirmed = window.confirm(`Are you sure you want to approve DST for ${data.companyName}?`);
      if (confirmed) {
          try {
              await approveDST(data.supplierid, data);
              toast.success(`DST for ${data.companyName} approved successfully!`);
          } catch (error) {
              toast.error(`Failed to approve DST: ${error.message}`);
          }
      }
  }; 

  return (
      <section className="flex gap-5 mb-10 p-8 bg-cream-50 rounded-xl w-[1236px] max-md:flex-wrap max-md:pr-5">
          <div className="flex-auto max-md:max-w-full">
              <figure className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[45%] max-md:w-full">
                      <img 
                          loading="lazy" 
                          src='https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=6aa320d50fc04f13ae8b58abb91612c7&' 
                          className="w-full aspect-[1.56] max-md:mt-4" 
                          alt={`${profile?.company || "Company"} logo`} 
                      />
                  </div>
                  <figcaption className="flex flex-col ml-5 w-[55%] text-center text-cream-500 max-md:w-full">
                      <h2 className="text-4xl mt-7 tracking-widest font-bold">{data.companyName}</h2>
                      <p className="text-3xl mt-1.5 tracking-widest">{data.email}</p>
                  </figcaption>
              </figure>
          </div>
          <nav className="flex flex-col my-auto text-base font-black whitespace-nowrap text-cream-300">
              <button 
                  onClick={handleApprove} 
                  className="justify-center px-16 py-5 mb-6 rounded-xl bg-cream-500 text-cream-300 max-md:pr-6 max-md:pl-5" 
                  tabIndex="0"
              >
                  {loading ? "Approving..." : "Approve"}
              </button>
          </nav>
      </section>
  );
}

function ApproveDST() {
  const { dst } = useGetDST();

    if (!dst) {
        return <div>Loading...</div>;
    }

    if (!dst.DST || dst.DST.length === 0) {
        return <p className="text-center text-gray-500">No pending DST applications available.</p>;
    }

    const filteredDST = dst.DST.filter(DST => DST.status !== 'approved');
  return (
      <>
      <Navbar />
          <div className="flex flex-col items-center pt-12 bg-white">
              <header className="text-center">
                  <h1 className="text-4xl font-bold text-cream-500">List DST Apply</h1>
                  <p className="mt-5 text-2xl font-light text-cream-300">Data Apply DST yang telah daftar</p>
              </header>
              <main className="mt-24 w-full max-md:mt-10">
              {filteredDST.map((DST, index) => (
                <ApproveDSTCard
                    key={index}
                    data={DST}
                    index={index}
                />
                ))}
              </main>
              <footer className="flex gap-5 items-start self-stretch px-3 pt-7 pb-3.5 mt-14 w-full font-black bg-cream-300 text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-0 self-start text-xs">
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f289a92a736d584a41d50b015c85a329d014de5e471a5927bab8fac105dde?apiKey=b1d7a673afae4361a48ecfd33debe811&" className="shrink-0 aspect-[0.93] w-[39px]" alt="Footer Logo" />
                      <div className="my-auto">KOPI<span className="text-cream-500">IN</span></div>
                  </div>
                  <div className="flex-auto my-auto text-xs max-md:max-w-full">
                      Made by <span className="text-cream-500">Love</span>
                  </div>
              </footer>
          </div>
      </>
  );
}

export default ApproveDST;