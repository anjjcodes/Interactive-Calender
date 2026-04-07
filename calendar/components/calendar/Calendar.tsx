import CalendarGrid from "./CalenderGrid";
import HeroImage from "./HeroImages";
import { BinderClip } from "./BinderClip";

export const Calendar = () => {
    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-background">
            <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Binder Clip */}
                <BinderClip />

                {/* Calendar Card */}
                <div className="calendar-card rounded-3xl overflow-hidden flex flex-col">
                    {/* Top Section - Illustration */}
                    <div className="w-full">
                        <HeroImage />
                    </div>

                    {/* Bottom Section - Metadata and Grid */}
                    <div className="p-8 flex gap-8 items-start">
                        {/* Left Column - Metadata */}
                        <div className="flex-1 flex flex-col justify-start">
                            <span className="text-[10px] text-gold font-bold tracking-widest mb-1 italic opacity-70">{year}</span>
                            <h1 className="font-serif text-3xl sm:text-4xl text-navy leading-none mb-1">
                                {monthName.toUpperCase()}
                            </h1>
                            <p className="font-serif text-sm sm:text-base text-gold italic leading-tight">
                                Oxeye Daisy
                            </p>
                            
                            <div className="mt-6 flex flex-col gap-0.5">
                                <p className="text-[8px] tracking-tighter text-gray-400 uppercase">Art by</p>
                                <p className="text-[10px] font-medium text-gray-600">JMW Design</p>
                            </div>
                        </div>

                        {/* Divider Line */}
                        <div className="w-px h-32 bg-gold/30 self-center" />

                        {/* Right Column - Grid */}
                        <div className="flex-1">
                            <CalendarGrid />
                        </div>
                    </div>
                </div>

                {/* Hanging Shadow */}
                <div className="absolute top-0 bottom-0 -left-4 -right-4 bg-black/5 -z-10 blur-2xl rounded-full translate-y-12" />
            </div>
        </div>
    );
};