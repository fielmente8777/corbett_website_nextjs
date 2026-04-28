"use client";
import { useWebContext } from "@/context-api/WebContext";
import { MdClose } from "react-icons/md";
import { navData } from "./navData";

const MobileNav = () => {
  const { setIsMobileNavOpen, isMobileNavOpen } = useWebContext();
  return (
    <div
      className={`fixed w-[70%] h-dvh bg-white z-50 top-0 right-0 duration-1000 transition ease-in-out ${isMobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <button>
        <MdClose
          onClick={() => setIsMobileNavOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        />
      </button>
      <ul className="flex flex-col gap-4 mt-12">
        {navData.links.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className="text-primary p-2  duration-300 ease-in-out hover:border-secondary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNav;
