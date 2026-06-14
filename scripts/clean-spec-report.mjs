import { rm } from "node:fs/promises";

await rm(new URL("../test-results/spec-report", import.meta.url), {
  recursive: true,
  force: true,
});
