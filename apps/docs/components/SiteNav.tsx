import { ButtonLink, GitHubIcon } from "@mishrashardendu22/observatory-ui";
import Link from "next/link";
import { REPO_URL } from "@/content/site";

const links = [
  { href: "/install/", label: "Install" },
  { href: "/tokens/", label: "Tokens" },
  { href: "/components/", label: "Components" },
];

export function SiteNav() {
  return (
    <header className="docs-nav">
      <nav className="docs-nav__bar" aria-label="Site">
        <Link href="/" className="docs-nav__brand">
          <span className="docs-nav__tile" aria-hidden="true">
            <span className="docs-nav__moon" />
          </span>
          Observatory
        </Link>
        <div className="docs-nav__links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="docs-nav__actions">
          <ButtonLink
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="sm"
            leftIcon={<GitHubIcon />}
          >
            GitHub
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
