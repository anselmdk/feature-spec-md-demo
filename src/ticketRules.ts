export type TicketStatus = "open" | "in-progress" | "resolved";
export type TicketFilter = "all" | TicketStatus;
export type TicketPriority = "low" | "normal" | "high";

export type Ticket = {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  resolutionNote?: string;
};

export const maxTicketTitleLength = 80;
export const ticketPriorityRank: Record<TicketPriority, number> = {
  high: 0,
  normal: 1,
  low: 2,
};

export function validateTicketTitle(title: string) {
  const trimmed = title.trim();

  if (!trimmed) {
    return "Title is required.";
  }

  if (trimmed.length > maxTicketTitleLength) {
    return `Title must be ${maxTicketTitleLength} characters or fewer.`;
  }

  return null;
}

export function createTicket(
  id: string,
  title: string,
  priority: TicketPriority = "normal",
): Ticket {
  const error = validateTicketTitle(title);

  if (error) {
    throw new Error(error);
  }

  return {
    id,
    title: title.trim(),
    status: "open",
    priority,
  };
}

export function canMoveToStatus(
  ticket: Ticket,
  nextStatus: TicketStatus,
  resolutionNote = "",
) {
  if (ticket.status === nextStatus) {
    return true;
  }

  if (ticket.status === "open" && nextStatus === "in-progress") {
    return true;
  }

  if (ticket.status === "in-progress" && nextStatus === "resolved") {
    return Boolean(resolutionNote.trim());
  }

  return false;
}

export function transitionTicket(
  ticket: Ticket,
  nextStatus: TicketStatus,
  resolutionNote = "",
): Ticket {
  if (!canMoveToStatus(ticket, nextStatus, resolutionNote)) {
    throw new Error("Status transition is not allowed.");
  }

  return {
    ...ticket,
    status: nextStatus,
    resolutionNote:
      nextStatus === "resolved" ? resolutionNote.trim() : ticket.resolutionNote,
  };
}

export function filterTickets(tickets: Ticket[], filter: TicketFilter) {
  if (filter === "all") {
    return tickets;
  }

  return tickets.filter((ticket) => ticket.status === filter);
}

export function sortTicketsByPriority(tickets: Ticket[]) {
  return [...tickets].sort((left, right) => {
    const priorityDifference =
      ticketPriorityRank[left.priority] - ticketPriorityRank[right.priority];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return left.title.localeCompare(right.title);
  });
}
