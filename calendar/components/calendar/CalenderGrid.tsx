import { generateData } from "@/data/calendar_data";

interface CalendarGridProps {
    month: number;
    year: number;
    selectionStart?: Date | null;
    selectionEnd?: Date | null;
    onDateSelect?: (date: Date) => void;
}

export default function CalendarGrid({ month, year, selectionStart, selectionEnd, onDateSelect }: CalendarGridProps) {
    const today = new Date();
    const dates = generateData(year, month);
    const weekDays = ["Su", "M", "T", "W", "Th", "F", "Sa"];

    return (
        <div className="grid grid-cols-7 gap-y-1 text-[10px] sm:text-xs">
            {weekDays.map((day, index) => (
                <div key={index} className="h-6 flex items-center justify-center font-medium text-gray-500">
                    {day}
                </div>
            ))}

            {dates.map((date, index) => {
                const isToday = date && 
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

                return (
                    <div 
                        key={index} 
                        onClick={() => date && onDateSelect && onDateSelect(date)}
                        className={`h-7 flex items-center justify-center rounded-sm transition-colors ${date ? 'cursor-pointer' : ''} ${bgClass} ${textClass}`}
                    >
                        {date ? date.getDate() : ""}
                    </div>
                );
            })}
        </div>
    );
}