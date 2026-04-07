import Image from "next/image";

export default function HeroImage() {

  return (

    <div className="relative w-full">

      {/* Image */}
      <div className="
        relative
        h-50
        md:h-60
        w-full
      ">

        <Image
          src="/images/img1.jpg"
          alt="Calendar Hero"
          fill
          className="object-cover"
        />

      </div>

      {/* White Wave Overlay */}
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-14
        "
      >

        <path
          d="
            M0,50
            C360,100
            1080,0
            1440,50
            L1440,100
            L0,100
            Z
          "
          fill="white"
        />

      </svg>

    </div>

  );

}