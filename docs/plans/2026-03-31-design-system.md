# Design System — Boston Circular Economy

**Date:** 2026-03-31
**Status:** Draft
**Stack:** Tailwind CSS + Storybook + Pencil.dev mockups
**Brand source:** [Boston.gov Brand Guidelines](https://www.boston.gov/government/cabinets/innovation-and-technology/brand-guidelines)
**Visual tone:** Community/approachable — Boston palette with warm spacing, rounded corners, subtle shadows

---

## 1. Design Tokens (Tailwind Theme)

All Boston brand values encoded as Tailwind theme extensions in `tailwind.config.ts`.

### Colors

| Token | Hex | Usage |
|---|---|---|
| `charles-blue` | #091F2F | Headers, high-contrast backgrounds |
| `optimistic-blue` | #1871BD | Links, buttons, interactive elements |
| `freedom-red` | #FB4D42 | Minimal accent — alerts, badges |
| `blue-100` | #51ACFF | Light blue highlights |
| `blue-200` | #45789C | Mid blue |
| `blue-300` | #0C2639 | Dark blue |
| `blue-400` | #061622 | Deepest blue |
| `gray-100` | #F2F2F2 | Page backgrounds, light fills |
| `gray-200` | #E0E0E0 | Borders, dividers |
| `gray-300` | #D2D2D2 | Disabled states |
| `gray-400` | #58585B | Secondary text |

**Rule:** Never place Optimistic Blue on Freedom Trail Red or vice versa.

### Typography

| Token | Font | Usage | Style |
|---|---|---|---|
| `font-display` | Montserrat | Nav, buttons, headings | Always uppercase bold |
| `font-body` | Lora | Body text, descriptions | Normal weight, optimized for screen |

Both loaded from Google Fonts.

### Spacing & Shape

- White-space-forward layout, generous padding
- Default border radius: `rounded-lg` (8px) for approachable feel
- Cards and interactive elements use subtle shadows over hard borders
- Mobile-first breakpoints (the "no app download" user story means mobile web is primary)

---

## 2. Component Inventory

Six components for the minimal core — enough to build the service directory.

### `<Button>`
- **Variants:** `primary` (Optimistic Blue fill), `secondary` (outlined), `ghost` (text-only)
- **Sizes:** `sm`, `md`, `lg`
- **States:** default, hover, focus ring, disabled
- Montserrat uppercase bold label

### `<SearchBar>`
- Text input with integrated search icon
- Lora placeholder text, Montserrat input text
- Debounced input handler (ties into existing fuzzy search prototype)
- Optional filter chips below for service types

### `<ServiceCard>`
- Displays: org name, service type badge(s), location, hours summary, description snippet
- Clickable — expands or navigates to detail (TBD)
- White background, subtle shadow, rounded-lg
- Responsive: stacks vertically on mobile, grid on desktop

### `<Badge>`
- Labels for service types: repair, donation, lending, exchange, repair cafe
- Pill-shaped, small Montserrat uppercase text
- Color-coded by service type using supporting blue/gray palette

### `<NavBar>`
- Fixed top bar with Charles Blue background
- App title/logo left, navigation links right
- Mobile: hamburger menu or bottom nav (TBD with designer)

### `<PageLayout>`
- Max-width content container with responsive padding
- Slot-based: header area, main content, optional sidebar
- Enforces white-space-forward spacing philosophy

---

## 3. Storybook Setup

### File Structure

```
client/src/
  components/
    Button/
      Button.tsx
      Button.stories.tsx
    SearchBar/
      SearchBar.tsx
      SearchBar.stories.tsx
    ServiceCard/
      ServiceCard.tsx
      ServiceCard.stories.tsx
    Badge/
      Badge.tsx
      Badge.stories.tsx
    NavBar/
      NavBar.tsx
      NavBar.stories.tsx
    PageLayout/
      PageLayout.tsx
      PageLayout.stories.tsx
```

### Conventions

- Stories colocated next to components
- Organized under `Design System/` category in Storybook sidebar
- `args` and `argTypes` for interactive controls (variant, size, label, etc.)
- Auto-generated `Docs` page per component from JSDoc + args

### Addons

- `@storybook/addon-essentials` — controls, docs, viewport, actions
- `@storybook/addon-a11y` — accessibility checks (important for a civic tool)

### Development Workflow

- `npm run storybook` runs Storybook dev server
- Volunteers develop and review components in isolation before wiring into pages
- Tuesday hack night friendly: pick up a component, build it in Storybook, PR it

---

## 4. Pencil.dev Mockups

Two mockups using Boston brand tokens as visual reference for component development.

### Mockup 1: Service Directory Page

- SearchBar at top with placeholder "Find repair shops, donation centers..."
- Row of Badge filter chips below (Repair, Donation, Lending, Exchange, Repair Cafe)
- Grid of ServiceCards (2 columns desktop, 1 column mobile)
- Each card: org name (Montserrat), service type badges, location + hours (Lora), short description
- White background, generous spacing between cards

### Mockup 2: Nav + Layout Shell

- NavBar: Charles Blue background, "Boston Circular Economy" title left, nav links right
- PageLayout wrapper showing max-width container with responsive padding
- Footer placeholder with Code for Boston attribution
- Demonstrates the overall page frame that wraps any content

### Mockup Approach

- Desktop-first in pencil.dev (easier to design), mobile-first in code
- Boston brand colors, Montserrat + Lora typography throughout
- Community/approachable tone: rounded corners, white space, subtle shadows
- Mockups serve as reference for Storybook components and designer onboarding

---

## 5. Implementation Order

1. **Tailwind setup** — install, configure theme tokens, load Google Fonts
2. **Storybook setup** — install, configure for Vite + React + Tailwind
3. **Pencil.dev mockups** — create service directory and nav/layout shell mockups
4. **Components** — build in this order (each dependency-informed):
   - PageLayout (structural foundation)
   - NavBar (wraps all pages)
   - Badge (standalone, no deps)
   - Button (standalone, no deps)
   - SearchBar (uses Button internally)
   - ServiceCard (uses Badge internally)
5. **Integration** — wire components into a production service directory page

---

## Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| CSS approach | Tailwind CSS | Fast prototyping, easy token config, volunteer-friendly |
| Component scope | Minimal core (6) | YAGNI — build what the service directory needs, grow later |
| Storybook location | Colocated in `client/src/components/` | No migration step; Storybook acts as the prototype sandbox |
| Component home | `client/src/components/` from day one | Avoids move-and-rewrite when promoting from prototype |
| Visual tone | Community/approachable | Matches "helpful, personal, optimistic" brand voice; warmer than institutional |
| Mockup screens | Service directory + nav/layout shell | Core screens the minimal components serve |
