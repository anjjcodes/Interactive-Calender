"use client";
import { useState, useRef } from "react";
import CalendarGrid from "./CalenderGrid";
import HeroImage from "./HeroImages";
import { BinderClip } from "./BinderClip";
import { MONTH_METADATA } from "@/data/calendar_data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const cardRef = useRef<HTMLDivElement>(null);

    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const metadata = MONTH_METADATA[month] || MONTH_METADATA[0];

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    
    useGSAP(() => {
        if (!cardRef.current) return;
        
        
        gsap.fromTo(cardRef.current, 
            { rotateX: -20, opacity: 0.8, scale: 0.95 }, 
            { rotateX: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)" }
        );
    }, [currentDate]);

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-background perspective-1500">
            <div className="relative w-full max-w-sm sm:max-w-md preserve-3d">
                
                <BinderClip />

                
                <div ref={cardRef} className="calendar-card rounded-3xl overflow-hidden flex flex-col pt-1">
                    
                    <div className="w-full">
                        <HeroImage month={month} />
                    </div>

                    
                    <div className="p-8 flex gap-8 items-start">
                        
                        <div className="w-[120px] sm:w-[150px] shrink-0 flex flex-col justify-start">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-gold font-bold tracking-widest italic opacity-70">{year}</span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={prevMonth}
                                        className="p-1 rounded-full text-gold/60 hover:text-gold hover:bg-gold/5 transition-all active:scale-95"
                                        aria-label="Previous Month"
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button 
                                        onClick={nextMonth}
                                        className="p-1 rounded-full text-gold/60 hover:text-gold hover:bg-gold/5 transition-all active:scale-95"
                                        aria-label="Next Month"
                                    >
                                        <ChevronRight />
                                    </button>
                                </div>
                            </div>
                            <h1 className="font-serif text-2xl sm:text-2xl text-navy leading-none mb-1 truncate" title={monthName.toUpperCase()}>
                                {monthName.toUpperCase()}
                            </h1>
                            <p className="font-serif text-sm text-gold italic leading-tight truncate">
                                {metadata.month}
                            </p>
                            
                            <div className="mt-6 flex flex-col gap-0.5">
                                <p className="text-[8px] tracking-tighter text-gray-400 uppercase">Art by</p>
                                <p className="text-[10px] font-medium text-gray-600">JMW Design</p>
                            </div>
                        </div>

                        
                        <div className="w-px h-32 bg-gold/30 self-center" />

                        
                        <div className="flex-1">
                            <CalendarGrid month={month} year={year} />
                        </div>
                    </div>
                </div>

                
                <div className="absolute top-0 bottom-0 -left-4 -right-4 bg-black/5 -z-10 blur-2xl rounded-full translate-y-12" />
            </div>
        </div>
    );
};
