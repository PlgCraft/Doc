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
  async redirects() {
    return [
      // SourceFlow was renamed to Sellslink. 301 the old product page and
      // its assets so existing links and search results keep working.
      {
        source: "/project/sourceflow",
        destination: "/project/sellslink",
        statusCode: 301,
      },
      {
        source: "/products/sourceflow/:path*",
        destination: "/products/sellslink/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default withMDX(config);
