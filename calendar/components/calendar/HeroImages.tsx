import Image from "next/image";
import { MONTH_METADATA } from "@/data/calendar_data";

interface HeroImageProps {
  month: number;
}

export default function HeroImage({ month }: HeroImageProps) {
  const metadata = MONTH_METADATA[month] || MONTH_METADATA[0];

  return (
    <div className="p-4 sm:p-6 pb-0">
      <div className="
        relative
        aspect-[16/10] sm:aspect-[2/1]
        w-full
        bg-paper
        rounded-2xl
        overflow-hidden
        shadow-sm
        flex
        items-center
        justify-center
      ">
        <Image
          key={month} 
          src={metadata.image}
          alt={metadata.month}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}