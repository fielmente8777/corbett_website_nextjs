import Link from "next/link";

interface LinkButtonProps {
  href: string;
  label: string;
  className?: string;
  [key: string]: unknown;
}
const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  label,
  className = "",
  ...props
}) => {
  return (
    <Link
      href={href}
      {...props}
      className={`transition-all max-md:w-full flex items-center gap-2 justify-center font-medium border duration-300 ease-in-out hover:scale-x-105 active:scale-95 hover:shadow-2xl px-6 py-3  ${className}`}
    >
      {label}
      <span className="w-6 aspect-square flex items-center justify-center bg-white rounded-full text-primary">
        <ICon />
      </span>
    </Link>
  );
};

export default LinkButton;

export const ICon = () => (
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
