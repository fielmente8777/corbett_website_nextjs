import Link from "next/link";
import { ReactNode } from "react";

type VisitData = {
  title: string;
  subtitle: string;
  links: {
    prefix: string;
    label: string;
    href: string;
    label2?: string;
    href2?: string;
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

export default function ContactInfo({ visitData }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-primary text-3xl md:text-4xl font-semibold text-white uppercase tracking-widest">
          {visitData.title}
        </h2>
        <p className="md:text-lg text-white/70">{visitData.subtitle}</p>
      </div>

      {/* Contact Links */}
      <ul className="flex flex-col gap-3">
        {visitData.links.map((item, i) => (
          <li key={i} className="flex flex-wrap gap-2 md:text-lg text-white/90">
            <span className="font-semibold text-white">{item.prefix}</span>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
            {item.label2 && (
              <>
                <Link
                  href={item.href2 || "#"}
                  className="text-white/75 hover:text-white transition-colors"
                >
                  {item.label2}
                </Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
