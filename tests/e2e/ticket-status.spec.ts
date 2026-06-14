import { expect, test } from "@playwright/test";

test("TICKET-STATUS-S001 User moves a ticket to in progress", async ({
  page,
}) => {
  await page.goto("/");

  const ticket = page
    .getByTestId("ticket-card")
    .filter({ hasText: "Printer is offline" });

  await test.step("When the user starts working on the ticket", async () => {
    await ticket.getByRole("button", { name: "Start work" }).click();
  });

  await test.step("Then the ticket status is in progress", async () => {
    await expect(ticket).toContainText("Status: in-progress");
  });
});

test("TICKET-STATUS-S002 User resolves a ticket with a note", async ({
  page,
}) => {
  await page.goto("/");

  const ticket = page
    .getByTestId("ticket-card")
    .filter({ hasText: "Email delivery is slow" });

  await test.step("When the user enters a resolution note and resolves the ticket", async () => {
    await ticket.getByLabel("Resolution note").fill("Queue was restarted.");
    await ticket.getByRole("button", { name: "Resolve" }).click();
  });

  await test.step("Then the ticket status is resolved", async () => {
    await expect(ticket).toContainText("Status: resolved");
  });

  await test.step("And the resolution note is visible", async () => {
    await expect(ticket).toContainText("Resolution: Queue was restarted.");
  });
});

test("TICKET-STATUS-S003 User cannot resolve a ticket without a note", async ({
  page,
}) => {
  await page.goto("/");

  const ticket = page
    .getByTestId("ticket-card")
    .filter({ hasText: "Printer is offline" });

  await test.step("Given an in-progress ticket is visible", async () => {
    await ticket.getByRole("button", { name: "Start work" }).click();
    await expect(ticket).toContainText("Status: in-progress");
  });

  await test.step("When the user tries to resolve the ticket without a note", async () => {
    await ticket.getByRole("button", { name: "Resolve" }).click();
  });

  await test.step("Then the ticket is not resolved", async () => {
    await expect(ticket).toContainText("Status: in-progress");
  });

  await test.step("And they see a resolution note validation message", async () => {
    await expect(ticket.getByRole("alert")).toHaveText(
      "Resolution note is required.",
    );
  });
});
