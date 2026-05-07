import Link from "next/link";

type VisitData = {
  title: string;
  subtitle: string;
  address: {
    label: string;
    href: string;
  };
  links: {
    prefix: string;
    label: string;
    href: string;
    label2?: string;
    href2?: string;
    icon: React.ElementType;
  }[];
  contactInfos: {
    title: string;
    links: {
      label: string;
      href: string;
      label2?: string;
      href2?: string;
      icon: React.ElementType;
    }[];
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
        {/* <p className="md:text-lg text-white/70">{visitData.subtitle}</p> */}
        <Link
          href={visitData.address.href}
          className="text-white/75 hover:text-white transition-colors text-lg"
        >
          {visitData.address.label}
        </Link>
      </div>

      {/* Contact Links */}
      {/* <ul className="flex flex-col gap-3">
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
      </ul> */}

      <div className="space-y-6">
        {visitData.contactInfos.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border border-white rounded-2xl p-4"
          >
            <p className="font-primary text-xl md:text-2xl font-semibold text-white uppercase tracking-widest">
              {item.title}
            </p>
            <ul className="flex flex-col gap-2">
              {item.links.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] lg:items-center gap-2  text-white/90"
                >
                  <span>{item.icon && <item.icon />}</span>

                  <span className="flex flex-wrap gap-1">
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/75 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.label2 && <span className="">,</span>}
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
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
