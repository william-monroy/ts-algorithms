import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "blue" })}>TS&nbsp;</span>
        <span className={title()}>Algorithms</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Compilation of TypeScript algorithms and data structures.
        </div>
      </div>

      <div className="flex gap-3">
        <Button color="primary" radius="full" variant="shadow">
          Get Started
        </Button>
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
            Search palindromes with
            <Code color="primary">z-algorithm</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
