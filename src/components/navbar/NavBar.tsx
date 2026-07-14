"use client";
import { useWebContext } from "@/context-api/WebContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import { CtaBtn } from "../buttons/CtaBtn";
import { navData } from "./navData";
import MobileNav from "./MobileNav";
import { contacts } from '../../utils/constant';
const NavBar = () => {
  const { setIsMobileNavOpen } = useWebContext();
  const pathName = usePathname();
  if (pathName === "/thank-you") {
    return null;
  }

  return (
    <header
      className={`max_screen_width  ${pathName === "/about-us" ? "border-b border-secondary" : ""}`}
    >
      <nav className="flex items-center justify-between py-4 max_width">
        <Link href="/" className="block relative md:w-50 w-40  aspect-4/1.25">
          <Image src={navData.logo} alt="logo" fill className="object-cover" />
        </Link>
        <ul className="xl:flex hidden items-center gap-4">
          {navData.links.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`text-primary p-2 border-b text-lg duration-300 ease-in-out hover:border-secondary ${
                  pathName === item.href
                    ? "border-secondary"
                    : "border-transparent"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <CtaBtn
          type="link"
          href={contacts.WhatsAppCta}
          label={"Book Now"}
          target="_blank"
          rel="noopener noreferrer"
          className="max-md:hidden text-secondary group hover:bg-secondary hover:text-white hover:shadow-none uppercase text-lg gap-4 rounded-lg border-secondary"
          startIcon="Booking"
          startIconClass="text-secondary! group-hover:text-white!"
        />
        <button className="lg:hidden" onClick={() => setIsMobileNavOpen(true)}>
          <IoMdMenu className="text-3xl" />
          <span className="sr-only">menu</span>
        </button>
      </nav>
      <MobileNav />
    </header>
  );
};

export default NavBar;
