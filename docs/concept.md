# Circular Economy Hack Night — Concept Document

> "To connect residents to circular economy services and resources in the Greater Boston Area"

**Organization:** Code for Boston
**Schedule:** Tuesday nights, 7–9 PM ET
**Project Start:** Week of 2026-02-17
**Status as of Week 6 (2026-03-17):** Transitioning from prototypes to production

---

## Mission

Help Greater Boston residents discover and engage with circular economy services — repair shops, donation centers, lending libraries, exchange programs, and repair cafes — through a lightweight, accessible web tool.

---

## Problem Space

Residents face several friction points when trying to participate in the circular economy:

- **Lack of awareness** — people don't know what services exist or where to find them
- **Transportation barriers** — not having a car limits access to services
- **Services favor rebuying** over reusing/repairing
- **No centralized discovery tool** for the Greater Boston area
- **Education gap** — people don't know what can be repaired or reused, or where

---

## User Stories

### Residents of Greater Boston
- As a student, I want to find somewhere to fix my bike, so I can get to class.
- As a frugal buyer, I want to repair my broken appliances, so I can save money.
- As a new resident, I want a beginner guide so I can make use of the Boston community from the get go.
- As a user, I want to know what I can reuse and where.
- As a user, I want to not download an app, so I can keep junk off my phone.

### Businesses & Organizations
- As a repair shop, I want more people to come to my business, so I can make money and contribute to a circular economy.
- As an employee (maintainer), I want to update events seamlessly so I can tell the community about events in their areas.
- As a moderator, I want to validate content, so I can ensure accuracy.

### Code for Boston (Project)
- As a volunteer organization, I want easy onboarding for development, so I can work with people with a variety of time availability.

---

## Core Data Model

Each listing in the directory captures:

| Field | Description |
|---|---|
| Org / Business name | Name of the service provider |
| Service type(s) | Repair, donation, lending, exchange, repair cafe |
| Hours | Operating hours |
| Location | Physical address or service area |
| Description | What the service offers |
| Website | Link to the provider |
| Items accepted | (WIP) Categories of items the service handles |

---

## Key Features & Priorities

### Near-term
- **Service directory** — searchable listing of circular economy services in Greater Boston
- **Fuzzy search** — help users find services even with imprecise queries
- **Mobile-friendly web app** — no app download required (PWA or responsive site)

### Medium-term
- **Data gathering pipeline** — compile and maintain a list of existing services from sources like OpenStreetMap, public datasets, and manual research
- **Map-based discovery** — location-aware browsing of services
- **Event notifications** — repair cafes, collection drives, community events

### Longer-term
- **User engagement** — ratings, saved favorites, gamification (sticker drops)
- **User accounts** — opt-in, use-case first (repair cafe regulars, frequent users)
- **Multi-channel outreach** — text messaging, email newsletters, community platforms
- **AI-assisted discovery** — chatbot for personalized recommendations (with awareness of optics around AI resource usage)

---

## Data Sources & Strategy

- **OpenStreetMap** — primary geographic data source
- **Manual research** — compiling spreadsheets of known services
- **User/business-generated content** — assess moderation strategies
- **Keep data up to date** — freshness is critical; stale data erodes trust

### Moderation
- Estimated ~2 hours of moderation effort per cycle
- OpenAI moderation API (free tier) as an automated first pass
- Beware vandalism in user-generated and map-sourced content

---

## Success Metrics & Analytics

### Usage Tracking
- Frontend usage metrics
- User feedback (thumbs up/down)
- External business/organization reporting
- Backend resource usage (power, cost)

### Analytical Questions
- What items are being searched?
- Where are searches coming from?
- Where are repair cafes needed?
- Which businesses are people going to (or not)?

### Privacy & Data Collection
- User data collection privacy policy required
- Cookies: use-case first, opt-in
- User accounts: use-case first, opt-in

---

## Constraints

- **Cost:** Target under $100/month for infrastructure
- **Hosting:** GitHub Pages or Vercel for public accessibility
- **Team:** Volunteer-driven, unstructured environment — no formal ticket system yet
- **Design:** Seeking designers; City of Boston design system as reference; need Google Drive access for iconography

---

## Infrastructure & Platform

- **Client:** TypeScript, TanStack Router (already initialized)
- **Prototyping:** Client-side prototyping platform with GitHub Pages deployment
- **Data storage:** TBD — evaluating database schema, file storage solutions, API proof of concepts
- **API:** Proof of concepts in progress

---

## Meeting History

| Date | Week | Focus |
|---|---|---|
| 2026-02-17 | 1 | Kickoff — defined circular economy, explored problem space |
| 2026-02-24 | 2 | UX design, prototypes, service research, user stories |
| 2026-03-03 | 3 | User story exercises, stakeholder mapping, data API research |
| 2026-03-10 | 4 | Client-side prototyping workflow, data sources |
| 2026-03-17 | 5 | Prototype review, AI workflows, path forward decisions |
| 2026-03-17 | 6 | Prototypes to production, design onboarding, data schema |

---

## Open Action Items

- [ ] Make prototypes publicly accessible (GitHub Pages / Vercel)
- [ ] Database schema design
- [ ] File storage solution evaluation
- [ ] API proof of concepts (OpenStreetMap, etc.)
- [ ] Design onboarding document
- [ ] Get access to Google Drive for City of Boston iconography
- [ ] Feature priority spreadsheet with screen flows and user flows
- [ ] Assess strategies for user-generated content moderation
- [ ] Centralize onboarding documentation
