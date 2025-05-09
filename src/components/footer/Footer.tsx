import Image from "next/image";

const Footer = () => {
  const Asponsors = [
    { name: "Sponsor 1", path: "/sponsor/A_Bright.webp" },
    { name: "Sponsor 2", path: "/sponsor/A_sappe.webp" },
  ];
  const Bsponsors = [
    { name: "Sponsor 3", path: "/sponsor/B_DR.mooyang.webp" },
    { name: "Sponsor 4", path: "/sponsor/B_Kohkae.webp" },
    { name: "Sponsor 5", path: "/sponsor/B_usefulFood.webp" },
  ];

  return (
    <footer className="relative flex w-full flex-col">
      <div className="relative mt-auto flex w-full flex-row items-center justify-between bg-white px-2">
        {/* Sponsor Text - Hidden on mobile */}
        <p className="hidden font-semibold text-dark-brown md:block">
          Sponsor by
        </p>

        {/* Sponsor Images */}
        <div className="flex w-full flex-row items-center justify-end space-x-2 sm:w-[85%]">
          {Asponsors.map((sponsor, index) => (
            <div key={index} className={`relative h-20 w-20 md:h-32 md:w-32`}>
              <Image
                src={sponsor.path}
                alt={sponsor.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 64px,
                       (max-width: 1200px) 80px"
              />
            </div>
          ))}
          {Bsponsors.map((sponsor, index) => (
            <div key={index} className={`relative h-10 w-10 md:h-12 md:w-12`}>
              <Image
                src={sponsor.path}
                alt={sponsor.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 64px,
                       (max-width: 1200px) 80px"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
