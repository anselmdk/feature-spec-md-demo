import { expect, specStep, test } from "./specEvidence";

test("TICKET-PRIORITY-S001 TICKET-PRIORITY-R001 TICKET-PRIORITY-R002 TICKET-PRIORITY-R003 Agent sees seeded ticket priorities", async ({
  page,
}, testInfo) => {
  const scenarioId = "TICKET-PRIORITY-S001";

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Given the support agent opens the mini support desk",
    async () => {
      await page.goto("/");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "When the seeded ticket queue is displayed",
    async () => {
      await expect(
        page.getByRole("heading", { name: "Printer is offline" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Email delivery is slow" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Password reset loop" }),
      ).toBeVisible();
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "Then active operational tickets are shown as high priority",
    async () => {
      await expect(page.getByTestId("ticket-priority-seed-open")).toHaveText(
        "high",
      );
      await expect(
        page.getByTestId("ticket-priority-seed-progress"),
      ).toHaveText("high");
    },
  );

  await specStep(
    page,
    testInfo,
    scenarioId,
    "And the resolved ticket is shown as normal priority",
    async () => {
      await expect(
        page.getByTestId("ticket-priority-seed-resolved"),
      ).toHaveText("normal");
    },
  );
});
