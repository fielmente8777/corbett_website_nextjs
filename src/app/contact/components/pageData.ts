import { FillPhoneIcon, FillLocationIcon, FillMailIcon } from "@/utils/icons";

export const contactPageData = {
  visitData: {
    title: "GET IN TOUCH!",
    links: [
      {
        label:
          "8th Floor, Jaina Tower-1, District Centre, Janakpuri, West Delhi, India",
        href: "#",
        icon: FillLocationIcon ,
      },
      {
        label: "+91 89589 88800, +91 98710 10068",
        href: "tel:+918958988800",
        icon: FillPhoneIcon ,
      },
      {
        label:
          "reservations@corbettthegrand.com, info@corbettthegrand.com",
        href: "mailto:reservations@corbettthegrand.com",
        icon: FillMailIcon,
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
    privacyNote: "We respect your privacy. Your information is never shared.",
  },

  travelInfo: {
    mapUrl: "https://www.google.com/maps?q=Janakpuri+West+Delhi&output=embed",
  },
};