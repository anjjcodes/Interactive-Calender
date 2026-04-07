import { generateData } from "@/data/calendar_data";

export default function CalendarGrid(){
    
    const today = new Date();

    const month = today.getMonth();
    const year = today.getFullYear();

    const dates = generateData(year, month);

    return (
        <div className="grid grid-cols-7 gap-2 mt-6">

            {dates.map((date, index) => (
                <div key={index}
                className="h-10
                flex
                items-center
                justify-center
                rounded-lg
                text-black">
                    {date ? date.getDate(): ""}
                </div>
            ))}
            
        </div>
    );
}