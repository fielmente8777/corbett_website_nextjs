import Form1 from "@/components/forms/Form1";

type Props = {
  enquiryForm: {
    title: string;
    privacyNote: string;
  };
};

export default function ContactForm({ enquiryForm }: Props) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
      
      <h2 className="text-3xl font-semibold uppercase">
        {enquiryForm.title}
      </h2>

      <Form1 />

      <p className="text-sm text-gray-500">
        {enquiryForm.privacyNote}
      </p>

    </div>
  );
}