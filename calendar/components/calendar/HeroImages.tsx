import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="p-6 pb-0">
      <div className="
        relative
        aspect-[4/3]
        w-full
        bg-navy
        rounded-2xl
        overflow-hidden
        shadow-inner
        flex
        items-center
        justify-center
      ">
        <Image
          src="/images/hero_botanical.png"
          alt="Botanical Illustration"
          fill
          className="object-cover p-8"
        />
      </div>
    </div>
  );
}