# Rural Rising

### Development
Page | Status | Notes
-|-|-
Home 								| `Done`	 		|
About Us 						| `Done` 			|
Our journey					|	On-going		| Search functionality
FAQs 								| `Done` 			|
In The News					| `Done`			|
Events 							| On-going		| Search functionality
Locations						| On-going		| Location selection and display logic
Contact Us 					| On-going		| Pending email endpoint
Privacy Policy 			| `Done` 			|
Terms & Conditions	| `Done` 			|
Stories							| On-going		|
Admin Page					| On-going		|
Events (admin)			| `Done`			|
In The News (admin)	| `Done`			|
Stories (admin)			| On-going  	|
Our journey (admin)	| Not Started	|

**Components**
- Video player modal
- What's new

Notes:
- Content revision in Our Journey 'Growing Together for a Sustainable Future'
- Find the "Farmers are pandemic front-liners" from In the News

### Future Improvements
- pagination on admin dashboard
- 

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
`src/`  
├─`assets/` — images and svgs  
├─`components/` — UI components grouped by feature  
├─`context/` — global context and state  
├─`features/` — app features  
├─`hook` — custom hooks  
├─`layouts/` — component layouts  
├─`library/` — utility / helpers  
├─`pages/` — app pages  
├─`service` — services for the backend  
├─`styles/` — global SCSS (variables, utils, reset)  
├─`App.jsx` — root app component  
├─`DashboardApp.jsx` — root dashboard app component  
├─`LandingApp.jsx` — root landing app component  
├─`main.jsx` — entry point  
└─`supabase-client.js` — supabase database connection  

## Deployment
The project is a static frontend. After `npm run build`, serve the `dist/` output with any static host (Netlify, Vercel, GitHub Pages, or a simple static file server).

Table: Journey
id: PK
title: String
description: String
image_path: String
created_at: timestamp

Table: Story
id: PK
title: String
description: textarea
created_at: timestamp

Table: StoryMedia
id: PK
story_id: FK
media_path: String