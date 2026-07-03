---
id: TICKET-CREATION
title: Ticket creation
status: draft
model: TICKET-DESK
test: playwright
---

# Ticket creation

## Purpose

People can create support tickets with a clear title.

## Rules

- TICKET-CREATION-R001: A ticket MUST have a title.
- TICKET-CREATION-R002: A ticket title MUST NOT be longer than 80 characters.
- TICKET-CREATION-R003: A new ticket MUST start with status open.

## Scenarios

### TICKET-CREATION-S001: User creates a valid ticket

Given the user is on the ticket desk
When they create a ticket with a valid title
Then the new ticket is visible
And the ticket has status open

### TICKET-CREATION-S002: User cannot create a ticket without a title

Given the user is on the ticket desk
When they try to create a ticket without a title
Then the ticket is not created
And they see a title validation message

### TICKET-CREATION-S003: User cannot create a ticket with a long title

Given the user is on the ticket desk
When they try to create a ticket with a title longer than 80 characters
Then the ticket is not created
And they see a title length validation message
