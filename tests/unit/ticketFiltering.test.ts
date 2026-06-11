import { describe, expect, it } from "vitest";
import { filterTickets, type Ticket } from "../../src/ticketRules";

const tickets: Ticket[] = [
  { id: "1", title: "Open", status: "open" },
  { id: "2", title: "Progress", status: "in-progress" },
  { id: "3", title: "Resolved", status: "resolved" },
];

describe("ticket filtering rules", () => {
  it("TICKET-FILTERING-R001 all filter shows every ticket", () => {
    expect(filterTickets(tickets, "all")).toHaveLength(3);
  });

  it("TICKET-FILTERING-R002 open filter shows only open tickets", () => {
    expect(filterTickets(tickets, "open")).toEqual([tickets[0]]);
  });

  it("TICKET-FILTERING-R003 resolved filter shows only resolved tickets", () => {
    expect(filterTickets(tickets, "resolved")).toEqual([tickets[2]]);
  });
});
