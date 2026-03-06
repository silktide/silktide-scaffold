/**
 * Site-wide configuration — change these values to rebrand the app.
 * Header, Footer, and HTML metadata all read from this file.
 */

export const siteConfig = {
  name: "My App",
  description: "",

  navigation: [
    { label: "Home", href: "/" },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} My App`,
  },
};
