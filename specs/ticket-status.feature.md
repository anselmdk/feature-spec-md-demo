---
id: TICKET-STATUS
title: Ticket status
status: draft
model: TICKET-DESK
test: playwright
---

# Ticket status

## Purpose

People can move tickets through a small, predictable status flow.

## Rules

- TICKET-STATUS-R001: An open ticket MAY be moved to in progress.
- TICKET-STATUS-R002: An in-progress ticket MAY be resolved.
- TICKET-STATUS-R003: A ticket MUST NOT be resolved without a resolution note.

## Scenarios

### TICKET-STATUS-S001: User moves a ticket to in progress

Given an open ticket is visible
When the user starts working on the ticket
Then the ticket status is in progress

### TICKET-STATUS-S002: User resolves a ticket with a note

Given an in-progress ticket is visible
When the user enters a resolution note and resolves the ticket
Then the ticket status is resolved
And the resolution note is visible

### TICKET-STATUS-S003: User cannot resolve a ticket without a note

Given an in-progress ticket is visible
When the user tries to resolve the ticket without a note
Then the ticket is not resolved
And they see a resolution note validation message
