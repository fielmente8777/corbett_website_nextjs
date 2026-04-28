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
        <h2 className="font-primary md:text-3xl text-2xl text-primary uppercase tracking-widest">
          {enquiryForm.title}
        </h2>
        <p className="md:text-lg text-light">{enquiryForm.subtitle}</p>
      </div>

      <Form1 />
    </div>
  );
}
