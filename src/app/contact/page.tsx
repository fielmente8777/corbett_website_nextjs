import { contactPageData } from "./components/pageData";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContactMap from "./components/ContactMap";

export default function ContactPage() {
  return (
    <main>

      {/* 🔹 TOP SECTION (Info + Form) */}
      <section className="contact-section max_width">
        
        <ContactInfo
          visitData={contactPageData.visitData}
          reservationsData={contactPageData.reservationsData}
        />

        <ContactForm
          enquiryForm={contactPageData.enquiryForm}
        />

      </section>

      {/* 🔹 MAP SECTION */}
      <section className="contact-map-section max_width">
        <ContactMap
          mapUrl={contactPageData.travelInfo.mapUrl}
        />
      </section>

    </main>
  );
}