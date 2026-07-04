import { expect, test } from "@playwright/test";

test("SUPPORT-DESK-TICKET-PRIORITY-S001 SUPPORT-DESK-TICKET-PRIORITY-R003 user creates a high-priority ticket", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Title").fill("Production is down");
  await page.getByLabel("Priority").selectOption("high");
  await page.getByRole("button", { name: "Create ticket" }).click();

  const ticket = page.getByTestId("ticket-card").filter({
    has: page.getByRole("heading", { name: "Production is down" }),
  });

  await expect(ticket).toContainText("High priority");
  await expect(page.getByLabel("Priority")).toHaveValue("normal");
});
