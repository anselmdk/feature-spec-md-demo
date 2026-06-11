import { describe, expect, it } from "vitest";
import { canMoveToStatus, transitionTicket, type Ticket } from "../../src/ticketRules";

const openTicket: Ticket = { id: "1", title: "Printer is offline", status: "open" };
const progressTicket: Ticket = { id: "2", title: "Email delivery is slow", status: "in-progress" };

describe("ticket status rules", () => {
  it("TICKET-STATUS-R001 allows an open ticket to move to in progress", () => {
    expect(canMoveToStatus(openTicket, "in-progress")).toBe(true);
  });

  it("TICKET-STATUS-R002 allows an in-progress ticket to be resolved with a note", () => {
    expect(canMoveToStatus(progressTicket, "resolved", "Done")).toBe(true);
  });

  it("TICKET-STATUS-R003 rejects resolving without a resolution note", () => {
    expect(canMoveToStatus(progressTicket, "resolved", "")).toBe(false);
  });

  it("stores the resolution note when resolving a ticket", () => {
    expect(transitionTicket(progressTicket, "resolved", "Done").resolutionNote).toBe("Done");
  });
});
