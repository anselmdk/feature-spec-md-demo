import { describe, expect, it } from "vitest";
import { createTicket, validateTicketTitle } from "../../src/ticketRules";

describe("ticket creation rules", () => {
  it("TICKET-CREATION-R001 requires a title", () => {
    expect(validateTicketTitle("")).toBe("Title is required.");
  });

  it("TICKET-CREATION-R002 rejects titles longer than 80 characters", () => {
    expect(validateTicketTitle("x".repeat(81))).toBe("Title must be 80 characters or fewer.");
  });

  it("TICKET-CREATION-R003 creates new tickets with open status", () => {
    expect(createTicket("1", "Need help").status).toBe("open");
  });
});
