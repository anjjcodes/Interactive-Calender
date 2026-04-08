import { generateData } from "@/data/calendar_data";

interface CalendarGridProps {
    month: number;
    year: number;
}

export default function CalendarGrid({ month, year }: CalendarGridProps) {
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

                return (
                    <div 
                        key={index} 
                        className={`h-6 flex items-center justify-center rounded-sm transition-colors
                            ${isToday 
                                ? "bg-gold/10 text-gold font-bold shadow-[0_0_8px_rgba(184,145,70,0.2)]" 
                                : "text-gray-800 hover:bg-gray-100/50"}`}
                    >
                        {date ? date.getDate() : ""}
                    </div>
                );
            })}
        </div>
    );
}