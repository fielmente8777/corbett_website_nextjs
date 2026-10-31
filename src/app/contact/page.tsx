import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Contact Corbett The Grand | Stay and Event Enquiries", "Contact Corbett The Grand in Ramnagar for room availability, destination weddings and corporate offsites. Find our location and speak to the relevant team.", "/contact");
import { contactPageData } from "./components/pageData";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContactMap from "./components/ContactMap";
import { Section, SectionWithContainer } from "@/components/sectionComponants";

export default function ContactPage() {
  return (
    <main id="main-content">
      <div className="max_width py-10"><p className="eyebrow">Stay and event enquiries</p><h1 className="font-primary text-3xl md:text-5xl mt-3">Contact Corbett The Grand</h1></div>

      <SectionWithContainer sectionClassName="bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT — Info */}
          <div className="flex items-center">
            <ContactInfo
              visitData={contactPageData.visitData}
            />
          </div>

          {/* RIGHT — Form with left border */}
          <div className="flex md:items-end md:justify-end">
            <div className="w-full lg:max-w-lg">
              <ContactForm />
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
