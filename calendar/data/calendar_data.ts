export function generateData(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const dates: (Date | null)[] = [];


  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }


  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }


  while (dates.length < 42) {
    dates.push(null);
  }

  return dates;
}

export const MONTH_METADATA = [
  { month: "January", image: "/images/jan.jpg" },
  { month: "February", image: "/images/feb.jpg" },
  { month: "March", image: "/images/march.jpg" },
  { month: "April", image: "/images/april.jpg" },
  { month: "May", image: "/images/may.jpg" },
  { month: "June", image: "/images/june.jpg" },
  { month: "July", image: "/images/july.jpg" },
  { month: "August", image: "/images/aug.jpg" },
  { month: "September", image: "/images/sept.jpg" },
  { month: "October", image: "/images/oct.jpg" },
  { month: "November", image: "/images/nov.jpg" },
  { month: "December", image: "/images/dec.jpg" },
];