import Form1 from "@/components/forms/Form1";

type Props = {
  enquiryForm: {
    title: string;
    subtitle: string;
    privacyNote: string;
  };
};

export default function ContactForm({ enquiryForm }: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col gap-4">

      {/* Form Header */}
      <div className="flex flex-col gap-1">
        <h2 className="font-primary text-base text-[#2C1810] uppercase tracking-widest">
          {enquiryForm.title}
        </h2>
        <p className="text-xs text-[#686868]">{enquiryForm.subtitle}</p>
      </div>

      <Form1 />
      <button
        type="submit"
        form="contact-form"
        className="w-full py-2.5 bg-[var(--color-secondary)] text-white text-sm uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
}