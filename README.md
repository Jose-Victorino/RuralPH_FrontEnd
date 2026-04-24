# Rural Rising
### Development
Page | Status | Notes
-|-|-
Home 								| `Done`	 		|
About Us 						| `Done` 			|
Our journey					|	`Done`  		|
FAQs 								| `Done` 			|
In The News					| `Done`			|
Events 							| `Done`  		|
Locations						| `Done`  		|
Contact Us 					| On-going		| Pending email endpoint
Privacy Policy 			| `Done` 			|
Terms & Conditions	| `Done` 			|
Stories							| `Done`			|
Events (admin)			| `Done`			|
In The News (admin)	| `Done`			|
Stories (admin)			| `Done`    	|
Our journey (admin)	| `Done`    	|

Rural Rising is a React + Vite web application focused on storytelling, events, and community-facing content for rural development initiatives.

## Features

- Modern landing pages and informational sections
- Story listing and story post pages
- Event page experience
- Authentication UI (Login and Sign Up)
- Responsive UI with SCSS modules
- Scroll and animation enhancements

## Tech Stack
- React 19
- Vite 7
- React Router 7
- SCSS modules
- Formik + Yup
- Supabase JavaScript client
- React Toastify
- React Leaflet
- ESLint

## Prerequisites
- Node.js 22
- npm (or compatible package manager)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open the URL shown in your terminal (typically `http://localhost:5173`).
## Available Scripts
- `npm run dev` - start development server
- `npm run build` - create a production build in `dist/`
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks

## Project Structure
```text
src/
├─ assets/             # images and static assets
├─ components/         # reusable UI components
├─ context/            # global context/state
├─ hook/               # custom hooks
├─ layouts/            # layout components
├─ library/            # utilities/helpers
├─ pages/              # route-level pages
├─ service/            # backend-facing service layer
├─ styles/             # shared SCSS (variables, base, reset)
├─ App.jsx
├─ DashboardApp.jsx
├─ LandingApp.jsx
├─ main.jsx
└─ supabase-client.js
```

## Data Model (Reference)
### `Journey`
- `id` (PK)
- `title` (string)
- `description` (string)
- `image_path` (string)
- `created_at` (timestamp)

### `Event`
- `id` (PK)
- `title` (string)
- `description` (string)
- `location` (string)
- `date` (string)
- `time_start` (time)
- `time_end` (time)

### `Story`
- `id` (PK)
- `title` (string)
- `description` (text)
- `created_at` (timestamp)

### `StoryMedia`
- `id` (PK)
- `story_id` (FK -> Story)
- `media_path` (string)

## Deployment
After building:
```bash
npm run build
```

Deploy the generated `dist/` folder to any static host such as Vercel, Netlify, or GitHub Pages.