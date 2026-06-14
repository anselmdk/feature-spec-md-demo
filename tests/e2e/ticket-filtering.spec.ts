import { expect, test } from "@playwright/test";

test("TICKET-FILTERING-S001 User sees all tickets", async ({ page }) => {
  await page.goto("/");

  await test.step("When the user selects the all filter", async () => {
    await page.getByRole("button", { name: "all" }).click();
  });

  await test.step("Then every ticket is visible", async () => {
    await expect(
      page.getByRole("heading", { name: "Printer is offline" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Email delivery is slow" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Password reset loop" }),
    ).toBeVisible();
  });
});

test("TICKET-FILTERING-S002 User filters open tickets", async ({ page }) => {
  await page.goto("/");

  await test.step("When the user selects the open filter", async () => {
    await page.getByRole("button", { name: "open" }).click();
  });

  await test.step("Then only open tickets are visible", async () => {
    await expect(
      page.getByRole("heading", { name: "Printer is offline" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Email delivery is slow" }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Password reset loop" }),
    ).not.toBeVisible();
  });
});

test("TICKET-FILTERING-S003 User filters resolved tickets", async ({
  page,
}) => {
  await page.goto("/");

  await test.step("When the user selects the resolved filter", async () => {
    await page.getByRole("button", { name: "resolved" }).click();
  });

  await test.step("Then only resolved tickets are visible", async () => {
    await expect(
      page.getByRole("heading", { name: "Printer is offline" }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Email delivery is slow" }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Password reset loop" }),
    ).toBeVisible();
  });
});
