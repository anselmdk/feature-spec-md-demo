import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const candidates = [
  new URL("../../feature-spec-md/dist/cli.js", import.meta.url),
  new URL(
    "../node_modules/@anselmdk/feature-spec-md/dist/cli.js",
    import.meta.url,
  ),
];
const cli = candidates.find((candidate) =>
  existsSync(fileURLToPath(candidate)),
);

if (!cli) {
  throw new Error(
    "feature-spec-md CLI is not available. Run npm install in this project and npm run build in ../feature-spec-md.",
  );
}

await import(cli.href);
