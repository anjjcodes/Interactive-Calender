import { useMemo, useState, useEffect } from "react";
import { generateData } from "@/data/calendar_data";

interface CalendarGridProps {
    month: number;
    year: number;
    selectionStart?: Date | null;
    selectionEnd?: Date | null;
    onDateSelect?: (date: Date) => void;
    markedDates?: Set<string>;
}

export default function CalendarGrid({ month, year, selectionStart, selectionEnd, onDateSelect, markedDates }: CalendarGridProps) {
    const [today, setToday] = useState<Date | null>(null);

    useEffect(() => {
        setToday(new Date());
    }, []);
    
    const dates = useMemo(() => generateData(year, month), [year, month]);
    const weekDays = useMemo(() => ["Su", "M", "T", "W", "Th", "F", "Sa"], []);

    return (
        <div className="grid grid-cols-7 gap-y-1 text-[10px] sm:text-xs">
            {weekDays.map((day: string, index: number) => (
                <div key={index} className="h-6 flex items-center justify-center font-medium text-gray-500">
                    {day}
                </div>
            ))}

            {dates.map((date: Date | null, index: number) => {
                const isToday = date && today &&
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

                const isSelectedStart = date && selectionStart &&
                    date.getDate() === selectionStart.getDate() &&
                    date.getMonth() === selectionStart.getMonth() &&
                    date.getFullYear() === selectionStart.getFullYear();

                const isSelectedEnd = date && selectionEnd &&
                    date.getDate() === selectionEnd.getDate() &&
                    date.getMonth() === selectionEnd.getMonth() &&
                    date.getFullYear() === selectionEnd.getFullYear();

                const isDateInRange = date && selectionStart && selectionEnd &&
                    date > selectionStart && date < selectionEnd;

                let bgClass = "hover:bg-gray-100/50";
                let textClass = "text-gray-800";

                if (isSelectedStart || isSelectedEnd) {
                    bgClass = "bg-navy";
                    textClass = "text-paper font-bold";
                } else if (isDateInRange) {
                    bgClass = "bg-navy/10";
                    textClass = "text-navy font-medium";
                } else if (isToday) {
                    bgClass = "bg-gold/10";
                    textClass = "text-gold font-bold shadow-[0_0_8px_rgba(184,145,70,0.2)]";
                }

                const formatDateKey = (d: Date) => {
                    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
                };

                const dateStr = date ? formatDateKey(date) : "";
                const hasNote = date && markedDates && markedDates.has(dateStr);

                return (
                    <div
                        key={index}
                        onClick={() => date && onDateSelect && onDateSelect(date)}
                        className={`h-7 relative flex flex-col items-center justify-center rounded-full transition-colors ${date ? 'cursor-pointer' : ''} ${bgClass} ${textClass}`}
                    >
                        <span>{date ? date.getDate() : ""}</span>
                        {date && hasNote && (
                            <div className="absolute bottom-[2px] flex justify-center w-full">
                                <div className={`w-1 h-1 rounded-full ${isSelectedStart || isSelectedEnd ? 'bg-paper/70' : 'bg-gold/70'}`} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}