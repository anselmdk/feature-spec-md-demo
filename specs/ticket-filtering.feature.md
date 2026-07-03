---
id: TICKET-FILTERING
title: Ticket filtering
status: draft
model: TICKET-DESK
test: playwright
screenshots: required
---

# Ticket filtering

## Purpose

People can focus the ticket list by status.

## Rules

- TICKET-FILTERING-R001: The all filter MUST show every ticket.
- TICKET-FILTERING-R002: The open filter MUST show only open tickets.
- TICKET-FILTERING-R003: The resolved filter MUST show only resolved tickets.

## Scenarios

### TICKET-FILTERING-S001: User sees all tickets

Given tickets with different statuses exist
When the user selects the all filter
Then every ticket is visible

### TICKET-FILTERING-S002: User filters open tickets

Given tickets with different statuses exist
When the user selects the open filter
Then only open tickets are visible

### TICKET-FILTERING-S003: User filters resolved tickets

Given tickets with different statuses exist
When the user selects the resolved filter
Then only resolved tickets are visible
