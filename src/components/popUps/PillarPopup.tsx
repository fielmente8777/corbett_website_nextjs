"use client";
import { useWebContext } from "@/context-api/WebContext";
import { MdClose } from "react-icons/md";

const PillarPopup = () => {
  const { pillarPopupData, isOpenPillarPopup, setIsOpenPillarPopup } =
    useWebContext();

  // onscroll hide popup
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (isOpenPillarPopup) {
  //       setIsOpenPillarPopup(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isOpenPillarPopup, setIsOpenPillarPopup]);

  if (!pillarPopupData) {
    return null;
  }

  return (
    <section
      className={`fixed max-lg:px-4 inset-0 flex backdrop-blur-xs items-center justify-center z-999999 duration-700 ease-in-out transform transition-all ${isOpenPillarPopup ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpenPillarPopup(false);
        }
      }}
    >
      <div className="relative max-w-xl text-center w-full mx-auto bg-white rounded-md md:px-8 py-16">
        <button
          onClick={() => setIsOpenPillarPopup(false)}
          className="absolute top-2 right-2 text-3xl font-bold text-primary"
        >
          <MdClose />
        </button>
        {pillarPopupData && (
          <div className="space-y-4">
            <h2 className="md:text-4xl text-2xl primary-font text-primary uppercase">
              {pillarPopupData.title}
            </h2>
            <p className="text-base md:text-lg text-dark">{pillarPopupData.description}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PillarPopup;
