import { roomsPageData } from "@/app/accommodation/components/pageData";

const summaries: Record<string, { summary: string; setting: string; features: string[] }> = {
  "superior-rooms": { summary: "A room with a private balcony overlooking the gardens. Settle into a comfortable base for a Corbett break, a family gathering or a celebration at the resort.", setting: "Garden views and private balcony", features: ["Private balcony overlooking the gardens", "A king bed and the published two-guest room arrangement", "A place to unwind between resort experiences and outings"] },
  "classic-cottages": { summary: "Enjoy a cottage setting with a private open sit-out. Take your time over a quiet morning and return to your own space after exploring Corbett.", setting: "Garden setting and private sit-out", features: ["Private open sit-out", "A king bed and the published two-guest room arrangement", "A cottage setting within the resort's landscaped surroundings"] },
  "premium-cottages": { summary: "Choose a pool-facing cottage for your stay at Corbett The Grand. Enjoy the outlook and a comfortable retreat between meals, outings and time together.", setting: "Pool-facing views", features: ["Pool-facing outlook", "A king bed and the published two-guest room arrangement", "Shared resort experiences to plan around your stay"] },
  "plunge-pool-cottages": { summary: "A cottage with its own private plunge pool and sun deck. Spend time in your own space and shape a Corbett escape around the pace you enjoy.", setting: "Private plunge pool and sun deck", features: ["Private plunge pool", "Exclusive sun deck", "A king bed and the published two-guest room arrangement"] },
};

export const roomCatalog = roomsPageData.rooms.map(room => {
  const slug = room.name.toLowerCase().replace(/\s+/g, "-");
  return { slug, name: room.name, path: `/accommodation/${slug}`, images: room.images, amenities: room.amenities.map(item => item.name), details: room.details, ...summaries[slug] };
});
