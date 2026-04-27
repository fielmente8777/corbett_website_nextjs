import { ReactNode } from "react";

type VisitData = {
  title: string;
  subtitle: string;
  links: {
    prefix: string;
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

export default function ContactInfo({ visitData, reservationsData }: Props) {
  return (
    <div className="flex flex-col gap-6">

      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-primary text-3xl font-semibold text-white uppercase tracking-widest">
          {visitData.title}
        </h2>
        <p className="text-sm text-white/70">{visitData.subtitle}</p>
      </div>

      {/* Contact Links */}
      <ul className="flex flex-col gap-4">
        {visitData.links.map((item, i) => (
          <li key={i} className="flex flex-col gap-0.5 text-sm text-white/90 leading-relaxed">
            <span className="font-semibold text-white">{item.prefix}</span>
            <a href={item.href} className="text-white/75 hover:text-white transition-colors">
              {item.label}
            </a>
          </li>
        ))}
      </ul>

    </div>
  );
}