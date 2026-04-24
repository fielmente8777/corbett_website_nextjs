"use client";
import { usePathname } from "next/navigation";
import WebSiteFooter from "./WebSiteFooter";
const Footer = () => {
  const pathName = usePathname();
  const RenderFooter = WebSiteFooter;
  switch (pathName) {
    case "/thank-you/":
      return null;

    default:
      return <RenderFooter />;
  }
};

export default Footer;
