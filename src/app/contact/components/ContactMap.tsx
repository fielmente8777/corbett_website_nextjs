import LazyLoadedMap from "@/components/map/LazyLoadedMap";

type Props = {
  mapUrl: string;
};

export default function ContactMap({ mapUrl }: Props) {
  return (
    <div className="w-full md:aspect-4/2.25 aspect-4/3 rounded-xl overflow-hidden">
      <LazyLoadedMap src={mapUrl} />
    </div>
  );
}