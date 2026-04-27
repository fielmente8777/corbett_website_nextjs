import { contactPageData } from "./components/pageData";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContactMap from "./components/ContactMap";
import { SectionWithContainer } from "@/components/sectionComponants";

export default function ContactPage() {
  return (
    <main>

      {/* TOP SECTION */}
    
      <SectionWithContainer sectionClassName  ="bg-[var(--color-secondary)]">
        <div className="max_width">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]">

            {/* LEFT — Info */}
            <div className="flex items-center py-16 pr-10">
              <ContactInfo
                visitData={contactPageData.visitData}
                reservationsData={contactPageData.reservationsData}
              />
            </div>

            {/* RIGHT — Form with left border */}
            <div className="flex items-center justify-center py-16 pl-10 border-l border-[var(--color-secondary)]">
              <div className="w-full max-w-md">
                <ContactForm enquiryForm={contactPageData.enquiryForm} />
              </div>
            </div>

          </div>
        </div>
      </SectionWithContainer>

      {/* MAP SECTION */}
      <SectionWithContainer sectionClassName="py-16 bg-[var(--color-primary)]">
        <div className="max_width">
          <ContactMap mapUrl={contactPageData.travelInfo.mapUrl} />
        </div>
      </SectionWithContainer>

    </main>
  );
}