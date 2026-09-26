"use client";

import {
  Button,
  ErrorState,
  Segmented,
} from "@mishrashardendu22/observatory-ui";
import { useState } from "react";

const RANGES = [
  { value: "24h", label: "24h" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "all", label: "All" },
] as const;

export function SegmentedDemo() {
  const [range, setRange] = useState<(typeof RANGES)[number]["value"]>("7d");
  return (
    <Segmented
      aria-label="Range"
      options={RANGES}
      value={range}
      onChange={setRange}
    />
  );
}

export function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
      }}
    >
      Run backup
    </Button>
  );
}

export function ErrorStateDemo() {
  const [tries, setTries] = useState(0);
  return (
    <ErrorState
      message={
        tries
          ? `Still failing after ${tries} ${tries === 1 ? "retry" : "retries"}.`
          : "Bundle upload timed out after 30s."
      }
      retry={() => setTries((n) => n + 1)}
    />
  );
}
