# feature-spec-md-demo

A tiny demo app showing how to use the current `feature-spec-md` format with readable Markdown specs, unit tests, Playwright tests, and generated spec coverage reports.

The demo domain is a small support-ticket desk:

- create tickets
- move tickets through statuses
- filter tickets by status

The app is intentionally simple so the spec/test workflow is the interesting part.

## Structure

```txt
specs/
  ticket-desk.model.md
  ticket-desk.stack.md
  ticket-desk.design.md
  ticket-creation.feature.md
  ticket-status.feature.md
  ticket-filtering.feature.md
```

## Format used

This demo uses the four-document standard from the latest `feature-spec-md` release:

- `*.model.md` files define shared domain vocabulary.
- `*.feature.md` files define user-facing behavior with rules and scenarios.
- `*.stack.md` files define technical platform choices.
- `*.design.md` files define product, UI, and interaction direction.
- Every spec file includes `## Purpose`.
- Feature and design specs reference the shared model using `model: TICKET-DESK`.

## Scripts

```bash
npm install
npm run dev
npm run spec:check
npm run spec:coverage
npm run test:unit
npm run test:e2e
npm run spec:report
npm run verify
```

The Playwright tests capture a screenshot for every Given / When / Then / And line in the specs. Those screenshots are written into the generated feature spec report so the GitHub Actions artifact can be downloaded with the evidence included.

The generated report is written to:

```txt
test-results/spec-report/index.html
```

## Dependency note

This demo uses the published `@anselmdk/feature-spec-md` npm package.
