import { BannerWithVideoProps } from "@/@types/@types";
import { Section } from "../sectionComponants";


const BannerWithVideo: React.FC<BannerWithVideoProps> = ({
    images,
    actions,
    title,
    subtitle,
    description,
    SocialLinks,
    note
}) => {
    return (
        <Section defaultPadding={false} className="px-6">
            Enter
        </Section>
    );
}

export default BannerWithVideo;