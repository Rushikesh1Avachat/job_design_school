# Nathaniel School of Music - Tech Roles Brochure

A modern, high-fidelity React + Tailwind CSS implementation of the [Nathaniel School of Music Tech Roles Brochure](https://brochures.nathanielschool.com/join/tech).

## 🚀 Features

- **Pixel-Accurate Typography & Design Tokens**:
  - Editorial headings styled with Google Font **Instrument Serif** and clean sans-serif UI with **Geist** / **Inter**.
  - Dynamic warm cream palette (`#f5efe4`) and dark theme (`#14110e`) with persistent local storage.
  - Custom arch portrait framing for Jason Zac at the Roland keyboard.
- **Jobs Navigation & Role Switcher**:
  - Sticky header with NSM logo and "Jobs at Nathaniel School of Music" brand.
  - "Every role" dropdown menu categorizing all 8 roles:
    - *At the school*: Admin, Founder's Office, Academic Coordinator, Creative Ops, AI Media Associate, Content Writer.
    - *Tech roles*: Founding Engineer, Raspberry Pi & ESP32 Engineer.
  - Horizontally scrollable chip switcher bar with smooth snap navigation.
- **The Two Primary Tech Roles**:
  - **Founding Engineer**: Full-stack, end to end (Dhun app, learning portal, Mac apps on Nathaniel Labs, AI publishing).
  - **Raspberry Pi & ESP32 Engineer**: Hardware, sensors & stage tech (ESP32 sensing layer, WS2812B recording lights, Chorale stage stompbox, restaurant sensor system).
  - Interactive chip tags, full-role preview modal, and work pack launchers.
- **Work Pack Application & Upload Dock**:
  - Interactive 4-part challenge accordion for both tech roles.
  - Interactive upload simulation dock with live progress segments (`X of 4 parts in`).
  - Form validation with confetti celebration and instant WhatsApp trigger.
- **Questions? Talk to us. Contact Section**:
  - Direct integration matching the Nathaniel brochure styling.
  - One-click **Gmail Web Compose** opener (`avachatrushikesh45@gmail.com`) pre-filled with application context.
  - One-click **WhatsApp Chat** opener (`+91 95616 86658`).
  - Cohesive placement across Navbar, Footer, and Work Pack submission flows.
- **Interactive Dhun Melody Practice App Clone (Founding Engineer Challenge 1)**:
  - Full **12-key pitch transposition engine** (C, C#, D, E♭, E, F, F#, G, A♭, A, B♭, B).
  - True musical spelling rules (F# in G major, never G♭; B♭ in F major, never A#).
  - Triple blackboard notation: rhythm sticks on top, scale degree in the middle, Indian classical Swara underneath.
  - Real-time **Web Audio API piano synthesis** with synchronized note highlighting.
- **Interactive IoT Studio Simulator Widget (Pi & ESP32 Engineer Challenge 1)**:
  - Live simulation of the DFRobot SEN0232 sound level meter with 42 dBA noise limit threshold.
  - Real-time WS2812B LED status indicator (Green / Amber / Pulse Red) and studio door reed switch toggle.
- **Full Positions Directory & Role Details**:
  - "All Jobs" modal with real-time search and role category filtering.
  - Full role details modals with 10-point responsibilities, daily schedules (9:00 AM - 5:00 PM), and 90-day learning trajectories.
  - Complete keyboard accessibility (Escape key, backdrop dismiss, and body scroll locking).

## 🛠️ Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (icons)
- **Canvas Confetti**

## 💻 Running Locally

1. Install dependencies (already installed):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
