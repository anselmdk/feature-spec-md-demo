import { expect, specStep, test } from "./specEvidence";

test("TICKET-STATUS-S001 User moves a ticket to in progress", async ({
  page,
}, testInfo) => {
  const scenarioId = "TICKET-STATUS-S001";
  let ticket = page
    .getByTestId("ticket-card")
    .filter({ hasText: "Printer is offline" });

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Given an open ticket is visible",
    async () => {
      await page.goto("/");
      ticket = page
        .getByTestId("ticket-card")
        .filter({ hasText: "Printer is offline" });
      await expect(ticket).toContainText("Status: open");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "When the user starts working on the ticket",
    async () => {
      await ticket.getByRole("button", { name: "Start work" }).click();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Then the ticket status is in progress",
    async () => {
      await expect(ticket).toContainText("Status: in-progress");
    },
  );
});

test("TICKET-STATUS-S002 User resolves a ticket with a note", async ({
  page,
}, testInfo) => {
  const scenarioId = "TICKET-STATUS-S002";
  let ticket = page
    .getByTestId("ticket-card")
    .filter({ hasText: "Email delivery is slow" });

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Given an in-progress ticket is visible",
    async () => {
      await page.goto("/");
      ticket = page
        .getByTestId("ticket-card")
        .filter({ hasText: "Email delivery is slow" });
      await expect(ticket).toContainText("Status: in-progress");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "When the user enters a resolution note and resolves the ticket",
    async () => {
      await ticket.getByLabel("Resolution note").fill("Queue was restarted.");
      await ticket.getByRole("button", { name: "Resolve" }).click();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Then the ticket status is resolved",
    async () => {
      await expect(ticket).toContainText("Status: resolved");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "And the resolution note is visible",
    async () => {
      await expect(ticket).toContainText("Resolution: Queue was restarted.");
    },
  );
});

test("TICKET-STATUS-S003 User cannot resolve a ticket without a note", async ({
  page,
}, testInfo) => {
  const scenarioId = "TICKET-STATUS-S003";
  let ticket = page
    .getByTestId("ticket-card")
    .filter({ hasText: "Printer is offline" });

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Given an in-progress ticket is visible",
    async () => {
      await page.goto("/");
      ticket = page
        .getByTestId("ticket-card")
        .filter({ hasText: "Printer is offline" });
      await ticket.getByRole("button", { name: "Start work" }).click();
      await expect(ticket).toContainText("Status: in-progress");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "When the user tries to resolve the ticket without a note",
    async () => {
      await ticket.getByRole("button", { name: "Resolve" }).click();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Then the ticket is not resolved",
    async () => {
      await expect(ticket).toContainText("Status: in-progress");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "And they see a resolution note validation message",
    async () => {
      await expect(ticket.getByRole("alert")).toHaveText(
        "Resolution note is required.",
      );
    },
  );
});
