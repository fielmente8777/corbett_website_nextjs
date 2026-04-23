"use client";

import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="footer__sec bg-[#0E385D] text-white">
      <div className="container mx-auto max-w-[1320px]">

        <div className="flex gap-10 justify-between">

          {/* LOGO */}
          <div className="item">
            <Image src="/images/footer_logo.png" alt="logo" width={150} height={80} />
          </div>

          {/* NAVIGATION */}
          <div className="item">
            <h4>Navigation</h4>
            <ul className="foot_list">
              <li><a href="#">Rooms & Cottages</a></li>
              <li><a href="#">Facilities</a></li>
              <li><a href="#">Weddings</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* ACCORDION */}
          <div className="item">

            <h4>CONTACT US</h4>

            {/* Individual */}
            <div className="acc-item">
              <div
                className="acc-header"
                onClick={() => toggleSection("individual")}
              >
                FOR INDIVIDUAL STAYS
                <span className={`arrow ${openSection === "individual" ? "open" : ""}`}></span>
              </div>

              <div className={`acc-body ${openSection === "individual" ? "open" : ""}`}>
                <div className="acc-content">
                  <a href="tel:+918958988800" className="contact-link">
                    +91 89589 88800
                  </a>
                </div>
              </div>
            </div>

            {/* Corporate */}
            <div className="acc-item">
              <div
                className="acc-header"
                onClick={() => toggleSection("corporate")}
              >
                FOR CORPORATE BOOKINGS
                <span className={`arrow ${openSection === "corporate" ? "open" : ""}`}></span>
              </div>

              <div className={`acc-body ${openSection === "corporate" ? "open" : ""}`}>
                <div className="acc-content">
                  <a href="tel:+919711871016" className="contact-link">
                    +91 9711871016
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="copyright text-sm mt-6 flex justify-between">
          <p>© 2025 Corbett the grand. All Rights Reserved.</p>
          <p>Terms & Conditions | Privacy Policy</p>
        </div>

      </div>
    </footer>
  );
}