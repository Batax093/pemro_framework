/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import useGetAnnouncement from '../hooks/useGetAnnouncement';
import useGetDST from '../hooks/useGetDST';
import usePostAnnouncement from '../hooks/usePostAnnouncement';
import Navbar from '../components/Navbar';
import { useAuthContext } from '../context/authContext';
import '../App.css';
import Footer from '../components/Footer';

function SupplierStatus({ approvedBy, companyName, status, statusBgColor }) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="flex rounded-lg h-full bg-cream-50 p-8 flex-col">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-cream-500 text-white flex-shrink-0">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h2 className="text-gray-900 text-lg title-font font-medium">{companyName || "Belum ada nama Company"}</h2>
        </div>
        <div className="flex-grow">
          <div className="mt-6 font-bold text-2xl text-cream-500 text-center">{approvedBy}</div>
          <div className={`justify-center px-11 py-5 mt-7 font-bold text-center text-cream-300 ${statusBgColor} rounded-b-lg`}>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}

SupplierStatus.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusBgColor: PropTypes.string.isRequired,
  approvedBy: PropTypes.string.isRequired
};

function NewsArticle({content, title }) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="flex rounded-lg h-full bg-cream-50 p-8 flex-col">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-cream-500 text-white flex-shrink-0">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h2 className="text-gray-900 text-lg title-font font-medium">{title}</h2>
        </div>
        <div className="flex-grow">
          <p className="leading-relaxed text-base">{content}</p>
        </div>
      </div>
    </div>
  );
}

NewsArticle.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function NewsSection({ setShowCreateModal }) {
  const { announcements } = useGetAnnouncement();
  const [visibleCount, setVisibleCount] = useState(3);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (announcements && announcements.announcement) {
      setVisibleCount(3);
    }
  }, [announcements]);

  const openModal = () => {
    setShowCreateModal(true);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xl text-cream-500 tracking-widest font-medium title-font mb-1">
              Kumpulan Berita Terbaru Seputar Dunia Kopi
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Berita Kopiin</h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {Array.isArray(announcements?.announcement) && announcements.announcement.length > 0 ? (
              announcements.announcement.slice(0, visibleCount).map((announcement, index) => (
                <div key={index} className="flex w-full p-4">
                  <NewsArticle
                    index={index}
                    announcement={announcement}
                    imageSrc='https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=6aa320d50fc04f13ae8b58abb91612c7&'
                    altText={announcement.title || "N/A"}
                    content={announcement.content || "N/A"}
                    title={announcement.title || "N/A"}
                  />
                  {authUser.role === "administrator" && (
                    <button onClick={openModal} className="ml-4 mt-14 animated-button">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="plus-icon"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-2xl font-light text-cream-300">
                No announcements available at the moment.
              </div>
            )}
          </div>
          {announcements && Array.isArray(announcements.announcement) && visibleCount < announcements.announcement.length && (
            <div className="flex justify-center mt-6">
              <button onClick={loadMore} className="px-14 py-5 mb-6 rounded-xl bg-cream-500 text-cream-300 max-md:px-5">Next</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


function StatusSection() {
  const { dst } = useGetDST();

  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col text-center w-full mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Status Daftar Supplier Tetap</h1>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Array.isArray(dst.DST) && dst.DST.map((supplierTetap, index) => (
            <SupplierStatus
              key={index}
              supplierTetap={supplierTetap}
              imageSrc='https://cdn.builder.io/api/v1/image/assets/TEMP/9b300a7b5ec1ca9295e757297eb45d2927ba83a01c43b4d387002a419f0886e8?apiKey=6aa320d50fc04f13ae8b58abb91612c7&'
              altText='test'
              approvedBy={supplierTetap.approvedBy || "Belum disetujui"}
              status={supplierTetap.status}
              companyName={supplierTetap.companyName || "Belum ada nama Company"}
              statusBgColor='bg-cream-500'
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreateAnnouncementModal({ setShowCreateModal }) {
  const { postAnnouncement } = usePostAnnouncement();

  const announcementData = {
    title: "",
    content: "",
  };

  const [announcement, setAnnouncement] = useState(announcementData);

  const handleButtonClick = async (e) => {
    e.preventDefault()
    await postAnnouncement(announcement.title, announcement.content);
    
    setShowCreateModal(false);
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[30%] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <div className='flex justify-center items-center w-full'>
                <h3 className="text-3xl text-cream-500 font-semibold text-center">
                  Announcement
                </h3>
              </div>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowCreateModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form className="bg-white rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-cream-500 text-sm font-bold mb-1" htmlFor="title">
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-cream-500"
                  id="title"
                  type="text"
                  value={announcement.title}
                  onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                  placeholder="Title"
                />
                <label className="block text-cream-500 text-sm font-bold my-3" htmlFor="content">
                  Content
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-cream-500"
                  id="content"
                  value={announcement.content}
                  onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                  placeholder="Content"
                />
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-cream-300 text-white active:bg-yellow-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowCreateModal(false)}
              >
                Close
              </button>
              <button
                className="bg-cream-500 text-white active:bg-cream-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={handleButtonClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="bg-white">
      <Navbar />
      <NewsSection setShowCreateModal={setShowCreateModal} />
      <StatusSection />
      {showCreateModal && <CreateAnnouncementModal setShowCreateModal={setShowCreateModal} />}
      <Footer />
    </div>
  );
}

export default App;
