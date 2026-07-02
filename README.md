# feature-spec-md-demo

Demo app for [`feature-spec-md`](https://github.com/anselmdk/feature-spec-md).

It shows a small support-ticket desk built from Markdown specs, executable tests, and generated spec coverage reports.

Live demo reports are available at <https://feature-spec-md.anselm.dk/demo/>.

## What is included

- `specs/` contains the model, feature, stack, and design specs.
- `tests/` contains unit and Playwright tests that reference spec IDs.
- `npm run spec:report` generates the HTML spec report in `test-results/spec-report/index.html`.

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

## License

MIT
