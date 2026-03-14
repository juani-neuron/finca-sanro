# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Finca Sanro is an equestrian management system (horse breeding, health, training, finances) for Mexico's top Friesian horse breeder. Built by Luvion Labs as a premium frontend prototype — the goal is a "WoW effect" demo for the client, not a production backend.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Playfair Display (serif) + DM Sans (sans-serif) via Google Fonts
- **Deploy:** Vercel
- **Backend:** 100% dummy — all data is hardcoded JSON/constants, no database, no real auth, no API calls

## Critical Architecture Rules

### Backend is Dummy, but Architecture Must Be Real
- Data lives in JSON files or constants — NO database, NO API calls, NO real auth
- Components must consume data through hooks/functions (e.g., `useHorses()`, `useCalendar()`) that return static data today but can be swapped for Supabase later
- Separate data layer from presentation layer
- Use TypeScript interfaces for all data structures (defined in `plan.md` section 5)

### Typography Rule (Hybrid)
- **Playfair Display (serif):** ONLY for horse names (e.g., "Dedmer 519"), parent names in pedigree, large KPI numbers/metrics, and the "FINCA SANRO" logo text
- **DM Sans (sans-serif):** Everything else — navigation, labels, badges, body text, buttons, tabs, section titles, forms, tables

### Design System
- Dark luxury aesthetic: black/gold palette (see `finca-sanro-styleguide.jsx` for exact color tokens in the `C` object)
- All cards have a 2px gold gradient top accent that expands to 100% on hover
- Three background depth levels: `bg` (#0A0A0A) → `bgCard` (#141414) → `bgElevated` (#1E1E1E)
- Gold accent: #C8A04A
- Status badges: pill-shaped with colored dot + semi-transparent background
- Predicate badges: gold border + gold uppercase text with letter-spacing

### Role System
Only build the Super Admin view (full access). Other roles (admin, trainer, caretaker, vet) exist as dummy data in the user management UI but don't need functional role-based access control.

## Key Files

- `plan.md` — Complete project specification: data models (TypeScript interfaces), module descriptions, real horse data, implementation phases, style guide details
- `finca-sanro-styleguide.jsx` — Reference design system with color tokens (`C` object), reusable components (`StatusBadge`, `PredicateBadge`, `MetricCard`, `HorseCard`, `GoldDivider`), dashboard layout, and horse profile view

## Routes

| Route | Module |
|-------|--------|
| `/` | Dashboard (KPIs, calendar, alerts, stallion grid) |
| `/caballos` | Horse inventory (grid/list with filters) |
| `/caballos/[id]` | Individual horse record (8 tabs) |
| `/maquila` | Breeding/reproduction pipeline |
| `/alimentacion` | Feed inventory, purchases, consumption plans |
| `/calendario` | Calendar (monthly/weekly views) |
| `/personal` | Staff management |
| `/competencias` | Competition history |
| `/financiero` | Financial dashboard with charts (Recharts) |
| `/configuracion` | Settings + user management form |

## Working with Claude Code

- Before implementing each module, propose the approach (component structure, data needs, UX decisions) and wait for confirmation
- Ask before assuming on design, functionality, or priority decisions
- All branding is Finca Sanro, NOT Luvion Labs
- Use real data for the 4 KFPS-approved stallions (Dedmer 519, Rommert 498, Beant 517, Wibout 511) — details in `plan.md` section 9
- Responsive: mobile-first. Desktop = fixed sidebar (220px); tablet = collapsed sidebar (64px icons); mobile = bottom nav bar

### Phase Completion Checklist (MANDATORY)
At the end of every completed phase, before reporting done:
1. **Verify build:** `npm run build` must pass with zero errors
2. **Update `plan.md`:** Mark the phase as ✅ COMPLETADA with date, add a summary of what was built (files, counts, key decisions)
3. **Update memory:** Update `project_implementation_state.md` with current status and next phase
4. **Notify user:** Explicitly tell the user that documentation has been updated and they can safely clear context to start the next phase
