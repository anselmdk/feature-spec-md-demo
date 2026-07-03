import { expect, test } from "@playwright/test";

test("SUPPORT-WELCOME-HEADING-S001 shows the mini support desk heading", async ({
  page,
}) => {
  // Covers SUPPORT-WELCOME-HEADING-R001.
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Mini support desk" }),
  ).toBeVisible();
});
