import { SocialLinks } from "@/components/footers/footerData";
import { contacts } from "@/utils/constant";
import { AdventureActivitiesIcon, BoatingIcon, ConferenceHallIcon, DiscothequeIcon, IndoorKidPlayZoneIcon, JacuzziIcon, MiniTheatreIcon, OutdoorKidsZoneIcon, PartyLawnsIcon, RainDanceIcon, SpaIcon, SwimmingPoolIcon } from "@/utils/experiences";

export const homePageData = {
  bannerData: {
    title: "Not Just a Stay.",
    subtitle: "A Grand Experience.",
    description:
      "Immerse yourself in refined comfort, surrounded by the untamed beauty of Corbett.",
    SocialLinks,
    images: ["/home/bnr.png"],
    video:
      "https://eazotel-client-webp-image.s3.ap-south-1.amazonaws.com/corbatt-the-grand/Property+Full+Video+(1).mp4",
    actions: [
      { label: "PLAY VIDEO", href: "#" },
      { label: "ABOUT US", href: "/about-us" },
      {
        label: "Call:" + contacts.phone[0],
        href: "tel:" + contacts.phone[1] + "",
      },
    ],
    note: "Scroll to explore",
  },

  introData: {
    title: "WELCOME TO Corbett The Grand",
    description: [
      "Life is all about perspectives and the fun lies in comprehending it.",
      "At Corbett The Grand, we realise the magnitude of the idea called Corbett National Park and bring to you the very same perspective both in terms of scale and purpose. Our resort is a product of our love for Kumaun and its unique culture. In every aspect of our resort, you shall find a touch of our concern for the local ecosystem and traditions.",
      "Our sprawling resort stands majestically amidst swaying paddy fields adjoining decades old mango and lychee orchards, which add to the green quotient of the locale.",
    ],
    image: "/home/intro-1.png",
    video: {
      src: "/resort-video.mp4",
      poster: "/home/intro-2.png",
    },
    link: {
      label: "EXPLORE ROOMS",
      href: "/accommodation",
    },
  },

  highlightData: {
    items: [
      "150+ plush Cottages and Rooms",
      "Since 2016 on the foothills of kumaon",
      "20+ acres of landscaped gardens",
    ],
  },

  experiencesData: {
    title: "Resort Experiences",
    items: [
      {
        icon: <SpaIcon />,
        title: "SPA",
        description:
          "Relax and rejuvenate with holistic wellness treatments designed to soothe your body and mind in a serene forest setting.",
        images: ["/home/resort-exp/spa-1.png", "/home/Img2.webp"],
      },
      {
        icon: <DiscothequeIcon />,
        images: [
          "/home/resort-exp/discotheque-1.png",
          "/home/resort-exp/discotheque-2.png",
        ],
        title: "Discotheque",
        description:
          "Dance the night away with vibrant music, dazzling lights, and a lively atmosphere at our in-house discotheque.",
      },
      {
        icon: <AdventureActivitiesIcon />,
        images: [
          "/home/resort-exp/adventure-activites-1.png",
          "/home/resort-exp/adventure-activites-2.png",
        ],
        title: "Adventure Activities",
        description:
          "Experience thrilling outdoor adventures including trekking, rope activities, ziplining, and more—perfect for adrenaline seekers..",
      },
      {
        icon: <BoatingIcon />,
        images: [
          "/home/resort-exp/boating-1.png",
          "/home/resort-exp/boating-2.png",
        ],
        title: "Boating",
        description:
          "Enjoy peaceful moments on water with scenic boat rides, surrounded by natural beauty.",
      },
      {
        icon: <JacuzziIcon />,
        images: [
          "/home/resort-exp/jacuzzi-1.png",
          "/home/resort-exp/jacuzzi-2.png",
        ],
        title: "Jacuzzi",
        description:
          "Unwind in a warm, bubbling Jacuzzi—perfect for post-safari relaxation and soothing tired muscles.",
      },
      {
        icon: <OutdoorKidsZoneIcon />,
        images: [
          "/home/resort-exp/outdoor-kids-zone-1.png",
          "/home/resort-exp/outdoor-kids-zone-2.png",
        ],
        title: "Outdoor Kids Zone",
        description:
          "Let your children play freely in our safe and fun-filled outdoor area with slides, swings, and games.",
      },
      {
        icon: <RainDanceIcon />,
        images: [
          "/home/resort-exp/rain-dance-1.png",
          "/home/resort-exp/rain-dance-2.png",
        ],
        title: "Rain Dance",
        description:
          "Groove to upbeat music under artificial rain showers for a splash of fun and excitement.",
      },
      {
        icon: <IndoorKidPlayZoneIcon />,
        images: [
          "/home/resort-exp/indoor-play-zone-1.png",
          "/home/resort-exp/indoor-play-zone-2.png",
        ],
        title: "Indoor Kid Play Zone",
        description:
          "A vibrant indoor space packed with toys, games, and soft play zones to keep your little ones happily engaged.",
      },
      {
        icon: <PartyLawnsIcon />,
        images: [
          "/home/resort-exp/party-lawns-1.png",
          "/home/resort-exp/party-lawns-2.png",
        ],
        title: "Party Lawns",
        description:
          "Spacious, green lawns ideal for weddings, private events, and outdoor celebrations amidst nature.",
      },
      {
        icon: <ConferenceHallIcon />,
        images: [
          "/home/resort-exp/conference-hall-1.png",
          "/home/resort-exp/conference-hall-2.png",
        ],
        title: "Conference Hall",
        description:
          "Modern and well-equipped conference hall, perfect for business meetings, workshops, and corporate retreats.",
      },
      {
        icon: <MiniTheatreIcon />,
        images: [
          "/home/resort-exp/mini-theatre-1.png",
          "/home/resort-exp/mini-theatre-2.png",
        ],
        title: "Mini Theatre",
        description:
          "Enjoy movies or private screenings in our cozy mini theatre equipped with modern audio-visual systems.",
      },
      {
        icon: <SwimmingPoolIcon />,
        images: ["/home/resort-exp/pool-1.png", "/home/resort-exp/pool-2.png"],
        title: "Swimming Pool",
        description:
          "Take a refreshing dip or relax by the poolside with scenic views and peaceful ambiance.",
      },
    ],
    link: {
      label: "Contact Us",
      href: "/contact",
    },
  },

  wedding: {
    link: {
      label: "Explore Weddings",
      href: "/weddings",
    },
    images: ["/home/wedding.png", "/home/wedding-2.png"],
  },

  nearbyData: {
    title: "NEARBY ATTRACTIONS",
    description:
      "Iconic destinations and experiences just a short distance from your stay.",

    items: [
      {
        title: "CORBETT JUNGLE SAFARI",
        image: "/home/nearby-1.png",
      },
      {
        title: "CORBETT WATERFALL",
        image: "/home/nearby-2.png",
      },
      {
        title: "HANUMAN DHAM, CHOI",
        image: "/home/nearby-3.png",
      },
      {
        title: "CORBETT JUNGLE SAFARI",
        image: "/home/nearby-1.png",
      },
      {
        title: "CORBETT WATERFALL",
        image: "/home/nearby-2.png",
      },
      {
        title: "HANUMAN DHAM, CHOI",
        image: "/home/nearby-3.png",
      },
    ],
  },

  testimonialData: {
    title: "Guest “Experiences”",
    testimonials: [
      {
        name: "Nidhi",
        location: "New Delhi",
        text: "Our stay at Corbett The Grand was truly delightful! The hospitality was exceptional — every staff member went above and beyond to make us feel comfortable and welcomed. The food was delicious with great variety, and every meal felt freshly prepared with care. The location is perfect — surrounded by serene greenery and scenic views that instantly make you feel relaxed. It’s an ideal place to unwind with family while enjoying comfort, nature and warm service. Highly recommended!",
        image: "images/testi-img2.jpg",
      },
      {
        name: "Ashish",
        location: "Noida",
        text: "I had a wonderful stay in the cottage room! The property is beautifully maintained, with lush greenery all around that instantly makes you feel relaxed and connected to nature. The cottage itself was cozy, clean, and well-appointed—perfect for a peaceful getaway. The overall ambiance of the place is serene and luxurious, offering a perfect blend of comfort and natural beauty. Highly recommended for anyone looking to unwind in a green, lavish setting!",
        image: "images/testi-img3.jpg",
      },
      {
        name: "Himanshu",
        location: "Meerut",
        text: "We recently stayed at Corbett The Grand and had an absolutely wonderful experience! The food was exceptionally delicious, offering a variety that pleased every taste bud. Our pool-view room was brilliant, with a perfect blend of comfort and breathtaking scenery. Surrounded by lush greenery, the property is a treat for nature lovers. The kids enjoyed the fun activities, while the discotheque added a lively touch to our evenings. Truly a perfect getaway for families!",
        image: "images/testi-img4.jpg",
      },
      {
        name: "Namrata",
        location: "Gurugram",
        text: "We had a great stay and amazing arrangements for my daughter’s wedding. The team coordinated the events with such considerable number of guests with such spirit. Thanks for their hospitality.",
        image: "images/testi-img1.jpg",
      },
    ],
    image: "/home/testimonial.png",
  },
};
