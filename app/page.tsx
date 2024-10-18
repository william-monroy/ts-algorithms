import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-4">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "blue" })}>TS&nbsp;</span>
        <span className={title()}>Algorithms</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Compilation of TypeScript algorithms and data structures.
        </div>
      </div>

      <div className="flex gap-3">
        <Link as={NextLink} href={siteConfig.navItems[1].href}>
          <Button color="primary" radius="full" variant="shadow">
            Get Started
          </Button>
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <p className="text-center text-lg font-semibold">What is icluded?</p>
        <br />
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Search patterns with&nbsp;
            <Link isExternal href={siteConfig.links.z}>
              <Code color="primary">z-algorithm</Code>
            </Link>
          </span>
          <span>
            Longest palindromic substring with&nbsp;
            <Link isExternal href={siteConfig.links.manacher}>
              <Code color="primary">manacher</Code>
            </Link>
          </span>
          <span>
            Longest common subsequence with&nbsp;
            <Link isExternal href={siteConfig.links.lcs}>
              <Code color="primary">lcs</Code>
            </Link>
          </span>
          <span>
            Auto-complete suggestions with&nbsp;
            <Link isExternal href={siteConfig.links.trie}>
              <Code color="primary">trie</Code>
            </Link>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
