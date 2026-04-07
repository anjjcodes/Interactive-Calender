import CalendarGrid from "./CalenderGrid";
import HeroImage from "./HeroImages";


export const Calendar = () => {

    const today = new Date();
    const month = today.toLocaleString("default", {
        month: "long"
    });

    const year = today.getFullYear();
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center perspective-[1200px]">
                <div className="relative">
                    <div className="flex justify-center gap-24 mb-2">
                    </div>
                    <div className="bg-white border border-gray-200
                            w-[350px]
                            md:w-[400px]
                            overflow-hidden
                            shadow-[0_40px_80px_rgba(0,0,0,0.25)]
                            rounded-b-xl
                            transform
                            rotateX-[6deg]
                            rotateY-[-4deg]">
                        <div className="
                                    absolute
                                    w-[320px]
                                    md:w-[560px]
                                    h-6
                                    blur-xl
                                    rounded-full
                                    translate-y-[220px]
                                "
                        />


                        <HeroImage />
                        <div className="
                                flex
                                justify-end
                                items-center
                                p-4
                                border-b
                                ">

                            <h1 className="
                                text-lg
                                md:text-xl
                                font-bold
                                tracking-wide
                                text-gray-700
                            ">
                                {year} <br></br>
                                {month.toUpperCase()}

                            </h1>

                        </div>
                        <CalendarGrid />
                    </div>

                </div>
            </div>
        </>
    );
};