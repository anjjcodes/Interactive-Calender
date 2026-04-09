# Interactive Calendar 

A calendar app that feels like a physical journal — sticky notes, date ranges, hero images for each month, and a metallic binder clip 📎

Built with **Next.js**, **Tailwind**, and **GSAP** for high-end animations.

🔗 **Live demo:** [interactive-calender-five.vercel.app](https://interactive-calender-five.vercel.app/)

## Recent Upgrades

I've been polishing this to make it feel realistic:

- **Thick Stack Effect**: The calendar card looks like a physical stack of papers that gets thinner as you flip through the months.
- **Realistic Handwriting**: I added the *Caveat* font so your notes look like they're actually scribbled in navy ink.
- **Zoom-from-Behind**: When the year changes, the new card zooms in from the distance for better 3D depth. 
- **Smootb Performance**: Optimized the note logic and added image preloading so months flip instantly with zero lag.
- **Mobile Friendly**: Reordered the UI so the grid stays at the top on phones, with notes tucked neatly below.
- **Keyboard Power**: I've added full keyboard navigation so you can flip months and dates without touching your mouse.

## Features

- Click a date or drag across a range to add notes
- Notes stay saved in your browser (localStorage)
- 3D Month Flip animations
- "Page Fall" year-change transition
- "Hand-written" style notebook area

## Keyboard Shortcuts

I've added these shortcuts for a seamless experience:

| Shortcut | Action |
|----------|--------|
| `ArrowLeft` / `ArrowRight` | Navigate between **Months** (if no date is selected) |
| `Arrow Keys` | Navigate between **Dates** (if a date is highlighted) |
| `Enter` | **Save** and close the current note |
| `Shift + Enter` | Add a **new line** in the notes textarea |
| `Escape` | **Clear selection** and close the notes sidebar |

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (with hardware-acceleration)


## Getting Started

```bash
cd calendar
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000)

---

Made with ❤️ by Anjali Mani
