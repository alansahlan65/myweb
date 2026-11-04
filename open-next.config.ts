// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import type { OpenNextConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

const config = defineCloudflareConfig({
	// For best results consider enabling R2 caching
	// See https://opennext.js.org/cloudflare/caching for more details
	// incrementalCache: r2IncrementalCache
});

export default {
	...config,
	// `npm run build` is this CLI, so the default `npm run build` child command
	// would call this file again. Point the inner Next build at the binary.
	buildCommand: "next build",
} satisfies OpenNextConfig;
