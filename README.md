# feature-spec-md-demo

Demo app for [`feature-spec-md`](https://github.com/anselmdk/feature-spec-md).

This repository shows a small support-ticket desk built from Markdown specs, executable tests, screenshot evidence, generated feature spec reports, and PR diff reports. Use it as a reference project when you want to see how the library is intended to fit into a real app and a real pull-request review workflow.

## See the workflow in action

The clearest example of what this demo and the library can deliver is this feature PR:

- **Feature PR:** <https://github.com/anselmdk/feature-spec-md-demo/pull/16>
- **Feature spec report:** <https://feature-spec-md.anselm.dk/demo/build/269/>
- **Feature spec diff:** <https://feature-spec-md.anselm.dk/demo/pr/16/269/>

PRs like this are the essence of `feature-spec-md`: the PR contains the feature change, the feature spec report shows the full implementation state for that build, and the feature spec diff shows what changed in the report output and screenshots compared with the base build.

Live demo reports, including scenario screenshots, are available at <https://feature-spec-md.anselm.dk/demo/>.

## What this demonstrates

- `specs/` contains model, feature, stack, and design specs.
- The model report combines field tables with a Mermaid relationship diagram and internally linked open questions and assumptions.
- `tests/` contains unit and Playwright tests that reference spec IDs from the Markdown files.
- `npm run spec:check` validates the spec set and fails when required model, rule, or scenario coverage is missing.
- `npm run spec:coverage` prints the terminal implementation report.
- `npm run test:e2e` runs Playwright tests and writes screenshot manifests for the spec report.
- `npm run spec:report` generates the HTML spec report in `test-results/spec-report/index.html` and includes screenshots from `test-results/spec-report/screenshots-*.json`.
- Feature frontmatter such as `test: unit` and `screenshots: skip` is visible in the report, and skipped screenshot scenarios stay compact without placeholder evidence labels.
- The GitHub Actions workflow publishes build reports under `build/<build-number>/`, publishes PR diffs under `pr/<pr-number>/<build-number>/`, and can comment on a PR with links to both.

The generated report is the easiest way to understand what `feature-spec-md` provides: it brings together the Markdown specs, implementation coverage, validation status, GitHub/build metadata, source links, and scenario screenshot evidence.

The generated PR diff is the easiest way to review a feature branch: it highlights changed report assets, changed spec sections, and screenshot evidence so reviewers can understand both code/spec intent and visible behavior changes.

## Run locally

```bash
npm install
npm run verify
```

Useful scripts:

```bash
npm run dev
npm run build
npm run spec:check
npm run spec:coverage
npm run spec:report
npm run test:unit
npm run test:e2e
```

## Related library docs

The main library README explains the CLI commands, document formats, Playwright screenshot helper, GitHub Actions report publishing, PR diff publishing, and library API: <https://github.com/anselmdk/feature-spec-md>.

## License

MIT
