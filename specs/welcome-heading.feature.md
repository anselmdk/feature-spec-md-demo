---
id: SUPPORT-WELCOME-HEADING
title: Support welcome heading
status: draft
test: playwright
---

# Support welcome heading

## Purpose

Give support agents an immediate confirmation that they have opened the mini support desk.

## Rules

- SUPPORT-WELCOME-HEADING-R001: The desk MUST show the product heading when the page loads.

## Scenarios

### SUPPORT-WELCOME-HEADING-S001: Agent sees the desk heading

Given the support agent opens the mini support desk
When the page loads
Then they see the Mini support desk heading
