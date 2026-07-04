import { describe, expect, it } from "vitest";
import {
  canMoveToStatus,
  transitionTicket,
  type Ticket,
} from "../../src/ticketRules";

const openTicket: Ticket = {
  id: "1",
  title: "Printer is offline",
  status: "open",
  priority: "normal",
};
const progressTicket: Ticket = {
  id: "2",
  title: "Email delivery is slow",
  status: "in-progress",
  priority: "normal",
};

describe("ticket status rules", () => {
  it("TICKET-STATUS-R001 TICKET-DESK-M003 TICKET-DESK-R001 TICKET-DESK-R002 allows an open ticket to move to in progress", () => {
    expect(canMoveToStatus(openTicket, "in-progress")).toBe(true);
  });

  it("TICKET-STATUS-R002 TICKET-DESK-M003 TICKET-DESK-R001 TICKET-DESK-R002 TICKET-DESK-R004 allows an in-progress ticket to be resolved with a note", () => {
    expect(canMoveToStatus(progressTicket, "resolved", "Done")).toBe(true);
  });

  it("TICKET-STATUS-R003 TICKET-DESK-M003 TICKET-DESK-R004 rejects resolving without a resolution note", () => {
    expect(canMoveToStatus(progressTicket, "resolved", "")).toBe(false);
  });

  it("TICKET-DESK-M002 TICKET-DESK-M003 TICKET-DESK-R004 stores the resolution note when resolving a ticket", () => {
    expect(
      transitionTicket(progressTicket, "resolved", "Done").resolutionNote,
    ).toBe("Done");
  });
});
