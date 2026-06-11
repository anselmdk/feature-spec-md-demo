# feature-spec-md-demo

A tiny demo app showing how to use `feature-spec-md` with readable Markdown specs, unit tests, Playwright tests, and generated spec coverage reports.

The demo domain is a small support-ticket desk:

- create tickets
- move tickets through statuses
- filter tickets by status

The app is intentionally simple so the spec/test workflow is the interesting part.

## Specs

```txt
specs/
  ticket-creation.feature.md
  ticket-status.feature.md
  ticket-filtering.feature.md
```

## Scripts

```bash
npm install
npm run dev
npm run spec:check
npm run test:unit
npm run test:e2e
npm run spec:report
npm run verify
```

The generated report is written to:

```txt
test-results/spec-report/index.html
```

## Dependency note

This demo currently depends on the private GitHub repository:

```txt
git+https://github.com/anselmdk/feature-spec-md.git
```

Your GitHub credentials must be able to read that private repo.
