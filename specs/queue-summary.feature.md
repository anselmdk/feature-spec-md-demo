---
id: SUPPORT-QUEUE-SUMMARY
title: Support queue summary
status: draft
---

# Support queue summary

## Purpose

Give support agents a quick count of tickets by workflow status before they inspect the ticket list.

## Rules

- SUPPORT-QUEUE-SUMMARY-R001: The desk MUST show the number of open, in-progress, and resolved tickets currently in the queue.

## Scenarios

### SUPPORT-QUEUE-SUMMARY-S001: Agent sees status totals

Given the support agent opens the mini support desk
When the seeded ticket queue is displayed
Then they see one open ticket, one in-progress ticket, and one resolved ticket
