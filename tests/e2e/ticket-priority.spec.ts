import { expect, specStep, test } from "./specEvidence";

test("SUPPORT-DESK-TICKET-PRIORITY-S001 SUPPORT-DESK-TICKET-PRIORITY-R003 SUPPORT-DESK-TICKET-PRIORITY-R004 user creates a high-priority ticket", async ({
  page,
}, testInfo) => {
  const scenarioId = "SUPPORT-DESK-TICKET-PRIORITY-S001";

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Given the user is on the support desk",
    async () => {
      await page.goto("/");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    'When they create a ticket titled "Production is down" with high priority',
    async () => {
      await page.getByLabel("Title").fill("Production is down");
      await page.getByLabel("Priority").selectOption("high");
      await page.getByRole("button", { name: "Create ticket" }).click();
    },
  );

  const ticket = page.getByTestId("ticket-card").filter({
    has: page.getByRole("heading", { name: "Production is down" }),
  });

  await specStep(
    page,
    testInfo,
    scenarioId,
    'Then the ticket shows "High priority"',
    async () => {
      await expect(ticket).toContainText("High priority");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "And the high-priority ticket is visually emphasized",
    async () => {
      await expect(ticket).toHaveCSS("border-left-width", "6px");
      await expect(ticket).toHaveCSS("border-left-color", "rgb(217, 45, 32)");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "And the next create-ticket priority is normal",
    async () => {
      await expect(page.getByLabel("Priority")).toHaveValue("normal");
    },
  );
});
