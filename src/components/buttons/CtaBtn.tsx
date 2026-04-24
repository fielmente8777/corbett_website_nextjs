"use client";
import { BtnType } from "@/@types/@types";
import { useWebContext } from "@/context-api/WebContext";
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
  icon?: "arrow" | "arrow2" | "direction" | "none";

  startIcon?: "mail" | "whatsapp" | "call" | "download" | "Booking" | "none";
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
  const { setIsOpenPopupForm } = useWebContext();

  const openPopupForm = () => setIsOpenPopupForm(true);

  return type === "button" ? (
    <button
      {...props}
      className={`transition-all text-nowrap max-md:w-full flex items-center gap-2 justify-center font-medium border duration-300 ease-in-out hover:scale-x-105 active:scale-95 hover:shadow-2xl px-6 py-3  ${className}`}
      onClick={onClick ? onClick : openPopupForm}
    >
      {startIcon === "Booking" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center text-white ${startIconClass}`}
        >
          <BookingIcon />
        </span>
      )}
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
      {startIcon === "Booking" && (
        <span className={`text-white ${startIconClass}`}>
          <BookingIcon />
        </span>
      )}
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
      {icon === "direction" && (
        <span
          className={`w-6 aspect-square flex items-center justify-center rounded-full ${iconClass ? iconClass : "text-primary"} bg-white`}
        >
          <DirectionIcon />
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

export const BookingIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.3125 0.1875C7.00125 0.1875 6.75 0.43875 6.75 0.75V3.1875H5.4375C3.06 3.1875 1.125 5.1225 1.125 7.5V19.5C1.125 21.8775 3.06 23.8125 5.4375 23.8125H10.125C10.4362 23.8125 10.6875 23.5613 10.6875 23.25C10.6875 22.9387 10.4362 22.6875 10.125 22.6875H5.4375C3.68062 22.6875 2.25 21.2569 2.25 19.5V8.0625H21.75V9.43125C21.75 9.7425 22.0012 9.99375 22.3125 9.99375C22.6238 9.99375 22.875 9.7425 22.875 9.43125V7.5C22.875 5.1225 20.94 3.1875 18.5625 3.1875H17.25V0.75C17.25 0.43875 16.9987 0.1875 16.6875 0.1875C16.3763 0.1875 16.125 0.43875 16.125 0.75V3.1875H7.875V0.75C7.875 0.43875 7.62375 0.1875 7.3125 0.1875ZM18.5625 4.3125C20.1281 4.3125 21.4312 5.44688 21.6975 6.9375H2.3025C2.56875 5.44688 3.87187 4.3125 5.4375 4.3125H18.5625Z"
      fill="currentColor"
    />
    <path
      d="M16.6875 9.5625C12.7594 9.5625 9.5625 12.7594 9.5625 16.6875C9.5625 20.6156 12.7594 23.8125 16.6875 23.8125C20.6156 23.8125 23.8125 20.6156 23.8125 16.6875C23.8125 12.7594 20.6156 9.5625 16.6875 9.5625ZM16.6875 22.6875C13.38 22.6875 10.6875 19.9969 10.6875 16.6875C10.6875 13.3781 13.38 10.6875 16.6875 10.6875C19.995 10.6875 22.6875 13.3781 22.6875 16.6875C22.6875 19.9969 19.995 22.6875 16.6875 22.6875Z"
      fill="currentColor"
    />
    <path
      d="M19.8671 14.5877L16.2146 17.9777L14.6378 16.4683C14.4128 16.2527 14.0584 16.262 13.8428 16.4852C13.6271 16.7102 13.6365 17.0664 13.8596 17.2802L15.819 19.1552C15.9278 19.2583 16.0684 19.3108 16.2071 19.3108C16.344 19.3108 16.4809 19.2602 16.5896 19.1608L20.6303 15.4108C20.8571 15.1989 20.8721 14.8427 20.6603 14.6158C20.4503 14.3908 20.094 14.3758 19.8671 14.5877Z"
      fill="currentColor"
    />
  </svg>
);

export const DirectionIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0021 14.9996C20.0021 14.9996 22.0011 13.5266 22.0011 12.9996C22.0011 12.4726 20.0011 10.9996 20.0011 10.9996M21.7761 12.8666C20.3641 13.1566 17.7181 13.2696 16.4081 10.8166C15.8651 9.95258 15.9671 8.50658 15.9671 6.86058C15.9331 6.19058 15.3611 4.96958 13.9291 5.00058C12.4971 5.03158 12.0271 6.20658 11.9711 6.79058V16.9016C11.9851 17.7536 11.4911 18.9986 9.97509 18.9986C8.49509 18.9986 7.91509 17.6866 8.04309 16.7036C8.38909 14.0396 7.58009 11.2466 4.08009 11.0026H1.99609"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
