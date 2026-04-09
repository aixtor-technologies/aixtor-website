import Image from "next/image";
import Link from "next/link";
import styles from "./banner.module.css";

const menuItems = [
  { label: "Liferay Upgradation", imageUrl: "./images/banking.svg" },
  { label: "Digital Experience", imageUrl: "./images/banking.svg" },
  { label: "Process Automation", imageUrl: "./images/banking.svg" },
  { label: "Cloud Migration", imageUrl: "./images/banking.svg" },
  { label: "Data Modernization", imageUrl: "./images/banking.svg" },
  { label: "Experience Design", imageUrl: "./images/banking.svg" },
  { label: "Analytics & AI", imageUrl: "./images/banking.svg" },
  { label: "Integration Services", imageUrl: "./images/banking.svg" },
  { label: "Managed Support", imageUrl: "./images/banking.svg" },
  { label: "Security & Governance", imageUrl: "./images/banking.svg" },
];

const BannerCircle = () => {
  return (
    <div className={`relative flex aspect-square ${styles.bannerContainer}`}>
      <div className={`aspect-square w-3/4 m-auto ${styles.centerBlock}`}>
        <Image
          src="./images/center-img.svg"
          alt="img"
          width={200}
          height={200}
          className="w-full"
        />
        <span className="text-xl lg:text-xl px-5 font-semibold absolute top-1/2 inset-s-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          Digital Transformation
        </span>
      </div>
      <ul
        className={`${styles.rotatingCircle} absolute size-full top-0 inset-s-0`}
      >
        {menuItems.map(({ label, imageUrl }, index) => (
          <li key={index} className={`absolute ${styles.item}`}>
            <Image
              src="./images/banner-shape.svg"
              alt="shape"
              width={134}
              height={106}
              className="absolute size-full top-0 inset-s-0"
            />
            <Link
              href="/"
              className="absolute size-full top-0 inset-s-0 flex justify-center items-center"
            >
              <div
                className={`flex gap-2 text-center font-semibold p-2 text-xs flex-col justify-center items-center ${styles.itemContent}`}
              >
                <p>{label}</p>
                <Image
                  src={imageUrl}
                  alt={label}
                  width={60}
                  height={60}
                  className={`size-10 ${styles.icon}`}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BannerCircle;
