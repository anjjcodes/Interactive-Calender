import { generateData } from "@/data/calendar_data";

export default function CalendarGrid() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dates = generateData(year, month);
    const weekDays = ["Su", "M", "T", "W", "Th", "F", "Sa"];

    return (
        <div className="grid grid-cols-7 gap-y-1 text-[10px] sm:text-xs">
            {weekDays.map((day, index) => (
                <div key={index} className="h-6 flex items-center justify-center font-medium text-gray-500">
                    {day}
                </div>
            ))}

            {dates.map((date, index) => (
                <div 
                    key={index} 
                    className={`h-6 flex items-center justify-center rounded-sm transition-colors
                        ${date && date.getDate() === today.getDate() 
                            ? "bg-gold/10 text-gold font-bold" 
                            : "text-gray-800"}`}
                >
                    {date ? date.getDate() : ""}
                </div>
            ))}
        </div>
    );
}