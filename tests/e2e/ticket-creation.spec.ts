import { expect, specStep, test } from "./specEvidence";

test("TICKET-CREATION-S001 User creates a valid ticket", async ({
  page,
}, testInfo) => {
  const scenarioId = "TICKET-CREATION-S001";

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Given the user is on the ticket desk",
    async () => {
      await page.goto("/");
      await expect(
        page.getByRole("heading", { name: "Mini support desk" }),
      ).toBeVisible();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "When they create a ticket with a valid title",
    async () => {
      await page.getByLabel("Title").fill("Laptop screen flickers");
      await page.getByRole("button", { name: "Create ticket" }).click();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Then the new ticket is visible",
    async () => {
      await expect(
        page.getByRole("heading", { name: "Laptop screen flickers" }),
      ).toBeVisible();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "And the ticket has status open",
    async () => {
      const ticket = page
        .getByTestId("ticket-card")
        .filter({ hasText: "Laptop screen flickers" });
      await expect(ticket).toContainText("Status: open");
    },
  );
});

test("TICKET-CREATION-S002 User cannot create a ticket without a title", async ({
  page,
}, testInfo) => {
  const scenarioId = "TICKET-CREATION-S002";

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Given the user is on the ticket desk",
    async () => {
      await page.goto("/");
      await expect(
        page.getByRole("heading", { name: "Mini support desk" }),
      ).toBeVisible();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "When they try to create a ticket without a title",
    async () => {
      await page.getByRole("button", { name: "Create ticket" }).click();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Then the ticket is not created",
    async () => {
      await expect(
        page.getByRole("heading", { name: "Tickets" }),
      ).toBeVisible();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "And they see a title validation message",
    async () => {
      await expect(page.getByRole("alert")).toHaveText("Title is required.");
    },
  );
});
