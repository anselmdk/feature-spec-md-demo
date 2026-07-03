import { expect, test } from "@playwright/test";
import { createPlaywrightSpecEvidence } from "@anselmdk/feature-spec-md/playwright";

const evidence = createPlaywrightSpecEvidence(test, {
  specs: ["specs/**/*.feature.md"],
});

test("SUPPORT-QUEUE-SUMMARY-S001 shows status totals", async (
  { page },
  testInfo,
) => {
  // Covers SUPPORT-QUEUE-SUMMARY-R001.
  await evidence.specStep(
    page,
    testInfo,
    "SUPPORT-QUEUE-SUMMARY-S001",
    "Given the support agent opens the mini support desk",
    async () => {
      await page.goto("/");
    },
  );

  await evidence.specStep(
    page,
    testInfo,
    "SUPPORT-QUEUE-SUMMARY-S001",
    "When the seeded ticket queue is displayed",
    async () => {
      await expect(
        page.getByRole("heading", { name: "Queue summary" }),
      ).toBeVisible();
    },
  );

  await evidence.specStep(
    page,
    testInfo,
    "SUPPORT-QUEUE-SUMMARY-S001",
    "Then they see one open ticket, one in-progress ticket, and one resolved ticket",
    async () => {
      await expect(page.getByTestId("queue-summary-open")).toHaveText("1");
      await expect(page.getByTestId("queue-summary-in-progress")).toHaveText(
        "1",
      );
      await expect(page.getByTestId("queue-summary-resolved")).toHaveText("1");
    },
  );
});
