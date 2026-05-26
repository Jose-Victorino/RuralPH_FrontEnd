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

**Added Revisions**
- [ ] Replace certain pics of Ace and Andie Estrada relative to content associated

**Font Style & Typography**
- [x] They want a font style similar to Monotype Montserrat mas bold, bigger, and easier to read.
- [x] Adjust the overall font sizes para mas readable especially sa mobile and tablet view.
- [x] Capitalize each word properly sa headings/titles.
- [x] Improve spacing between texts and sections para hindi dikit-dikit tingnan.

**Navigation**
- [x] Menu bar should hide while scrolling sa mobile.
- [x] Change the color of the menu bar.
- [x] Some elements/navigation should stay stationary if needed.
- [x] Ilagay yung Shop sa pinakadulo ng navigation/menu.
- [x] Shop should open in a new tab.

**Footer**
- [x] Add the complete address sa footer section.

**Mobile Responsiveness**
- [ ] The website should be responsive and optimized for:
  - Android
  - iOS
  - Tablets
  - iPads
- On mobile view:
  - [x] The logo should be centered
  - [x] Make sure hindi maliit yung logo and very visible/readable
  - [x] Adjust the logo size properly para standout pa din siya kahit mobile view
  - [x] Adjust the top and bottom spacing para mas balanced and hindi mukhang masyadong malayo yung logo

**Layout & Design**
- [x] Adjust the size of pictures and text para mas readable and mas balanced tingnan.
- [x] Apply gradient backgrounds.
- [x] Adjust the color palette/theme para mas modern and visually appealing.
- [ ] As much as possible avoid plain white-heavy layouts.
- [ ] Do not use a plain white and orange combination only.
- [x] Adjust the color/design of the menu bar para bagay sa overall theme.
- [x] Make sure readable yung text and hindi masakit sa eyes.
- [x] Add proper spacing sa sections and components.

**About Us / Our Journey**
- [x] Remove categories in `Our Journey`.
- [x] Merge `Our Journey` & `About Us`.
- [x] Make the section cleaner and more organized.

**Stories / Blog Section**
- [x] Highlight the Stories section since isa siya sa main features ng website.
- [ ] They want it to feel more like a modern blog or magazine style.
- Add a sidebar with:
  - [x] Date filter (prio)
  - [x] Search filter
- [x] Important texts/words sa stories should have highlights/emphasis.
- [x] Add preview-style buttons/features for stories.

**Story Creation / CMS Features**
- Bigger and more spacious yung story creation/editor area.
- Add Feature:
  - [x] Unlisted visibility option for selected groups of people only
  - [x] Add "Save as draft" feature
  - [x] Add tags (e.g. #capecod #atcaperod)
  - [x] Add types/categories to the posts
  - [x] Add archiving/hiding feature


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
└─ main.jsx
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

### `News`
- `id` (PK)
- `video_id` (string)
- `title` (string)
- `description` (string)
- `thumbnail_url` (string)
- `video_url` (string)
- `created_at` (timestamp)

### `Profiles`
- `id` (uuid)
- `first_name` (string)
- `last_name` (string)

### `Category`
- `id` (PK)
- `name` (string)
- `slug` (string)

### `Story`
- `id` (PK)
- `author_id` (FK -> Profiles)
- `category_id` (FK -> Category)
- `public_id` (string unique)
- `title` (string)
- `description` (string)
- `hashtags` (string)
- `status` (enum('draft', 'published'))
- `visibility` (enum('public', 'unlisted'))
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `published_at` (timestamp)

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