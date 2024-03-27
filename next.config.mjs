import { createRequire } from "module";
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  // Your Next.js configuration here
};
export default withBundleAnalyzer(nextConfig);
