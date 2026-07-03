import { expect, test } from "@playwright/test";

test("SUPPORT-QUEUE-SUMMARY-S001 shows status totals", async ({ page }) => {
  // Covers SUPPORT-QUEUE-SUMMARY-R001.
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Queue summary" }),
  ).toBeVisible();
  await expect(page.getByTestId("queue-summary-open")).toHaveText("1");
  await expect(page.getByTestId("queue-summary-in-progress")).toHaveText("1");
  await expect(page.getByTestId("queue-summary-resolved")).toHaveText("1");
});
