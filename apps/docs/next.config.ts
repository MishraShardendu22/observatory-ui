import type { NextConfig } from "next";

// Static export: the site is plain files, served by GitHub Pages under
// /observatory-ui (NEXT_PUBLIC_BASE_PATH) or by any static host at /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["@mishrashardendu22/observatory-ui"],
};

export default nextConfig;
