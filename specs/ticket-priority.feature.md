---
id: SUPPORT-DESK-TICKET-PRIORITY
title: Ticket priority
status: active
test: unit
screenshots: skip
---

# Ticket priority

## Purpose

Support agents need to distinguish urgent tickets from routine work and see the most important tickets first.

## Rules

- SUPPORT-DESK-TICKET-PRIORITY-R001: A newly created ticket MUST store the selected priority.
- SUPPORT-DESK-TICKET-PRIORITY-R002: Tickets MUST be ordered by priority before title when displayed.
- SUPPORT-DESK-TICKET-PRIORITY-R003: The create-ticket form MUST reset priority to normal after a ticket is created.

## Scenarios

### SUPPORT-DESK-TICKET-PRIORITY-S001: User creates a high-priority ticket
Test: playwright
Screenshots: skip

Given the user is on the support desk
When they create a ticket titled "Production is down" with high priority
Then the ticket shows "High priority"
And the next create-ticket priority is normal

### SUPPORT-DESK-TICKET-PRIORITY-S002: Tickets are sorted by priority
Test: unit
Screenshots: skip

Given the ticket queue has low, normal, and high priority tickets
When the ticket queue is sorted
Then high priority tickets appear before normal priority tickets
And normal priority tickets appear before low priority tickets
