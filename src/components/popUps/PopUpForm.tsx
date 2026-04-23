"use client";
import { useWebContext } from "@/context-api/WebContext";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Form2 from "../forms/Form2";

const PopUpForm = () => {
  const { isOpenPopUpForm, setIsOpenPopUpForm } = useWebContext();
  useEffect(() => {
    if (isOpenPopUpForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenPopUpForm]);

  return (
    <section
      className={`fixed max-lg:px-4 inset-0 flex backdrop-blur-xs items-center justify-center z-50 duration-700 ease-in-out transform transition-all ${isOpenPopUpForm ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpenPopUpForm(false);
        }
      }}
    >
      <div className="relative max-w-md text-center w-full mx-auto bg-white p-4">
        <button
          onClick={() => setIsOpenPopUpForm(false)}
          className="absolute top-2 right-2 text-3xl font-bold text-p1 z-10 border border-transparent hover:border-primary rounded-full transition-all duration-300 ease-in-out"
        >
          <MdClose />
        </button>
        <Form2 gridView />
      </div>
    </section>
  );
};

export default PopUpForm;
