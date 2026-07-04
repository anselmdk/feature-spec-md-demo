import { describe, expect, it } from "vitest";
import {
  createTicket,
  sortTicketsByPriority,
  type Ticket,
} from "../../src/ticketRules";

describe("ticket priority", () => {
  it("SUPPORT-DESK-TICKET-PRIORITY-R001 stores the selected priority", () => {
    const ticket = createTicket("ticket-1", "Production is down", "high");

    expect(ticket).toMatchObject({
      title: "Production is down",
      priority: "high",
      status: "open",
    });
  });

  it("SUPPORT-DESK-TICKET-PRIORITY-S002 SUPPORT-DESK-TICKET-PRIORITY-R002 sorts tickets by priority before title", () => {
    const tickets: Ticket[] = [
      {
        id: "low",
        title: "Alpha routine question",
        status: "open",
        priority: "low",
      },
      {
        id: "normal",
        title: "Billing follow-up",
        status: "open",
        priority: "normal",
      },
      {
        id: "high",
        title: "Customer cannot log in",
        status: "open",
        priority: "high",
      },
    ];

    expect(sortTicketsByPriority(tickets).map((ticket) => ticket.id)).toEqual([
      "high",
      "normal",
      "low",
    ]);
  });
});
