import { expect, test } from "@playwright/test";

test("TICKET-CREATION-S001 User creates a valid ticket", async ({ page }) => {
  await page.goto("/");

  await test.step("Given the user is on the ticket desk", async () => {
    await expect(
      page.getByRole("heading", { name: "Mini support desk" }),
    ).toBeVisible();
  });

  await test.step("When they create a ticket with a valid title", async () => {
    await page.getByLabel("Title").fill("Laptop screen flickers");
    await page.getByRole("button", { name: "Create ticket" }).click();
  });

  await test.step("Then the new ticket is visible", async () => {
    await expect(
      page.getByRole("heading", { name: "Laptop screen flickers" }),
    ).toBeVisible();
  });

  await test.step("And the ticket has status open", async () => {
    const ticket = page
      .getByTestId("ticket-card")
      .filter({ hasText: "Laptop screen flickers" });
    await expect(ticket).toContainText("Status: open");
  });
});

test("TICKET-CREATION-S002 User cannot create a ticket without a title", async ({
  page,
}) => {
  await page.goto("/");

  await test.step("When they try to create a ticket without a title", async () => {
    await page.getByRole("button", { name: "Create ticket" }).click();
  });

  await test.step("Then the ticket is not created", async () => {
    await expect(page.getByRole("heading", { name: "Tickets" })).toBeVisible();
  });

  await test.step("And they see a title validation message", async () => {
    await expect(page.getByRole("alert")).toHaveText("Title is required.");
  });
});
