# Rural Rising

### Development
Page | Status | Notes
-|-|-
Home 								| On-going 		| Media required; Video player modal integration
About Us 						| On-going 		| Media required
Our journey					|	On-going		| Media required
FAQs 								| `Done` 			| 
In The News					| On-going		| Media required; Video player modal integration
Events 							| On-going		| Data required
Locations						| On-going		| Location selection and display logic
Contact Us 					| `Done` 			| Media required; Pending email endpoint
Privacy Policy 			| `Done` 			| 
Terms & Conditions	| `Done` 			| 
Stories							| On-going		| 
Admin Page					| On-going		|
Events (admin)			| On-going		| 
In The News (admin)	| Not Started	| 
Stories (admin)			| Not Started	| 

temp-tag
**Components**
- Video player modal
- What's new

---
---

>A small React + Vite informational landing page.

---

## Features
- Authentication pages (Login, Sign Up, Forgot Password)
- Shop listing, product and category pages
- Membership tiers and info
- Track order flow
- Responsive layout with SCSS modules

## Tech Stack
- Vite 7
- React 19
- React Router 7
- SCSS (module-based)
- Formik + Yup for form validation
- React Toastify for notifications
- ESLint for code quality

## Prerequisites
- Node.js 18+ (recommended)
- npm or a compatible package manager

## Setup
Clone the repo and install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Project Structure

- `src/` — application source
	- `App.jsx` — root app component
	- `main.jsx` — entry point
	- `components/` — UI components grouped by feature
	- `pages/` — app pages
	- `features/` — app features
	- `layout/` — component layouts
	- `context/` — global context and state
	- `assets/` — images and svgs
	- `styles/` — global SCSS (variables, utils, reset)
	- `library/` — utility / helpers

## Deployment
The project is a static frontend. After `npm run build`, serve the `dist/` output with any static host (Netlify, Vercel, GitHub Pages, or a simple static file server).

Table: Story
id: PK
title: String
description: textarea
created_at: timestamp

Table: StoryMedia
id: PK
story_id: FK
media_path: String