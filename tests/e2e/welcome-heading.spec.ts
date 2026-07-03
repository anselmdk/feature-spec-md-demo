import { expect, specStep, test } from "./specEvidence";

test("SUPPORT-WELCOME-HEADING-S001 shows the mini support desk heading", async ({ page }, testInfo) => {
  // Covers SUPPORT-WELCOME-HEADING-R001.
  await specStep(page, testInfo, "SUPPORT-WELCOME-HEADING-S001", "Given the support agent opens the mini support desk", async () => {
    await page.goto("/");
  });

  await specStep(page, testInfo, "SUPPORT-WELCOME-HEADING-S001", "When the page loads", async () => {
    await expect(page.getByRole("heading", { name: "Mini support desk" })).toBeVisible();
  });

  await specStep(page, testInfo, "SUPPORT-WELCOME-HEADING-S001", "Then they see the Mini support desk heading", async () => {
    await expect(page.getByRole("heading", { name: "Mini support desk" })).toBeVisible();
  });
});
