import WeddingContent from "./components/WeddingContent";
import WeddingFaq from "./components/WeddingFaq";
import { weddingPageData } from "./components/pageData";

export default function WeddingPage() {
  return (
    <main>
      <WeddingContent{...weddingPageData.curatedData}/>
      <WeddingFaq {...weddingPageData.faqData} />
    </main>
  );
}