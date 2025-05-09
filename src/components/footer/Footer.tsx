import Image from "next/image";

const Footer = () => {
  const Bsponsors = [
    { name: "Dr.mooyang", path: "/sponsor/B_DR.mooyang.webp" },
    { name: "Kohkae", path: "/sponsor/B_Kohkae.webp" },
    { name: "UsefulFood", path: "/sponsor/B_usefulFood.webp" },
  ];

  return (
    <footer className="relative flex w-full flex-col">
      <div className="relative mt-auto flex w-full flex-row items-center justify-between bg-white px-2">
        {/* Sponsor Text - Hidden on mobile */}
        <p className="hidden font-semibold text-dark-brown md:block">
          Sponsor by
        </p>

        {/* Sponsor Images */}
        <div className="flex w-full flex-row items-center justify-end space-x-4 sm:w-[85%]">
          {/* A-level Sponsors */}
          <div className="relative h-24 w-24 md:h-20 md:w-24">
            <Image
              src="/sponsor/A_Bright.webp"
              alt="Bright"
              fill
              className="object-contain"
              sizes="96px, 128px"
            />
          </div>
          <div className="relative h-24 w-24 md:h-20 md:w-32">
            <Image
              src="/sponsor/A_sappe.webp"
              alt="Sappe"
              fill
              className="object-contain"
              sizes="96px, 128px"
            />
          </div>

          {/* B-level Sponsors */}
          {Bsponsors.map((sponsor, index) => (
            <div key={index} className="relative h-10 w-10 md:h-10 md:w-10">
              <Image
                src={sponsor.path}
                alt={sponsor.name}
                fill
                className="object-contain"
                sizes="40px, 48px"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
