"use client";
import { useState, useRef, useEffect, useMemo } from "react";
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
    const isYearChangeRef = useRef(false);

    // Notes and selection state
    const [selectionStart, setSelectionStart] = useState<Date | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedNotes = localStorage.getItem('calendar_notes');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                console.error("Failed to parse notes");
            }
        }
    }, []);

    const getSelectionKeyFor = (start: Date | null, end: Date | null) => {
        if (!start) return null;
        let startStr = formatDateKey(start);
        if (!end) return startStr;
        let endStr = formatDateKey(end);
        if (startStr === endStr) return startStr;
        return startStr < endStr ? `${startStr}_${endStr}` : `${endStr}_${startStr}`;
    };

    const handleDateSelect = (date: Date) => {
        let newStart = selectionStart;
        let newEnd = selectionEnd;

        if (!selectionStart || (selectionStart && selectionEnd)) {
            newStart = date;
            newEnd = null;
        } else {
            if (date < selectionStart) {
                newEnd = selectionStart;
                newStart = date;
            } else {
                newEnd = date;
            }
        }

        setSelectionStart(newStart);
        setSelectionEnd(newEnd);

        const newKey = getSelectionKeyFor(newStart, newEnd);
        if (newKey && notes[newKey]) {
            setIsEditing(false); // Switch to preview for existing notes
            setIsNotesOpen(true);
        } else {
            setIsEditing(true); // Keep in edit mode for new/blank notes
        }
    };

    const formatDateKey = (d: Date) => {
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const currentKey = getSelectionKeyFor(selectionStart, selectionEnd);
    const currentNote = currentKey && notes[currentKey] ? notes[currentKey] : "";

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!currentKey) return;
        const newNotes = { ...notes, [currentKey]: e.target.value };
        setNotes(newNotes);
        localStorage.setItem('calendar_notes', JSON.stringify(newNotes));
    };

    const handleDeleteNote = () => {
        if (!currentKey) return;
        const newNotes = { ...notes };
        delete newNotes[currentKey];
        setNotes(newNotes);
        localStorage.setItem('calendar_notes', JSON.stringify(newNotes));
        setIsEditing(false);
        setIsNotesOpen(false); // Close notes since it's deleted
    };

    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const metadata = MONTH_METADATA[month] || MONTH_METADATA[0];

    const triggerYearChange = (newDate: Date) => {
        if (!cardRef.current) { setCurrentDate(newDate); return; }
        isYearChangeRef.current = true;
        gsap.to(cardRef.current, {
            rotateX: 65,
            y: 420,
            opacity: 0,
            scale: 0.88,
            duration: 0.45,
            ease: "power3.in",
            force3D: true,
            overwrite: true,
            onStart: () => {
                if (cardRef.current) cardRef.current.style.willChange = "transform, opacity";
            },
            onComplete: () => {
                // Pre-position card BEHIND (Z-space) instead of ABOVE (Y-space)
                gsap.set(cardRef.current, { rotateX: 0, y: 0, z: -400, opacity: 0, scale: 0.8, force3D: true });
                if (cardRef.current) cardRef.current.style.willChange = "auto";
                setCurrentDate(newDate);
            },
        });
    };

    const nextMonth = () => {
        const newDate = new Date(year, month + 1, 1);
        month === 11 ? triggerYearChange(newDate) : setCurrentDate(newDate);
    };

    const prevMonth = () => {
        const newDate = new Date(year, month - 1, 1);
        month === 0 ? triggerYearChange(newDate) : setCurrentDate(newDate);
    };

    // Optimization: Pre-calculate which dates have notes for the current month
    const markedDates = useMemo(() => {
        const marked = new Set<string>();
        Object.entries(notes).forEach(([key, noteText]) => {
            if (!noteText.trim()) return;

            if (key.includes('_')) {
                const [startStr, endStr] = key.split('_');
                const actualStart = startStr < endStr ? startStr : endStr;
                const actualEnd = startStr > endStr ? startStr : endStr;



                let current = new Date(actualStart);
                const end = new Date(actualEnd);
                while (current <= end) {
                    marked.add(`${current.getFullYear()}-${(current.getMonth() + 1).toString().padStart(2, '0')}-${current.getDate().toString().padStart(2, '0')}`);
                    current.setDate(current.getDate() + 1);
                    if (marked.size > 1000) break;
                }
            } else {
                marked.add(key);
            }
        });
        return marked;
    }, [notes]);

    useGSAP(() => {
        if (!cardRef.current) return;

        if (isYearChangeRef.current) {

            isYearChangeRef.current = false;
            gsap.to(cardRef.current, {
                rotateX: 0,
                y: 0,
                z: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                force3D: true,
                overwrite: true,
                onStart: () => {
                    if (cardRef.current) cardRef.current.style.willChange = "transform, opacity";
                },
                onComplete: () => {
                    if (cardRef.current) cardRef.current.style.willChange = "auto";
                }
            });
        } else {

            gsap.fromTo(
                cardRef.current,
                { rotateX: -18, opacity: 0.85, scale: 0.96, force3D: true },
                {
                    rotateX: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.65,
                    ease: "back.out(2)",
                    force3D: true,
                    overwrite: true,
                    onStart: () => {
                        if (cardRef.current) cardRef.current.style.willChange = "transform, opacity";
                    },
                    onComplete: () => {
                        if (cardRef.current) cardRef.current.style.willChange = "auto";
                    }
                }
            );
        }
    }, [currentDate]);


    const pagesRemaining = 11 - month;
    const generateStackShadow = () => {
        let shadows = [];

        shadows.push("0 10px 15px -3px rgba(0, 0, 0, 0.1)");
        shadows.push("0 4px 6px -2px rgba(0, 0, 0, 0.05)");
        shadows.push("0 40px 80px -20px rgba(0, 0, 0, 0.15)");


        for (let i = 1; i <= pagesRemaining; i++) {
            const spread = i * 0.5;
            shadows.push(`${i}px ${i}px 0px 0px var(--paper)`); // Solid paper edge
            shadows.push(`${i}px ${i}px 1px 0px rgba(0,0,0,0.05)`); // Subtle shadow for that edge
        }

        return shadows.join(", ");
    };

    const stackShadow = generateStackShadow();

    return (
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-background perspective-1500">
            <div className="relative w-full max-w-[340px] sm:max-w-[460px] preserve-3d">

                <BinderClip />


                <div
                    ref={cardRef}
                    className="calendar-card rounded-3xl overflow-hidden flex flex-col pt-1 transition-[box-shadow] duration-500 ease-out"
                    style={{ boxShadow: stackShadow }}
                >

                    <div className="w-full relative">
                        <HeroImage month={month} />

                        {/* Image Preloader: Invisibly load next/prev month in background */}
                        <div className="hidden pointer-events-none opacity-0" aria-hidden="true">
                            <HeroImage month={(month + 1) % 12} />
                            <HeroImage month={(month + 11) % 12} />
                        </div>
                    </div>


                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-2 sm:gap-6 sm:items-stretch sm:h-auto">

                        <div className="w-full sm:w-[160px] shrink-0 flex flex-col justify-start">
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
                            <div className="mt-4 flex flex-col min-h-[140px]">
                                <div
                                    className={`flex items-center justify-between mb-2 ${!isNotesOpen ? 'cursor-pointer hover:opacity-80' : ''}`}
                                    onClick={() => !isNotesOpen && setIsNotesOpen(true)}
                                >
                                    <div className="flex items-center gap-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsNotesOpen(!isNotesOpen); }}>
                                        <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Notes</label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`w-3 h-3 text-gold transition-transform ${isNotesOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                {isNotesOpen && (
                                    <div className="flex-1 w-full flex flex-col relative">

                                        <textarea
                                            className="w-full bg-transparent resize-none focus:outline-none placeholder:text-gray-300 font-handwritten text-lg text-navy scrollbar-hide"
                                            rows={3}
                                            style={{
                                                height: '84px',
                                                lineHeight: '28px',
                                                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(3,3,2,0.18) 27px, rgba(3,3,2,0.18) 28px)',
                                                backgroundAttachment: 'local',
                                                paddingTop: '4px',
                                                visibility: (currentNote && !isEditing) ? 'hidden' : 'visible',
                                            }}
                                            placeholder={currentKey ? "Add a short note..." : "Select date(s)"}
                                            value={currentNote}
                                            onChange={handleNoteChange}
                                            disabled={!currentKey}
                                        />


                                        {(currentNote && !isEditing) && (
                                            <div
                                                className="absolute inset-0 text-lg font-handwritten cursor-pointer hover:bg-black/5 rounded transition-colors text-navy scrollbar-hide"
                                                onClick={() => setIsEditing(true)}
                                                style={{
                                                    height: '84px',
                                                    lineHeight: '28px',
                                                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(184,145,70,0.2) 27px, rgba(184,145,70,0.2) 28px)',
                                                    backgroundAttachment: 'local',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                    paddingTop: '4px',
                                                    overflowY: 'auto',
                                                }}
                                                title="Click to edit"
                                            >
                                                {currentNote}
                                            </div>
                                        )}


                                        {(currentKey && !(!isEditing && currentNote)) ? (
                                            <div className="mt-3 flex justify-end gap-3">
                                                {currentNote ? (
                                                    <button
                                                        onClick={handleDeleteNote}
                                                        className="px-4 py-1.5 rounded-lg text-[10px] font-serif italic text-red-400/80 hover:text-red-600 hover:bg-red-50/50 border border-transparent hover:border-red-100 transition-all duration-300 cursor-pointer"
                                                    >
                                                        Discard
                                                    </button>
                                                ) : null}
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-5 py-1.5 rounded-lg bg-gold/5 border border-gold/20 text-gold text-[11px] font-serif italic hover:bg-gold/10 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(184,145,112,0.1)] transition-all duration-300 cursor-pointer"
                                                >
                                                    {currentNote ? 'Update' : 'Save Note'}
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="hidden sm:block w-px h-32 bg-gold/30 self-center" />
                        <div className="sm:hidden w-full h-px bg-gold/30 my-1" />


                        <div className="flex-1">
                            <CalendarGrid
                                month={month}
                                year={year}
                                selectionStart={selectionStart}
                                selectionEnd={selectionEnd}
                                onDateSelect={handleDateSelect}
                                markedDates={markedDates}
                            />
                        </div>
                    </div>
                </div>


                <div className="absolute top-0 bottom-0 -left-4 -right-4 bg-black/5 -z-10 blur-2xl rounded-full translate-y-12" />
            </div>
        </div>
    );
};
