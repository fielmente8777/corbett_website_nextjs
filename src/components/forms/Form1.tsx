"use client";

import useBookingForm from "@/hooks/useBookingForm";
import { countries } from "@/utils/countryCode";
import { createPortal } from "react-dom";
import Recaptcha from "./Recaptcha";

const Form1 = () => {
  const {
    isSubmitting,
    errors,
    handleSubmit,
    formData,
    handleChange,
    setFieldValue,
    captchaKey,
    captchaOpen,
    closeCaptcha,
    handleCaptchaError,
    submitLead,
  } = useBookingForm({
    includeMessage: true,
    onSubmitSuccess: () => {},
  });
  const formFields = [
    {
      name: "name",
      label: "Full Name*",
      type: "text",
      value: formData.name,
      onChange: handleChange,
    },
    {
      name: "phone",
      label: "Mobile Number",
      type: "tel",
      value: formData.phone,
      onChange: handleChange,
    },
    {
      name: "email",
      label: "Email ID",
      type: "email",
      value: formData.email,
      onChange: handleChange,
    },
    {
      name: "message",
      label: "Type your message...",
      type: "textarea",
      value: formData.message,
      onChange: handleChange,
    },
  ];
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {formFields.map((field, index) => (
        <>
          {field.type === "textarea" ? (
            <textarea
              key={index}
              name={field.name}
              placeholder={field.label}
              rows={4}
              className="p-4 border border-secondary rounded-lg w-full placeholder:text-[#7F7F7F] focus:outline-none text-p2 resize-none"
              value={field.value}
              onChange={field.onChange}
            ></textarea>
          ) : field.type === "tel" ? (
            <div className="flex" key={index}>
              <div className="relative">
                <select
                  className="py-4 ps-4 border-y border-x rounded-l-lg cursor-pointer border-secondary appearance-none w-full placeholder:text-[#7F7F7F] focus:outline-none text-p2"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => setFieldValue("countryCode", e.target.value)}
                  style={{ width: `${formData.countryCode.length * 3}ch` }}
                  aria-label="Country Code"
                >
                  {countries.map((country, index) => (
                    <option
                      key={index}
                      value={country.code}
                      className="rounded-lg"
                    >
                      {country.code} {country.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <FromDropDown />
                </span>
              </div>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                className="p-4 border-y border-r border-secondary rounded-r-lg w-full placeholder:text-[#7F7F7F] focus:outline-none text-p2"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ) : (
            <input
              key={index}
              type={field.type}
              name={field.name}
              placeholder={field.label}
              className="p-4 border border-secondary rounded-lg w-full placeholder:text-[#7F7F7F] focus:outline-none text-p2"
              value={field.value}
              onChange={field.onChange}
            />
          )}

          {errors[field.name] && (
            <p className="text-red-500">{errors[field.name]}</p>
          )}
        </>
      ))}
      <button
        type="submit"
        className="bg-secondary rounded-lg text-white text-lg py-4"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <span className="flex items-center justify-center gap-2.5">
            Submit
          </span>
        )}
      </button>

      {captchaOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
            onClick={closeCaptcha}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="captcha-title"
              className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeCaptcha();
              }}
            >
              <button
                type="button"
                onClick={closeCaptcha}
                disabled={isSubmitting}
                aria-label="Close"
                className="absolute right-3 top-3 text-2xl leading-none text-gray-500 hover:text-black disabled:opacity-50"
              >
                &times;
              </button>
              <h3 id="captcha-title" className="mb-1 text-lg font-semibold text-black">
                Verify you&apos;re human
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Tick the box below to submit your enquiry.
              </p>

              <Recaptcha
                key={captchaKey}
                onVerify={submitLead}
                onExpire={() => handleCaptchaError("Verification expired. Please tick the box again.")}
                onError={() => handleCaptchaError("Verification failed. Please try again.")}
              />

              {isSubmitting && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span className="block h-5 w-5 animate-spin rounded-full border-t-2 border-secondary" />
                  Submitting your enquiry...
                </div>
              )}
              {errors.captcha && !isSubmitting && (
                <span role="alert" className="mt-3 block text-center text-sm text-red-500">
                  {errors.captcha}
                </span>
              )}
            </div>
          </div>,
          document.body
        )}
    </form>
  );
};

export default Form1;

export const FromDropDown = () => (
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
);
