import { createPlaywrightSpecEvidence } from "@anselmdk/feature-spec-md/playwright";
import { expect, test as base } from "@playwright/test";

export { expect };
export const test = base;

export const { specStep } = createPlaywrightSpecEvidence(base, {
  specs: [
    "specs/ticket-creation.feature.md",
    "specs/ticket-filtering.feature.md",
    "specs/ticket-status.feature.md",
  ],
  reportDir: "test-results/spec-report",
});
