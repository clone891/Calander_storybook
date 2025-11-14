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
  **Calendar View Component**

  Live Storybook: (paste deployed Storybook URL here)

  ## Installation

  ```powershell
  cd "C:\Users\vkpal\OneDrive\Desktop\My-calander-project\my-calendar-app"
  npm install
  npm run dev
  ```

  Run Storybook locally:

  ```powershell
  npm run storybook
  ```

  Build Storybook:

  ```powershell
  npm run build-storybook
  ```

  ## Architecture

  - `src/components/Calendar/CalendarView.tsx` — main calendar container
  - `src/components/Calendar/MonthView.tsx` & `WeekView.tsx` — view renderers
  - `src/components/Calendar/EventModal.tsx` — event form modal
  - `src/components/Calendar/EventsPanel.tsx` — right-hand events list
  - `src/components/primitives` — `Button`, `Modal`, `Select`
  - `src/hooks` — `useCalendar`, `useEventManager`
  - `src/utils` — date and event helpers

  ## Features

  - Month/Week views
  - Add/Edit/Delete events
  - Responsive Events panel (Today / Upcoming / Past)
  - Keyboard accessibility and ARIA attributes

  ## Storybook Stories

  1. Default — Current month with sample events
  2. Empty — Calendar with no events
  3. Week View — Week view demonstration
  4. Large Dataset — 20+ events
  5. Interactive — event CRUD playground

  ## Technologies

  - React + TypeScript
  - Vite
  - Tailwind CSS
  - Storybook

 Feel free to contribute to this project.

Regards,
Vaibhav
iamvaibhav192@gmail.com
