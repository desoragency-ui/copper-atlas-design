import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page in this shop is prebuilt at build time (no ISR, no on-demand
// revalidation), so the read-only static-assets cache is all it needs: no R2
// bucket, no queue, nothing extra to pay for.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
