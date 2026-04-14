"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";


const rotatingItems = [
  {
    href: "/services/liferay-upgrade/",
    label: "Liferay Upgradation",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/liferay_Upgradation.svg",
    className: "img1",
  },
  {
    href: "/services/web-portal-development/",
    label: "Web Portal Development",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Web_Portal_Devlopment.svg",
    className: "img2",
  },
  {
    href: "/services/enterprise-portal-development/",
    label: "Enterprise Portal Development",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Enterprise_Portal_Development.svg",
    className: "img3",
  },
  {
    href: "/services/liferay-consulting-services/",
    label: "Liferay Consulting",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Liferay_Consulting.svg",
    className: "img4",
  },
  {
    href: "/solutions/supplier-and-vendor-portal/",
    label: "Supplier And Vendor Portal",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Supplier_and_vendor_portal.svg",
    className: "img5",
  },
  {
    href: "/solutions/customer-self-service-portal/",
    label: "Customer Self Service Portal",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Customer_Self_Service_Portal.svg",
    className: "img6",
  },
  {
    href: "/services/liferay-migration-services/",
    label: "Liferay Migration",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Liferay_Migration.svg",
    className: "img7",
  },
  {
    href: "/solutions/partner-portal-solution/",
    label: "Partner Management",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Partner_Management.svg",
    className: "img8",
  },
  {
    href: "/solutions/intranet-portal/",
    label: "Intranet Portal",
    mainImage: "./images/home/img1111.svg",
    icon: "./images/home/Intranet_Portal.svg",
    className: "img9",
  },
];

const BannerCircle = () => {
  const [centerText, setCenterText] = useState("Digital Transformation");
  const [animationClass, setAnimationClass] = useState("");

  const handleMouseEnter = (updatedText: string) => {
    setAnimationClass("zoom-in");
    setCenterText(updatedText);
  };

  const handleMouseLeave = () => {
    setAnimationClass("zoom-out");
    setCenterText("Digital Transformation");
  };


  return (
    <div className="circle-container">
      <Image
        src="/images/home/center-img.png"
        alt="center img"
        width={450}
        height={445}
        priority
      />

      <div className="centerImg_wrap">
        <Image
          src="./images/home/center_img.svg"
          alt="Digital Transformation"
          width={171}
          height={172}
          className="centerImg"
        />

        <span className={`centerText ${animationClass}`}>{centerText}</span>
      </div>

      <ul className="rotating-circle">
        {rotatingItems.map((item) => (
          <li key={item.href} className={item.className}>
            <Link prefetch={false} href={item.href}
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
              className="cycleImg"
            >
              <Image
                src={item.mainImage}
                alt={item.label}
                width={80}
                height={80}
                className="mainImg"
              />
              <Image
                src={item.icon}
                alt={item.label}
                width={36}
                height={36}
                className="innerIcon"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BannerCircle;
