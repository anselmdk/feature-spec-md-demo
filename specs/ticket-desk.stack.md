---
id: TICKET-DESK-STACK
title: Ticket desk tech stack
status: draft
---

# Ticket desk tech stack

## Purpose

Define the technical stack used to implement and verify the ticket desk demo.

## Stack

| Area            | Choice              |
| --------------- | ------------------- |
| Frontend        | React               |
| Language        | TypeScript          |
| Build tool      | Vite                |
| Unit tests      | Vitest              |
| Browser tests   | Playwright          |
| Spec tooling    | feature-spec-md     |
| Report artifact | HTML report in `test-results/spec-report` |

## Rationale

The stack keeps the application small while still demonstrating spec validation, unit-level checks, Playwright scenario coverage, screenshot evidence, and generated reports.
