import { contacts } from "@/utils/constant";
import { CallIcon, LocationIcon, MailIcon } from "@/utils/icons";
export const contactPageData = {
  visitData: {
    title: "Resort Address",
    subtitle: "We're Here to Help You Plan Your Next Luxury Stay!",
    address: {
      label: contacts.addresses[0].address,
      href: contacts.addresses[0].addressUrl,
    },
    links: [
      {
        prefix: "Call Us:",
        label: contacts.phone[0],
        href: "tel:" + contacts.phone[0],
        label2: contacts.phone[1],
        href2: "tel:" + contacts.phone[1],
        icon: CallIcon,
      },
      {
        prefix: "Email:",
        label: contacts.email[0],
        href: "mailto:" + contacts.email[0],
        label2: contacts.email[1],
        href2: "mailto:" + contacts.email[1],
        icon: MailIcon,
      },
      {
        prefix: "Address:",
        label:
          "818, 8th floor, Jaina Tower-1, District Centre, Janakpuri, West Delhi, India",
        href: "#",
        icon: LocationIcon,
      },
    ],
    contactInfos: [
      {
        title: "Individual Stays",
        links: [
          {
            label: contacts.contactInfos.individualStays.phoneNumbers[0],
            href:
              "tel:" + contacts.contactInfos.individualStays.phoneNumbers[0],
            label2: contacts.contactInfos.individualStays.phoneNumbers[1],
            href2:
              "tel:" + contacts.contactInfos.individualStays.phoneNumbers[1],
            icon: CallIcon,
          },
          {
            label: contacts.contactInfos.individualStays.emails[0],
            href: "mailto:" + contacts.contactInfos.individualStays.emails[0],
            label2: contacts.contactInfos.individualStays.emails[1],
            href2: "mailto:" + contacts.contactInfos.individualStays.emails[1],
            icon: MailIcon,
          },
        ],
      },
      {
        title: "Corporate",
        links: [
          {
            label: contacts.contactInfos.corporate.phoneNumbers[0],
            href:
              "tel:" + contacts.contactInfos.corporate.phoneNumbers[0],
            icon: CallIcon,
          },
          {
            label: contacts.contactInfos.corporate.emails[0],
            href: "mailto:" + contacts.contactInfos.corporate.emails[0],
            label2: contacts.contactInfos.corporate.emails[1],
            href2: "mailto:" + contacts.contactInfos.corporate.emails[1],
            icon: MailIcon,
          },
        ],
      },
      {
        title: "WEDDING",
        links: [
          {
            label: contacts.contactInfos.wedding.phoneNumbers[0],
            href:
              "tel:" + contacts.contactInfos.wedding.phoneNumbers[0],
            icon: CallIcon,
          },
          {
            label: contacts.contactInfos.wedding.emails[0],
            href: "mailto:" + contacts.contactInfos.wedding.emails[0],
            label2: contacts.contactInfos.wedding.emails[1],
            href2: "mailto:" + contacts.contactInfos.wedding.emails[1],
            icon: MailIcon,
          },
        ],
      },
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
