import { spawn } from "node:child_process";

const args = ["feature-spec-md", "coverage", "--tests", "tests/**/*.ts"];
const child = spawn("npx", ["--no-install", ...args], {
  shell: process.platform === "win32",
  stdio: ["inherit", "pipe", "pipe"],
});

let output = "";

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  output += text;
  process.stdout.write(text);
});

child.stderr.on("data", (chunk) => {
  const text = chunk.toString();
  output += text;
  process.stderr.write(text);
});

const exitCode = await new Promise((resolve) => {
  child.on("close", resolve);
});

if (exitCode !== 0) {
  process.exit(exitCode ?? 1);
}

const missingScenarios = countFrom(output, /Missing scenarios:\s*(\d+)/i);
const missingRules = countFrom(output, /Missing rules:\s*(\d+)/i);
const missingModelItems = countFrom(output, /Missing model items:\s*(\d+)/i);
const missingTotal = missingScenarios + missingRules + missingModelItems;

if (missingTotal > 0) {
  console.error(
    `Spec coverage failed: ${missingScenarios} missing scenario(s), ${missingRules} missing rule(s), ${missingModelItems} missing model item(s).`,
  );
  process.exit(1);
}

function countFrom(text, pattern) {
  const match = text.match(pattern);
  return match ? Number(match[1]) : 0;
}
