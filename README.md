# Rural Rising

### Development
Page | Status | Notes
-|-|-
Home 								| On-going 		| Media required; Video player modal integration
About Us 						| On-going 		| Media required
Our journey					|	On-going		| Media required
FAQs 								| `Done` 			| 
In The News					| Not Started	| Media required; Video player modal integration
Events 							| Not Started | 
Contact Us 					| `Done` 			| Media required; Pending email endpoint
Privacy Policy 			| `Done` 			| 
Terms & Conditions	| `Done` 			| 
**Stories**					| Not Started | 

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

## Contributing
Open an issue or submit a PR. Keep changes focused and update styles or components with corresponding module files.

## License
MIT (add LICENSE file to repository)

---

Questions? Check the source code or open an issue.