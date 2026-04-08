"use client";
import { useState, useRef, useEffect } from "react";
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
    
    // Notes and selection state
    const [selectionStart, setSelectionStart] = useState<Date | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [notesDone, setNotesDone] = useState<Record<string, boolean>>({});
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    useEffect(() => {
        const savedNotes = localStorage.getItem('calendar_notes');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                console.error("Failed to parse notes");
            }
        }
        const savedDone = localStorage.getItem('calendar_notes_done');
        if (savedDone) {
            try {
                setNotesDone(JSON.parse(savedDone));
            } catch (e) {
                console.error("Failed to parse done state");
            }
        }
    }, []);

    const handleDateSelect = (date: Date) => {
        if (!selectionStart || (selectionStart && selectionEnd)) {
            setSelectionStart(date);
            setSelectionEnd(null);
        } else {
            if (date < selectionStart) {
                setSelectionEnd(selectionStart);
                setSelectionStart(date);
            } else {
                setSelectionEnd(date);
            }
        }
    };

    const formatDateKey = (d: Date) => {
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const getSelectionKey = () => {
        if (!selectionStart) return null;
        let startStr = formatDateKey(selectionStart);
        if (!selectionEnd) return startStr;
        let endStr = formatDateKey(selectionEnd);
        return `${startStr}_${endStr}`;
    };

    const currentKey = getSelectionKey();
    const currentNote = currentKey && notes[currentKey] ? notes[currentKey] : "";

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!currentKey) return;
        const newNotes = { ...notes, [currentKey]: e.target.value };
        setNotes(newNotes);
        localStorage.setItem('calendar_notes', JSON.stringify(newNotes));
    };

    const handleDoneChange = () => {
        if (!currentKey) return;
        const newDone = { ...notesDone, [currentKey]: !notesDone[currentKey] };
        setNotesDone(newDone);
        localStorage.setItem('calendar_notes_done', JSON.stringify(newDone));
    };

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
            <div className="relative w-full max-w-md sm:max-w-lg preserve-3d">
                
                <BinderClip />

                
                <div ref={cardRef} className="calendar-card rounded-3xl overflow-hidden flex flex-col pt-1">
                    
                    <div className="w-full">
                        <HeroImage month={month} />
                    </div>

                    
                    <div className="p-8 flex gap-8 items-stretch h-full">
                        
                        <div className="w-[160px] sm:w-[180px] shrink-0 flex flex-col justify-start">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-serif text-3xl sm:text-4xl text-gold font-bold tracking-widest italic leading-none">{year}</span>
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
                            <div className="mt-4 flex flex-col flex-1">
                                <div 
                                    className={`flex items-center justify-between mb-2 ${!isNotesOpen ? 'cursor-pointer hover:opacity-80' : ''}`}
                                    onClick={() => !isNotesOpen && setIsNotesOpen(true)}
                                >
                                    <div className="flex items-center gap-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsNotesOpen(!isNotesOpen); }}>
                                        <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Notes</label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`w-3 h-3 text-gold transition-transform ${isNotesOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>

                                    {isNotesOpen && currentKey && (
                                        <label className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                                            <input 
                                                type="checkbox" 
                                                className="w-3 h-3 accent-gold rounded-sm cursor-pointer"
                                                checked={!!notesDone[currentKey]}
                                                onChange={handleDoneChange}
                                            />
                                            <span className="text-[10px] text-gray-500 uppercase font-medium">Done</span>
                                        </label>
                                    )}
                                </div>
                                {isNotesOpen && (
                                    <textarea 
                                        className={`flex-1 w-full min-h-[100px] bg-black/5 border border-black/5 rounded-md p-2 text-xs resize-none focus:outline-none focus:border-gold/50 focus:bg-white/50 transition-all placeholder:text-gray-400 ${currentKey && notesDone[currentKey] ? 'line-through text-gray-400' : 'text-navy'}`}
                                        placeholder={currentKey ? "Add a note for selected date(s)..." : "Select date(s) to add notes"}
                                        value={currentNote}
                                        onChange={handleNoteChange}
                                        disabled={!currentKey}
                                    />
                                )}
                            </div>
                        </div>

                        
                        <div className="w-px h-32 bg-gold/30 self-center" />

                        
                        <div className="flex-1">
                            <CalendarGrid month={month} year={year} selectionStart={selectionStart} selectionEnd={selectionEnd} onDateSelect={handleDateSelect} />
                        </div>
                    </div>
                </div>

                
                <div className="absolute top-0 bottom-0 -left-4 -right-4 bg-black/5 -z-10 blur-2xl rounded-full translate-y-12" />
            </div>
        </div>
    );
};
