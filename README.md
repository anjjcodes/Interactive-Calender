# Interactive Calendar 🗓️

A calendar app that feels like a physical journal — sticky notes, date ranges, hero images for each month, and a binder clip on top 

Built with Next.js, Tailwind, and GSAP for the animations.

🔗 **Live demo:** [interactive-calender-five.vercel.app](https://interactive-calender-five.vercel.app/)

## Features

- Click a date or drag across a range to add notes
- Notes are saved to localStorage so they don't disappear
- Dates with notes get a little gold dot
- Each month has its own image at the top
- Switching months has a 3D flip animation
- Changing the year makes the page literally fall down and a new one drops in.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- GSAP for animations

## Getting Started

```bash
cd calendar
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000)

## Images

Drop your month images in `public/images/` named like:
`jan.jpg`, `feb.jpg`, `march.jpg` ... `dec.jpg`

---

Made by Anjali Mani