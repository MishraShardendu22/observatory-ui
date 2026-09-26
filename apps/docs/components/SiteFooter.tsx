import Link from "next/link";
import { DASHBOARD_REPO_URL, REPO_URL } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="docs-footer">
      <p>
        The Observatory design system. Built for the{" "}
        <a href={DASHBOARD_REPO_URL} target="_blank" rel="noreferrer">
          GitHub Backup Automation System
        </a>
        , usable by any web app.
      </p>
      <div className="docs-footer__links">
        <Link href="/install/">Install</Link>
        <Link href="/tokens/">Tokens</Link>
        <Link href="/components/">Components</Link>
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          Source
        </a>
      </div>
    </footer>
  );
}
