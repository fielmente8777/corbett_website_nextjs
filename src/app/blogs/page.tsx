import { pageMetadata } from "@/lib/seo";
import BlogArchive from "@/components/Editorial/BlogArchive";
export const metadata = pageMetadata("Jim Corbett Travel and Wedding Guides | Corbett The Grand", "Explore 50 practical guides to Corbett weddings, family stays, safaris, local attractions and corporate offsites. Find advice for your next trip.", "/blogs");
export default function BlogIndex() { return <BlogArchive />; }
