# feature-spec-md-demo

Demo app for [`feature-spec-md`](https://github.com/anselmdk/feature-spec-md).

It shows a small support-ticket desk built from Markdown specs, executable tests, and generated spec coverage reports. Use it as a reference project when you want to see how the library is intended to fit into a real app.

Live demo reports, including scenario screenshots, are available at <https://feature-spec-md.anselm.dk/demo/>.

## What this demonstrates

- `specs/` contains model, feature, stack, and design specs.
- `tests/` contains unit and Playwright tests that reference spec IDs from the Markdown files.
- `npm run spec:check` validates the spec set and fails when required model, rule, or scenario coverage is missing.
- `npm run spec:coverage` prints the terminal implementation report.
- `npm run test:e2e` runs Playwright tests and writes screenshot manifests for the spec report.
- `npm run spec:report` generates the HTML spec report in `test-results/spec-report/index.html` and includes screenshots from `test-results/spec-report/screenshots-*.json`.

The generated report is the easiest way to understand what `feature-spec-md` provides: it brings together the Markdown specs, implementation coverage, validation status, and scenario screenshot evidence.

## Run locally

```bash
npm install
npm run verify
```

Useful scripts:

```bash
npm run dev
npm run spec:check
npm run spec:coverage
npm run spec:report
npm run test:unit
npm run test:e2e
```

## Related library docs

The main library README explains the CLI commands, document formats, Playwright screenshot helper, GitHub Actions report publishing, and library API: <https://github.com/anselmdk/feature-spec-md>.

## License

MIT
