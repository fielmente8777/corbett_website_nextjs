import { contactPageData } from "./components/pageData";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContactMap from "./components/ContactMap";
import { Section, SectionWithContainer } from "@/components/sectionComponants";

export default function ContactPage() {
  return (
    <main>
      {/* TOP SECTION */}

      <SectionWithContainer sectionClassName="bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT — Info */}
          <div className="flex items-center">
            <ContactInfo
              visitData={contactPageData.visitData}
              reservationsData={contactPageData.reservationsData}
            />
          </div>

          {/* RIGHT — Form with left border */}
          <div className="flex md:items-end md:justify-end">
            <div className="w-full lg:max-w-lg">
              <ContactForm enquiryForm={contactPageData.enquiryForm} />
            </div>
          </div>
        </div>
      </SectionWithContainer>

      {/* MAP SECTION */}
      {/* <SectionWithContainer sectionClassName="py-16 bg-[var(--color-primary)]">
        <div className="max_width">
          <ContactMap mapUrl={contactPageData.travelInfo.mapUrl} />
        </div>
      </SectionWithContainer> */}
      <Section defaultPadding={false}>
        <ContactMap mapUrl={contactPageData.travelInfo.mapUrl} />
      </Section>
    </main>
  );
}
