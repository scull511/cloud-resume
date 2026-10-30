// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
// import aws from "astro-sst";

// https://astro.build/config
export default defineConfig({
  // prefetch: {
  //   prefetch: true,
  //   prefetchAll: true,
  //   defaultStrategy: "load",
  // },
  output: "static",
  // output: "server",
  // adapter: aws({
  //   deploymentStrategy: "regional",
  //   responseMode: "buffer",
  // }),
  // image: {
  //   service: passthroughImageService(),
  // },
});
