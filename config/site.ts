export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TS Algorithms",
  description: "A collection of algorithms implemented in TypeScript",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Demo",
      href: "/demo",
    },
  ],
  navMenuItems: [
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/william-monroy/ts-algorithms",
  },
};
