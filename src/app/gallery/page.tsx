import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Resort and Wedding Photos | Corbett The Grand", "View photographs of Corbett The Grand, including rooms, cottages, wedding spaces and resort facilities. Explore the settings for your next stay or event.", "/gallery");
import { galleryPageData } from "./components/pageData";
import GalleryBanner from "./components/galleryBanner";
import Gallery from "./components/gallery";

export default function Page() {
  return (
    <main id="main-content">
      <GalleryBanner title={galleryPageData.bannerData.title} />

      <Gallery galleryImages={galleryPageData.gallerySection.galleryImages} />
    </main>
  );
}
