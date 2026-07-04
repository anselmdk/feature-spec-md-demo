import { describe, expect, it } from "vitest";

import { getTicketPriority, type Ticket } from "../../src/ticketRules";

describe("TICKET-PRIORITY ticket priority rules", () => {
  it("TICKET-PRIORITY-R002 marks active operational tickets as high priority", () => {
    const ticket: Ticket = {
      id: "offline-ticket",
      title: "Printer is offline",
      status: "open",
    };

    expect(getTicketPriority(ticket)).toBe("high");
  });

  it("TICKET-PRIORITY-R003 marks resolved tickets as normal priority", () => {
    const ticket: Ticket = {
      id: "resolved-ticket",
      title: "Password reset loop",
      status: "resolved",
      resolutionNote: "Reset link cache was cleared.",
    };

    expect(getTicketPriority(ticket)).toBe("normal");
  });

  it("TICKET-PRIORITY-R001 returns a priority label for ordinary active tickets", () => {
    const ticket: Ticket = {
      id: "normal-ticket",
      title: "Question about invoice",
      status: "in-progress",
    };

    expect(getTicketPriority(ticket)).toBe("normal");
  });
});
