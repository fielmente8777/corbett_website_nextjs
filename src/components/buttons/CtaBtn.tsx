"use client";
import { BtnType } from "@/@types/@types";
import { useAppContext } from "@/contextApi/AppContext";
import Link from "next/link";


type CtaBtnProps = {
  label: string;
  href?: string;
  className?: string;
  iconClass?: string;
  startIconClass?: string;
  onClick?: () => void;
  type: BtnType;
  [key: string]: unknown;
  target?: string;
  icon?: "arrow" | "arrow2" | "none";

  startIcon?: "mail" | "whatsapp" | "call" | "download" | "none";
};

export const CtaBtn: React.FC<CtaBtnProps> = ({
  label,
  href,
  className = "",
  onClick,
  type = "button",
  target,
  icon,
  iconClass,
  startIconClass,
  startIcon,
  ...props
}) => {
  const { setIsOpenPopupForm } = useAppContext();

  const openPopupForm = () => setIsOpenPopupForm(true);

  return type === "button" ? (
    <button
      {...props}
      className={`transition-all text-nowrap max-md:w-full flex items-center gap-2 justify-center font-medium border duration-300 ease-in-out hover:scale-x-105 active:scale-95 hover:shadow-2xl px-6 py-3  ${className}`}
      onClick={onClick ? onClick : openPopupForm}
    >
      {startIcon === "whatsapp" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center text-white ${startIconClass}`}
        >
          <WhatsappIcon />
        </span>
      )}
      {label}
      {icon === "arrow" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center rounded-full ${iconClass ? iconClass : "text-primary"} bg-white`}
        >
          <ArrowBtn />
        </span>
      )}
      {icon === "arrow2" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center rounded-full ${iconClass ? iconClass : "text-primary"} bg-white`}
        >
          <ArrowBtn2 />
        </span>
      )}
    </button>
  ) : (
    <Link
      href={href || "#"}
      target={target}
      {...props}
      className={`transition-all text-nowrap max-md:w-full flex items-center gap-2 justify-center font-medium border duration-300 ease-in-out hover:scale-x-105 active:scale-95 hover:shadow-2xl px-6 py-3  ${className}`}
      onClick={onClick}
    >
      {startIcon === "whatsapp" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center text-white ${startIconClass}`}
        >
          <WhatsappIcon />
        </span>
      )}
      {label}
      {icon === "arrow" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center rounded-full ${iconClass ? iconClass : "text-primary"} bg-white`}
        >
          <ArrowBtn />
        </span>
      )}
      {icon === "arrow2" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center rounded-full ${iconClass ? iconClass : "text-primary"} bg-white`}
        >
          <ArrowBtn2 />
        </span>
      )}
    </Link>
  );
};

export const ArrowBtn2 = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    viewBox="0 0 26 26"
    {...props}
  >
    <path
      fill="currentColor"
      d="M18.013 13.812H5.687a.79.79 0 0 1-.579-.233.79.79 0 0 1-.233-.58q0-.345.233-.578a.79.79 0 0 1 .58-.234h12.325l-5.6-5.6a.76.76 0 0 1-.239-.565.8.8 0 0 1 .255-.576.85.85 0 0 1 .571-.244.76.76 0 0 1 .57.244l6.87 6.868a.9.9 0 0 1 .277.686q0 .195-.063.364a.9.9 0 0 1-.215.321l-6.868 6.869a.78.78 0 0 1-.557.23.8.8 0 0 1-.585-.23.8.8 0 0 1-.252-.58q0-.326.252-.579z"
    ></path>
  </svg>
);

export const ArrowBtn = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4535 6.50313L5.67624 14.2725C5.56083 14.3878 5.41583 14.4441 5.24124 14.4415C5.06652 14.4388 4.92145 14.3798 4.80603 14.2644C4.69076 14.149 4.63312 14.0053 4.63312 13.8333C4.63312 13.6614 4.69076 13.5177 4.80603 13.4023L12.5754 5.625H5.7452C5.56812 5.625 5.41965 5.56507 5.29978 5.44521C5.18006 5.32535 5.1202 5.17687 5.1202 4.99979C5.1202 4.82257 5.18006 4.67417 5.29978 4.55458C5.41965 4.43486 5.56812 4.375 5.7452 4.375H13.9502C14.1637 4.375 14.3426 4.44715 14.4869 4.59146C14.6313 4.7359 14.7035 4.91479 14.7035 5.12813V13.3333C14.7035 13.5104 14.6436 13.6588 14.5237 13.7785C14.4039 13.8984 14.2554 13.9583 14.0783 13.9583C13.9011 13.9583 13.7526 13.8984 13.6329 13.7785C13.5133 13.6588 13.4535 13.5104 13.4535 13.3333V6.50313Z"
      fill="currentColor"
    />
  </svg>
);
export const WhatsappIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.875 4.092a8.183 8.183 0 0 0-5.842-2.425c-4.55 0-8.258 3.708-8.258 8.258 0 1.458.383 2.875 1.1 4.125l-1.167 4.283 4.375-1.15a8.26 8.26 0 0 0 3.95 1.009c4.55 0 8.259-3.709 8.259-8.259a8.207 8.207 0 0 0-2.417-5.841Zm-5.842 12.7a6.885 6.885 0 0 1-3.5-.959l-.25-.15-2.6.684.692-2.534-.167-.258a6.883 6.883 0 0 1-1.05-3.65c0-3.783 3.084-6.867 6.867-6.867 1.833 0 3.558.717 4.85 2.017a6.817 6.817 0 0 1 2.008 4.858c.017 3.784-3.066 6.859-6.85 6.859Zm3.767-5.134c-.208-.1-1.225-.6-1.408-.675-.192-.066-.325-.1-.467.1-.142.209-.533.675-.65.809-.117.141-.242.158-.45.05-.208-.1-.875-.325-1.658-1.025-.617-.55-1.025-1.225-1.15-1.434-.117-.208-.017-.316.091-.425.092-.091.209-.241.309-.358.1-.117.141-.208.208-.342.067-.141.033-.258-.017-.358-.05-.1-.466-1.117-.633-1.533-.167-.4-.342-.35-.467-.359h-.4a.749.749 0 0 0-.55.259c-.183.208-.716.708-.716 1.725 0 1.016.741 2 .841 2.133.1.142 1.459 2.225 3.525 3.117.492.216.875.341 1.175.433.492.158.942.133 1.3.083.4-.058 1.225-.5 1.392-.983.175-.483.175-.892.117-.983-.059-.092-.184-.134-.392-.234Z"
    />
  </svg>
);
