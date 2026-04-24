import { ReactNode } from "react";

type VisitData = {
  title: string;
  links: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
};

type ReservationsData = {
  title: string;
  items: string[];
};

type Props = {
  visitData: VisitData;
  reservationsData: ReservationsData;
};

export default function ContactInfo({
  visitData,
  reservationsData,
}: Props) {
  return (
    <div className="space-y-10">

      {/* Visit */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold">{visitData.title}</h2>

        <ul className="space-y-3">
         {visitData.links.map((item, i) => {
  const Icon = item.icon; // 

  return (
    <li key={i} className="flex gap-3">
      <Icon />   
      {item.label}
    </li>
  );
})}
        </ul>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Reservations */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold">
          {reservationsData.title}
        </h2>

        <ul className="space-y-3">
          {reservationsData.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}