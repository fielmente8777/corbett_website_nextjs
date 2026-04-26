import { NearbyProps } from "@/@types/@types";
import Image from "next/image";

const NearByCard: React.FC<NearbyProps["items"][0]> = ({ image, title }) => {
  return (
    <div className="relative w-full aspect-4/4  overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-x-0 z-20 text-white bottom-6">
        <p className="md:text-2xl text-lg text-center font-primary uppercase">{title}</p>
      </div>
      <div className="bg-linear-0 from-[#000000]/40 via-[#000000]/30 to-[#000000]/10 absolute inset-x-0 h-[30%] bottom-0 z-10" />
    </div>
  );
};

export default NearByCard;
