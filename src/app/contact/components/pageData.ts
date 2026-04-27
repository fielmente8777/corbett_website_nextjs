import {contacts} from "@/utils/constant";
import { CallIcon, LocationIcon,MailIcon } from "@/utils/icons";
export const contactPageData = {
  visitData: {
    title: "GET IN TOUCH!",
    subtitle: "We're Here to Help You Plan Your Next Luxury Stay!",
    links: [
      {
        prefix: "Call Us:",
        label: "+91 89589 88800, +91 98710 10068",
        href: "tel:+918958988800",
        icon: CallIcon,
      },
      {
        prefix: "Email:",
        label: "reservations@corbettthegrand.com, info@corbettthegrand.com",
        href: "mailto:reservations@corbettthegrand.com",
        icon: MailIcon,
      },
      {
        prefix: "Address:",
        label: "818, 8th floor, Jaina Tower-1, District Centre, Janakpuri, West Delhi, India",
        href: "#",
        icon: LocationIcon,
      },
    ],
  },

  reservationsData: {
    title: "RESERVATIONS & ENQUIRIES",
    items: [
      "Room Bookings",
      "Restaurant Bookings",
      "Private Events",
      "On-site Parking Available",
    ],
  },

  enquiryForm: {
    title: "HAVE QUESTIONS?",
    subtitle: "Contact Us and Start Your Stay!",
    privacyNote: "We respect your privacy. Your information is never shared.",
  },

  travelInfo: {
    mapUrl: contacts.addresses[0].mapUrl,
  },
};