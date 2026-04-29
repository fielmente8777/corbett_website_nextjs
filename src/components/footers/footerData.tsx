import { contacts } from "@/utils/constant";
import {
  CallIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LocationIcon,
  MailIcon,
  TwitterIcon,
} from "@/utils/icons";

export const SocialLinks = [
  {
    label: Object.keys(contacts.socialContacts)[0],
    href: contacts.socialContacts.facebook,
    icon: <FacebookIcon />,
  },
  {
    label: Object.keys(contacts.socialContacts)[2],
    href: contacts.socialContacts.instagram,
    icon: <InstagramIcon />,
  },
  {
    label: Object.keys(contacts.socialContacts)[4],
    href: contacts.socialContacts.linkedin,
    icon: <LinkedinIcon />,
  },
  {
    label: Object.keys(contacts.socialContacts)[5],
    href: contacts.socialContacts.twitter,
    icon: <TwitterIcon />,
  },
];

interface WebSiteFooterData {
  logo: string;
  description: string;
  link: {
    label: string;
    href: string;
  };
  lists: {
    title?: string;
    links: {
      title?: string;
      icon?: React.ReactNode;
      label: string;
      href: string;
      label2?: string;
      href2?: string;
    }[];
  }[];
}

export const webSiteFooterData: WebSiteFooterData = {
  logo: "/footer_logo.png",
  description: "Reserve your luxury holiday!",
  link: {
    label: "Book Now",
    href: contacts.WhatsAppCta,
  },
  lists: [
    {
      links: SocialLinks,
    },
    {
      title: "Quick Links",
      links: [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "About Us",
          href: "/about-us",
        },
        {
          label: "Rooms & Cottages",
          href: "/accommodation",
        },
        {
          label: "Weddings",
          href: "/weddings",
        },
        {
          label: "Gallery",
          href: "/gallery",
        },
        {
          label: "Contact Us",
          href: "/contact",
        },
      ],
    },
    {
      title: "Rooms",
      links: [
        {
          label: "Superior Rooms",
          href: "/accommodation/#superior-rooms",
        },
        {
          label: "Classic Cottages",
          href: "/accommodation/#classic-cottages",
        },
        {
          label: "Premium Cottages",
          href: "/accommodation/#premium-cottages",
        },
        {
          label: "Plunge Pool Cottages",
          href: "/accommodation/#plunge-pool-cottages",
        },
      ],
    },
    {
      title: "Policies",
      links: [
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "Terms & Conditions",
          href: "/terms-and-conditions",
        },
      ],
    },
    {
      title: "Contact Us",
      links: [
        {
          icon: <LocationIcon />,
          label:  contacts.addresses[0].address,
          href: contacts.addresses[0].addressUrl,
        },
        {
          icon: <CallIcon />,
          label: contacts.phone[0],
          href: "tel:" + contacts.phone[0],
          label2: contacts.phone[1],
          href2: "tel:" + contacts.phone[1],
        },
        {
          icon: <MailIcon />,
          label: contacts.email[0],
          href: "mailto:" + contacts.email[0],
        },
        {
          icon: <MailIcon />,
          label: contacts.email[1],
          href: "mailto:" + contacts.email[1],
        },
      ],
    },
  ],
};
