import path from "path";
import { fileURLToPath } from "url";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 95],
  },
  turbopack: {
    root: __dirname,
  },
};

export default withMDX(config);
