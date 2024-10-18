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
  navMenuItems: [],
  links: {
    github: "https://github.com/william-monroy/ts-algorithms",
    z: "https://github.com/william-monroy/ts-algorithms/blob/main/lib/z.ts",
    manacher:
      "https://github.com/william-monroy/ts-algorithms/blob/main/lib/manacher.ts",
    lcs: "https://github.com/william-monroy/ts-algorithms/blob/main/lib/lcs.ts",
    trie: "https://github.com/william-monroy/ts-algorithms/blob/main/lib/trie.ts",
  },
};
