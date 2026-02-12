# Cwiri Website

This repository contains the source code for the Cwiri public website.  
It is a lightweight, static site built with HTML, CSS, and JavaScript, designed to communicate our mission, approach, and science‑led monitoring philosophy.

## Overview

The site includes:

- **Home page** – high‑level introduction to Cwiri and our work.
- **About page** – our origin story, mission, adaptive monitoring framework, and scientific approach.
- **Tier pages** – descriptions of Bronze, Silver, Gold, and Platinum monitoring tiers.
- **Contact page** – enquiry form and company details.
- **Shared UI components** – navigation bar, layout system, and styling.

The design emphasises clarity, scientific rigour, and landscape‑driven visuals, using a combination of abstract UI overlays, gradient bands, and real‑world imagery.

## Structure
```
website/
├── index.html
├── about.html
├── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   └── navbar.js
│
└── images/
    ├── landscapes/
    ├── ui-overlays/
    └── icons/
```

- **HTML** – page templates and content  
- **CSS** – global styles, layout system, gradients, cards, and components  
- **JS** – navigation bar loading and small interactive elements  
- **Images** – landscape photography, UI overlays, and brand assets  

## Development

This is a static site — no build tools or frameworks required.

To work locally:

1. Clone or download the repository  
2. Open any `.html` file directly in a browser  
3. Edit files in your preferred editor (VS Code recommended)

Changes appear immediately on refresh.

## Contributing

1. Create a new branch for your changes  
2. Commit with clear messages  
3. Open a pull request into `main`  
4. PRs should be reviewed by another team member before merging

For small fixes (typos, spacing, minor CSS), direct commits to `main` are acceptable.

## Deployment

The site can be deployed to any static hosting provider, including:

- GitHub Pages  
- Netlify  
- Vercel  
- Azure Static Web Apps  

(Deployment configuration will be added once hosting is chosen.)

## Assets & Licensing

All landscape images and UI overlays included in this repository are owned by Cwiri and must not be reused outside the organisation without permission.

## Contact

For questions about the website or contributions, contact the Cwiri team internally.
