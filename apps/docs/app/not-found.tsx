import { ButtonLink, Card } from "@mishrashardendu22/observatory-ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-error">
      <Card className="state-card">
        <h1 className="state-card__title">Page not found</h1>
        <p className="state-card__description">
          There is nothing at this address.
        </p>
        <ButtonLink
          component={Link}
          href="/"
          variant="outline"
          leftIcon={<ArrowLeft aria-hidden="true" />}
          style={{ marginTop: 24 }}
        >
          Back to the start
        </ButtonLink>
      </Card>
    </div>
  );
}
