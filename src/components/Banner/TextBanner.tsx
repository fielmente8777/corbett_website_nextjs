import { SectionWithContainer } from "../sectionComponants";
interface TextBannerProps {
  title: string;
}
const TextBanner: React.FC<TextBannerProps> = ({ title }) => {
  return (
    <SectionWithContainer sectionClassName="bg-secondary text-white text-center">
      <h1 className="xl:text-[2.5rem] md:text-4xl text-3xl font-primary">
        {title}
      </h1>
    </SectionWithContainer>
  );
};

export default TextBanner;
