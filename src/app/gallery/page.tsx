import { galleryPageData } from "./components/pageData";
import GalleryBanner from "./components/galleryBanner";
import Gallery from "./components/gallery";

export default function Page() {
  return (
    <main>
      <GalleryBanner title={galleryPageData.bannerData.title} />

      <Gallery galleryImages={galleryPageData.gallerySection.galleryImages} />
    </main>
  );
}
