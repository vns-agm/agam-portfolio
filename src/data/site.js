// Single source for contact details and external links, shared by the
// navigation, footer, contact page and command palette.

export const PERSON = {
  name: "Agam Srivastava",
  role: "Senior Software Engineer",
  company: "Sopra Steria",
  location: "Bengaluru, India",
  email: "agamsrivastavavns1193@gmail.com",
  phone: "+91 8687522809",
};

export const RESUME = {
  href: "/Agam_Srivastava_MERN_3.8YOE.pdf",
  fileName: "Agam_Srivastava_Resume.pdf",
};

export const BLOG_URL = "https://agam-blog-iota.vercel.app/";

export const SOCIALS = [
  { key: "github", label: "GitHub", href: "https://github.com/vns-agm" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/agam-srivastava-33456b212/" },
  { key: "blog", label: "Blog", href: BLOG_URL },
  { key: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/urVlyMewy3/" },
  { key: "lichess", label: "Lichess", href: "https://lichess.org/@/vns-agm" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/agm_srv/" },
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/project", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/activity", label: "Activity" },
  { to: "/resume", label: "Résumé" },
  { to: "/contact", label: "Contact" },
];

// Career started January 2022; shown rounded down to the nearest half year (e.g. 4.5).
export const YEARS_EXPERIENCE = (() => {
  const now = new Date();
  const months = (now.getFullYear() - 2022) * 12 + now.getMonth();
  return Math.floor((months / 12) * 2) / 2;
})();
