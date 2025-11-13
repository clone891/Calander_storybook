My Calendar App — README

Project overview:
This is a lightweight React + Vite calendar application component project (TypeScript) with a month/week calendar view, event creation/editing modal, and a responsive right-hand Events panel.
The UI uses Tailwind CSS with a warm beige-white theme, small animations, and accessibility-minded interactions.

Key features:
- Month and Week calendar views
- Create, edit, and delete events via a modal
- Events managed with a simple in-memory hook (`useEventManager`)
- Responsive Events sidebar showing Today / Upcoming / Past events
- Beige/cream theme tokens (Tailwind primary palette replaced with warm neutrals)
- Small animations for modals, cards, and interactive elements

Quick start (Windows PowerShell):
1. Install dependencies
```
cd "C:\Users\vkpal\OneDrive\Desktop\My-calander-project\my-calendar-app"
npm install
```

2. Run the dev server
```
npm run dev
```
Open the printed local URL (usually http://localhost:5173) in your browser.

3. Build for production
```
npm run build
```

Available scripts (from package.json):
- `npm run dev` — start Vite dev server
- `npm run build` — build (runs `tsc -b` then `vite build`)
- `npm run preview` — preview production build (vite preview)
- `npm run lint` — run ESLint (if configured locally)

Project structure (important files/folders):
- `index.html` — app entry HTML
- `src/main.tsx` — React entry
- `src/App.tsx` — application root (mounts CalendarView)
- `src/components/Calendar/` — calendar components
  - `CalendarView.tsx` — main view and layout
  - `MonthView.tsx`, `WeekView.tsx` — views
  - `EventModal.tsx` — create/edit modal
  - `CalendarCell.tsx` — single day cell
  - `EventsPanel.tsx` — right-hand event list (Today/Upcoming/Past)
  - `CalendarView.types.ts` — shared types
- `src/components/primitives/` — reusable primitives
  - `Button.tsx`, `Modal.tsx`, `Select.tsx`
- `src/hooks/` — hooks
  - `useCalendar.ts` — date/view state
  - `useEventManager.ts` — event CRUD in memory
- `src/utils/` — helpers
  - `date.utils.ts`, `event.utils.ts`
- `src/styles/globals.css` — Tailwind base + UI token overrides
- `tailwind.config.js` — theme tokens (beige primary palette)
- `vite.config.ts` — includes `@` -> `src` path alias

Customization notes:
- Theme colors: edit `tailwind.config.js` under `theme.extend.colors.primary` to tweak the beige/cream palette.
- Global styles and component tokens: `src/styles/globals.css` contains button, card, and modal helpers. Update these classes to adjust shadows/spacing/animations.
- Event colors: default event colors are defined in `src/utils/event.utils.ts` (constant `EVENT_COLORS`). If you want all events to use a curated beige-accent palette, update that array.

Accessibility & Responsiveness:
- The Events panel is shown as a sidebar on medium+ screens and as a drawer on small screens.
- Interactive elements use semantic buttons and have focus/aria attributes where applicable.
- Modal can be closed with the Escape key or backdrop click.

Development tips & ideas:
- Persist events: replace the in-memory `useEventManager` storage with localStorage or backend API calls.
- Drag & drop: implement drag-and-drop to move events between dates (React DnD or similar library).
- Tooling: run `npm run lint` to check code style and `npm run build` to verify type and build success.

Troubleshooting:
- If the dev server fails on startup, run `npm install` again and ensure Node version is recent (Node 18+ recommended).
- If TypeScript complains about path aliases, ensure `vite.config.ts` has the alias and `tsconfig.app.json` includes
  ``"paths": { "@/*": ["src/*"] }``
- If CSS does not show Tailwind utilities, confirm `postcss.config.cjs` and `tailwind.config.js` exist and that `src/styles/globals.css` is imported in `main.tsx`.

Contributing:
- Create a feature branch, make changes, run `npm run build` and `npm run lint` locally. Open a PR with a concise description.

License & contact:
- This project contains no explicit license file; add one (e.g., MIT) if you plan to share it publicly.
- If you'd like me to continue design or implement features (drag/drop, persistence, color mapping), tell me which feature to prioritize.

---
Generated: November 13, 2025
