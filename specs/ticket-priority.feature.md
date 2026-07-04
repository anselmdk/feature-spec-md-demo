---
id: TICKET-PRIORITY
title: Ticket priority
status: draft
model: TICKET-DESK
test: playwright
---

# Ticket priority

## Purpose

Help support agents spot active tickets that are likely to need faster attention.

## Rules

- TICKET-PRIORITY-R001: The desk MUST show a priority label for every ticket.
- TICKET-PRIORITY-R002: Active tickets whose titles contain operational warning words MUST be shown as high priority.
- TICKET-PRIORITY-R003: Resolved tickets MUST be shown as normal priority.

## Scenarios

### TICKET-PRIORITY-S001: Agent sees seeded ticket priorities

Given the support agent opens the mini support desk
When the seeded ticket queue is displayed
Then active operational tickets are shown as high priority
And the resolved ticket is shown as normal priority

