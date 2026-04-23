"use client";
import useBookingForm from "@/hooks/useBookingForm";
import { ArrowUpIcons, FromDropDown } from "@/utils/icons";
import { countries } from "../../utils/constent";
import { CalendarIcon, CallIcon, MailIcon, UserIcon } from "@/utils/formIcons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDateInputLimits } from "@/hooks/getDateInputLimits";
import { useState } from "react";

interface Props {
  gridView?: boolean;
}
const Form2 = ({ gridView }: Props) => {
  const {
    isSubmitting,
    errors,
    handleSubmit,
    formData,
    handleChange,
    setFieldValue,
  } = useBookingForm({
    includeCheckIn: true,
    includeCheckOut: true,
    onSubmitSuccess: () => {},
  });
  const { min, max } = getDateInputLimits({
    showPast: false,
    showFuture: true,
  });

  const minDate = min ? new Date(min) : undefined;
  const maxDate = max ? new Date(max) : undefined;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);

    if (start) {
      setFieldValue("checkIn", start.toISOString().split("T")[0]);
    }

    if (end) {
      setFieldValue("checkOut", end.toISOString().split("T")[0]);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
      icon: <UserIcon />,
    },
    {
      name: "phone",
      label: "Ph Number",
      type: "tel",
      value: formData.phone,
      onChange: handleChange,
      icon: <CallIcon />,
    },
    {
      name: "email",
      label: "Email ID",
      type: "email",
      value: formData.email,
      onChange: handleChange,
      icon: <MailIcon />,
    },
    {
      name: "checkIn",
      label: "Check-in & out",
      type: "date",
      value: formData.checkIn || "",
      onChange: handleChange,
      icon: <CalendarIcon />,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`${gridView ? "flex flex-col divide-y divide-p1" : "grid md:grid-cols-5 items-center gap-3.5 "} py-3 px-4 bg-white  max-md:divide-y divide-p1`}
    >
      {formFields.map((field, index) => (
        <>
          {field.type === "date" ? (
            <div
              className={`flex items-center gap-2.5 ${gridView ? "py-4" : "max-md:pb-4 max-md:pt-2"}`}
              key={index}
            >
              <label className="text-p2">{field.icon}</label>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={field.label}
                className={`${gridView ? "" : "border-p1  md:border-r"} outline-none w-full h-full bg-transparent text-base text-dark  placeholder:text-[#7F7F7F] focus:outline-none text-p2 `}
                wrapperClassName="w-full h-full !flex items-center"
              />
            </div>
          ) : field.type === "tel" ? (
            <div
              className={`flex items-center gap-2.5 ${gridView ? "py-4" : "max-md:pb-4 max-md:pt-2"}`}
              key={index}
            >
              <label className="text-p2">{field.icon}</label>
              <div className="relative">
                <select
                  className="ps-2 cursor-pointer border-p1 appearance-none w-full placeholder:text-[#7F7F7F] focus:outline-none text-p2"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => setFieldValue("countryCode", e.target.value)}
                  style={{ width: `${formData.countryCode.length * 2}ch` }}
                   aria-label="Country Code"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.code} className="">
                      {country.code}
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
                className={`w-full placeholder:text-[#7F7F7F] focus:outline-none text-p2 ${gridView ? "" : "border-p1 md:border-r"}`}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ) : (
            <div
              className={`flex items-center gap-2.5 ${gridView ? "py-4" : "max-md:pb-4 max-md:pt-2"}`}
              key={index}
            >
              <label className="text-p2">{field.icon}</label>
              <input
                key={index}
                type={field.type}
                name={field.name}
                placeholder={field.label}
                className={`w-full placeholder:text-[#7F7F7F] focus:outline-none text-p2 ${gridView ? "" : "border-p1 md:border-r"}`}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}

          {errors[field.name] && (
            <p className="text-red-500">{errors[field.name]}</p>
          )}
        </>
      ))}
      <button type="submit" className="bg-p1  text-white text-lg py-3">
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <span className="flex items-center justify-center gap-2.5">
            Book Now{" "}
            <span>
              <ArrowUpIcons />
            </span>{" "}
          </span>
        )}
      </button>
    </form>
  );
};

export default Form2;
