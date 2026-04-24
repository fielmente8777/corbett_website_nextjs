"use client";

import useBookingForm from "@/hooks/useBookingForm";
import { countries } from "@/utils/countryCode";
import { OutLineDropDownIcon, RightTickIcon } from "@/utils/icons";

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
            <RightTickIcon />
          </>
        )}
      </button>
    </form>
  );
};

export default Form1;