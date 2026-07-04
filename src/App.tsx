import { FormEvent, useMemo, useState } from "react";
import {
  createTicket,
  filterTickets,
  sortTicketsByPriority,
  transitionTicket,
  type Ticket,
  type TicketFilter,
  type TicketPriority,
} from "./ticketRules";

const initialTickets: Ticket[] = [
  {
    id: "seed-open",
    title: "Printer is offline",
    status: "open",
    priority: "high",
  },
  {
    id: "seed-progress",
    title: "Email delivery is slow",
    status: "in-progress",
    priority: "normal",
  },
  {
    id: "seed-resolved",
    title: "Password reset loop",
    status: "resolved",
    priority: "low",
    resolutionNote: "Reset link cache was cleared.",
  },
];

const ticketPriorities: TicketPriority[] = ["low", "normal", "high"];

function formatPriority(priority: TicketPriority) {
  return `${priority[0].toUpperCase()}${priority.slice(1)} priority`;
}

export function App() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("normal");
  const [filter, setFilter] = useState<TicketFilter>("all");
  const [titleError, setTitleError] = useState("");
  const [resolutionNotes, setResolutionNotes] = useState<
    Record<string, string>
  >({});
  const [statusErrors, setStatusErrors] = useState<Record<string, string>>({});

  const queueSummary = useMemo(
    () => ({
      open: tickets.filter((ticket) => ticket.status === "open").length,
      inProgress: tickets.filter((ticket) => ticket.status === "in-progress")
        .length,
      resolved: tickets.filter((ticket) => ticket.status === "resolved").length,
    }),
    [tickets],
  );

  const visibleTickets = useMemo(
    () => sortTicketsByPriority(filterTickets(tickets, filter)),
    [tickets, filter],
  );

  function handleCreateTicket(event: FormEvent) {
    event.preventDefault();
    setTitleError("");

    try {
      const ticket = createTicket(`ticket-${Date.now()}`, title, priority);
      setTickets((current) => [ticket, ...current]);
      setTitle("");
      setPriority("normal");
    } catch (error) {
      setTitleError(
        error instanceof Error ? error.message : "Ticket could not be created.",
      );
    }
  }

  function updateTicket(id: string, updater: (ticket: Ticket) => Ticket) {
    setTickets((current) =>
      current.map((ticket) => (ticket.id === id ? updater(ticket) : ticket)),
    );
  }

  function startTicket(ticket: Ticket) {
    setStatusErrors((current) => ({ ...current, [ticket.id]: "" }));
    updateTicket(ticket.id, (current) =>
      transitionTicket(current, "in-progress"),
    );
  }

  function resolveTicket(ticket: Ticket) {
    const note = resolutionNotes[ticket.id] ?? "";

    if (!note.trim()) {
      setStatusErrors((current) => ({
        ...current,
        [ticket.id]: "Resolution note is required.",
      }));
      return;
    }

    setStatusErrors((current) => ({ ...current, [ticket.id]: "" }));
    updateTicket(ticket.id, (current) =>
      transitionTicket(current, "resolved", note),
    );
  }

  return (
    <main className="app">
      <h1>Mini support desk</h1>

      <section
        className="panel queue-summary"
        aria-labelledby="queue-summary-heading"
      >
        <h2 id="queue-summary-heading">Queue summary</h2>
        <dl className="summary-grid" aria-label="Ticket totals">
          <div>
            <dt>Open</dt>
            <dd data-testid="queue-summary-open">{queueSummary.open}</dd>
          </div>
          <div>
            <dt>In progress</dt>
            <dd data-testid="queue-summary-in-progress">
              {queueSummary.inProgress}
            </dd>
          </div>
          <div>
            <dt>Resolved</dt>
            <dd data-testid="queue-summary-resolved">
              {queueSummary.resolved}
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel" aria-labelledby="create-ticket-heading">
        <h2 id="create-ticket-heading">Create ticket</h2>
        <form onSubmit={handleCreateTicket}>
          <label htmlFor="ticket-title">Title</label>
          <input
            id="ticket-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs help?"
          />
          <label htmlFor="ticket-priority">Priority</label>
          <select
            id="ticket-priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TicketPriority)
            }
          >
            {ticketPriorities.map((value) => (
              <option key={value} value={value}>
                {formatPriority(value)}
              </option>
            ))}
          </select>
          <button type="submit">Create ticket</button>
          {titleError ? <p role="alert">{titleError}</p> : null}
        </form>
      </section>

      <section className="panel" aria-labelledby="filters-heading">
        <h2 id="filters-heading">Filters</h2>
        <div className="filters">
          {(["all", "open", "in-progress", "resolved"] as TicketFilter[]).map(
            (value) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ),
          )}
        </div>
      </section>

      <section className="panel" aria-labelledby="tickets-heading">
        <h2 id="tickets-heading">Tickets</h2>
        <ul className="tickets">
          {visibleTickets.map((ticket) => (
            <li key={ticket.id} className="ticket" data-testid="ticket-card">
              <h3>{ticket.title}</h3>
              <p>
                Status: <strong>{ticket.status}</strong>
              </p>
              <p>
                Priority: <strong>{formatPriority(ticket.priority)}</strong>
              </p>

              {ticket.status === "open" ? (
                <button type="button" onClick={() => startTicket(ticket)}>
                  Start work
                </button>
              ) : null}

              {ticket.status === "in-progress" ? (
                <div className="resolve">
                  <label htmlFor={`resolution-${ticket.id}`}>
                    Resolution note
                  </label>
                  <input
                    id={`resolution-${ticket.id}`}
                    value={resolutionNotes[ticket.id] ?? ""}
                    onChange={(event) =>
                      setResolutionNotes((current) => ({
                        ...current,
                        [ticket.id]: event.target.value,
                      }))
                    }
                  />
                  <button type="button" onClick={() => resolveTicket(ticket)}>
                    Resolve
                  </button>
                  {statusErrors[ticket.id] ? (
                    <p role="alert">{statusErrors[ticket.id]}</p>
                  ) : null}
                </div>
              ) : null}

              {ticket.resolutionNote ? (
                <p>Resolution: {ticket.resolutionNote}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
