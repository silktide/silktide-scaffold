/**
 * Site-wide configuration — change these values to rebrand the app.
 * Header, Footer, and HTML metadata all read from this file.
 */

export const siteConfig = {
  name: "Scaffold App",
  description: "A full-stack scaffold built with Next.js and Express.js",
  url: "http://localhost:3000",

  navigation: [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} Scaffold App. All rights reserved.`,
    links: [
      { label: "GitHub", href: "https://github.com/silktide/silktide-scaffold" },
      { label: "Docs", href: "/docs" },
    ],
  },
};
