import { describe, expect, it } from "vitest";
import { filterTickets, type Ticket } from "../../src/ticketRules";

const tickets: Ticket[] = [
  { id: "1", title: "Open", status: "open", priority: "normal" },
  { id: "2", title: "Progress", status: "in-progress", priority: "normal" },
  { id: "3", title: "Resolved", status: "resolved", priority: "normal" },
];

describe("ticket filtering rules", () => {
  it("TICKET-FILTERING-R001 TICKET-DESK-M001 TICKET-DESK-M004 TICKET-DESK-R005 all filter shows every ticket", () => {
    expect(filterTickets(tickets, "all")).toHaveLength(3);
    expect(tickets).toHaveLength(3);
  });

  it("TICKET-FILTERING-R002 TICKET-DESK-M004 TICKET-DESK-R005 open filter shows only open tickets", () => {
    expect(filterTickets(tickets, "open")).toEqual([tickets[0]]);
    expect(tickets).toHaveLength(3);
  });

  it("TICKET-FILTERING-R003 TICKET-DESK-M004 TICKET-DESK-R005 resolved filter shows only resolved tickets", () => {
    expect(filterTickets(tickets, "resolved")).toEqual([tickets[2]]);
    expect(tickets).toHaveLength(3);
  });
});
