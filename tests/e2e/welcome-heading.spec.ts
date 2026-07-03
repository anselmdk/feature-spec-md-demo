import { expect, test } from "@playwright/test";
import { createPlaywrightSpecEvidence } from "@anselmdk/feature-spec-md/playwright";

const evidence = createPlaywrightSpecEvidence(test, {
  specs: ["specs/**/*.feature.md"],
});

test("SUPPORT-WELCOME-HEADING-S001 shows the mini support desk heading", async (
  { page },
  testInfo,
) => {
  // Covers SUPPORT-WELCOME-HEADING-R001.
  await evidence.specStep(
    page,
    testInfo,
    "SUPPORT-WELCOME-HEADING-S001",
    "Given the support agent opens the mini support desk",
    async () => {
      await page.goto("/");
    },
  );

  await evidence.specStep(
    page,
    testInfo,
    "SUPPORT-WELCOME-HEADING-S001",
    "When the page loads",
    async () => {
      await expect(
        page.getByRole("heading", { name: "Mini support desk" }),
      ).toBeVisible();
    },
  );

  await evidence.specStep(
    page,
    testInfo,
    "SUPPORT-WELCOME-HEADING-S001",
    "Then they see the Mini support desk heading",
    async () => {
      await expect(
        page.getByRole("heading", { name: "Mini support desk" }),
      ).toBeVisible();
    },
  );
});
