import { Section } from "../sectionComponants";
import { LazyLoadedVideo } from "../Video";

interface Props {
  video: {
    src: string;
    poster: string;
  };
}

const VideoBanner: React.FC<Props> = ({ video }) => {
  return (
    <Section defaultPadding={false} className="lg:px-6 px-4">
      <div className="overflow-hidden rounded-4xl md:aspect-4/1.75 aspect-4/4.25">
        <LazyLoadedVideo
          src={video.src}
          poster={video.poster}
          muted
          autoPlay
          loop
        />
      </div>
    </Section>
  );
};

export default VideoBanner;
