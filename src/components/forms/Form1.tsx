"use client";

import useBookingForm from "@/hooks/useBookingForm";
import { countries } from "@/utils/countryCode";

type FieldType = "text" | "email" | "tel" | "textarea";

type FormField = {
  name: keyof typeof initialValues;
  label: string;
  type: FieldType;
};

const initialValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const Form1 = () => {
  const {
    isSubmitting,
    errors,
    handleSubmit,
    formData,
    handleChange,
    setFieldValue,
  } = useBookingForm({
    includeMessage: true,
    onSubmitSuccess: () => {},
  });

  const formFields: FormField[] = [
    { name: "name", label: "Full Name*", type: "text" },
    { name: "phone", label: "Mobile Number", type: "tel" },
    { name: "email", label: "Email ID", type: "email" },
    { name: "message", label: "Type your message...", type: "textarea" },
  ];

  const renderField = (field: FormField) => {
    const value = formData[field.name];

    if (field.type === "textarea") {
      return (
        <textarea
          name={field.name}
          placeholder={field.label}
          rows={4}
          className="p-4 border border-[#D7D7D7] rounded-lg w-full focus:outline-none resize-none"
          value={value}
          onChange={handleChange}
        />
      );
    }

    if (field.type === "tel") {
      return (
        <div className="flex">
          {/* COUNTRY CODE */}
          <div className="relative">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={(e) =>
                setFieldValue("countryCode", e.target.value)
              }
              className="py-4 ps-4 border rounded-l-lg appearance-none"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} {country.name}
                </option>
              ))}
            </select>

            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <OutLineDropDownIcon />
            </span>
          </div>

          {/* PHONE INPUT */}
          <input
            type="tel"
            name="phone"
            placeholder={field.label}
            value={value}
            onChange={handleChange}
            className="p-4 border border-l-0 rounded-r-lg w-full"
          />
        </div>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        placeholder={field.label}
        value={value}
        onChange={handleChange}
        className="p-4 border border-[#D7D7D7] rounded-lg w-full"
      />
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.name}>
          {renderField(field)}

          {errors[field.name] && (
            <p className="text-red-500 text-sm">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-p1 rounded-lg text-white text-lg py-4 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            Send Enquiry
            {/* <RightTickIcon /> */}
          </>
        )}
      </button>
    </form>
  );
};

export default Form1;


export const OutLineDropDownIcon = () => (
  <svg
    width={24}
    height={12}
    viewBox="0 0 24 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2084_2516)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9967 8.6575L19.0677 1.5865L20.4817 3.0005L12.7037 10.7785C12.5162 10.966 12.2619 11.0713 11.9967 11.0713C11.7316 11.0713 11.4772 10.966 11.2897 10.7785L3.51172 3.0005L4.92572 1.5865L11.9967 8.6575Z"
        fill="#686868"
      />
    </g>
    <defs>
      <clipPath id="clip0_2084_2516">
        <rect
          width={12}
          height={24}
          fill="white"
          transform="translate(5.24537e-07 12) rotate(-90)"
        />
      </clipPath>
    </defs>
  </svg>
)
