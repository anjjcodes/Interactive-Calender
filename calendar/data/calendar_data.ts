export function generateData(
    year:number,
    month:number
){

    const daysInMonth = new Date(year, month+1,0).getDate();
    const firstDay = new Date(year, month,1).getDay();

    const dates =[];

    for(let i = 1; i<=daysInMonth; i++){
        dates.push(new Date(year, month, i));
    }

    return dates;
}