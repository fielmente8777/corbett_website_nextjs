"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactInfo } from "./footerData";

const AccordionLinks: React.FC<ContactInfo> = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="pb-4">
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-left"
      >
        <p className="md:text-xl text-xl font-primary font-light uppercase text-white">
          {title}
        </p>

        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <DropDownIcon />
        </span>
      </button>

      {/* Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3">
            {links.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr] gap-2 text-white/90"
              >
                <span>{item.icon}</span>

                <span className="flex flex-wrap gap-1">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>

                  {item.label2 && (
                    <>
                      <span>,</span>

                      <Link
                        href={item.href2 || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/75 hover:text-white transition-colors"
                      >
                        {item.label2}
                      </Link>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccordionLinks;

export const DropDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 8L12 16L19 8H5Z"
      fill="white"
    />
  </svg>
);