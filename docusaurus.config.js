// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Mobile et objets connectés",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Déploiement GitHub Pages
  url: "https://ldan12.github.io",     // ton GitHub username
  baseUrl: "/420-W50-SF/",      // ton repo GitHub
  organizationName: "ldan12",          // ton GitHub username
  projectName: "420-W50-SF",    // le repo
  deploymentBranch: "gh-pages",          // branche de déploiement

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",   // je mets fr par défaut (tu peux laisser "en")
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Mobile et objets connectés",
      logo: {
        alt: "Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Notes de cours",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [{ label: "Intro", to: "/docs/intro" }],
        },
        {
          title: "Communauté",
          items: [
            { label: "Stack Overflow", href: "https://stackoverflow.com/questions/tagged/docusaurus" },
            { label: "Discord", href: "https://discordapp.com/invite/docusaurus" },
          ],
        },
        {
          title: "Plus",
          items: [
            { label: "Blog", to: "/blog" },
            { label: "GitHub", href: "https://github.com/ldan12/420-W50-SF" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Mobile et objets connectés.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
