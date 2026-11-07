import agamBlog from "../Assets/opt/agam_blog.jpg";
import studentCrm from "../Assets/opt/student_crm.jpg";
import portfolio from "../Assets/opt/portfolio.jpg";
import ticketPortal from "../Assets/opt/ticket_portal.jpg";
import customTable from "../Assets/opt/custom_table.jpg";
import season from "../Assets/opt/season.jpg";
import exploring from "../Assets/opt/exploring.jpg";
import kashiDana from "../Assets/opt/blog.jpg";
import productCatalogue from "../Assets/opt/product_catalogue.jpg";

// Categories drive the filter on the Work page.
export const CATEGORIES = ["Products", "Interfaces", "Early work"];

/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} title
 * @property {string} category   One of CATEGORIES
 * @property {string} summary    One line for cards
 * @property {string} description
 * @property {string[]} stack
 * @property {string} image
 * @property {string} [repo]
 * @property {string} [live]
 * @property {boolean} [featured]  Shown large on the home page and marked on the Work page
 * @property {string[]} [highlights] Key features, listed on featured cards
 */

/** @type {Project[]} */
export const PROJECTS = [
  {
    slug: "agam-blog",
    title: "Agam's Blog",
    category: "Products",
    summary: "A personal publishing platform with a private writing studio.",
    description:
      "A home for long-form writing, with a private studio for drafting and publishing posts. Built on Next.js and hosted on Vercel.",
    stack: ["Next.js", "Turso", "Markdown", "Vercel"],
    image: agamBlog,
    repo: "https://github.com/vns-agm/agam-blog",
    live: "https://agam-blog-iota.vercel.app/",
    featured: true,
    highlights: [
      "Markdown editor with drafts",
      "Password-protected admin panel",
      "Light and dark reading themes",
      "Turso (libSQL) database",
    ],
  },
  {
    slug: "student-crm",
    title: "Student CRM",
    category: "Products",
    summary: "Operations software for Agm-Chess Classes.",
    description:
      "Student profiles and day-to-day operations for a chess academy, in one place. Built with React and Express, using SQLite locally and Turso on Vercel.",
    stack: ["React", "Express", "SQLite", "Turso"],
    image: studentCrm,
    repo: "https://github.com/vns-agm/Student_crm",
    live: "https://student-crm-drab.vercel.app/",
    featured: true,
    highlights: [
      "Attendance: present, late, absent",
      "Fees and payment tracking",
      "Batch management",
      "CSV export for reporting",
    ],
  },
  {
    slug: "product-catalogue",
    title: "Product Catalogue",
    category: "Products",
    summary: "Browse, search and enquire, with enquiries emailed to sales.",
    description:
      "A proof-of-concept product catalogue: browse featured products and categories, search, view a product and send an enquiry that emails the sales inbox.",
    stack: ["React", "TypeScript", "Express", "Turso"],
    image: productCatalogue,
    repo: "https://github.com/vns-agm/product-catalogue",
    live: "https://product-catalogue-xi.vercel.app",
  },
  {
    slug: "exploring-places",
    title: "Exploring Places",
    category: "Early work",
    summary: "Map-based discovery of what's nearby.",
    description:
      "An interactive map that finds places near you through the Foursquare API, shows the distance to each result, and caches responses for faster loads.",
    stack: ["React", "Leaflet", "Foursquare API"],
    image: exploring,
    repo: "https://github.com/vns-agm/Seasons-app",
    live: "https://exploring-places.web.app/",
  },
  {
    slug: "ticket-portal",
    title: "Ticket Portal",
    category: "Products",
    summary: "Personal issue tracking and ticket management.",
    description:
      "Create tickets, set priority and due dates, add comments, assign work and close issues, all in one focused workspace.",
    stack: ["React"],
    image: ticketPortal,
    repo: "https://github.com/vns-agm/Ticket_portal",
    live: "https://ticket-portal-dusky.vercel.app/",
  },
  {
    slug: "kashi-dana",
    title: "Kashi Dana",
    category: "Products",
    summary: "A responsive e-commerce storefront.",
    description:
      "An e-commerce site with a modern, responsive design and interactive shopping features, built with React and deployed on Vercel.",
    stack: ["React", "Vercel"],
    image: kashiDana,
    repo: "https://github.com/vns-agm/kashi-dana",
    live: "https://kashi-dana.vercel.app/",
  },
  {
    slug: "custom-table",
    title: "Custom Table",
    category: "Interfaces",
    summary: "A performant, highly customisable data table.",
    description:
      "A table component used across several web applications, supporting custom cells, sorting and filtering, infinite scroll and virtual rendering.",
    stack: ["React", "JavaScript", "CSS"],
    image: customTable,
    repo: "https://github.com/vns-agm/Ticket_portal",
    live: "https://custom-table-sigma.vercel.app/",
  },
  {
    slug: "portfolio",
    title: "This portfolio",
    category: "Interfaces",
    summary: "The site you're on, designed and built from scratch.",
    description:
      "A React single-page site with light and dark themes, a command palette, a live GitHub activity view and a playable chess puzzle. Hosted on Firebase.",
    stack: ["React", "CSS", "Firebase"],
    image: portfolio,
    repo: "https://github.com/vns-agm/agam-portfolio",
    live: "https://agam-portfolio.web.app/",
  },
  {
    slug: "seasons-app",
    title: "Season's App",
    category: "Early work",
    summary: "One of my first single-page applications.",
    description:
      "Asks for your location and tells you the season where you are. Built while I was first learning single-page applications.",
    stack: ["React", "Geolocation API"],
    image: season,
    repo: "https://github.com/vns-agm/Seasons-app",
    live: "https://project-season-app.web.app/",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
