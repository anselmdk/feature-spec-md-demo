import {
  expect,
  test as base,
  type Page,
  type TestInfo,
} from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export { expect };
export const test = base;

type SpecStep = {
  scenarioId: string;
  specPath: string;
  line: number;
  keyword: string;
  text: string;
};

type ScreenshotEntry = {
  specPath: string;
  line: number;
  path: string;
  title: string;
  testPath: string;
};

const reportDir = path.join(process.cwd(), "test-results/spec-report");
const screenshotDir = path.join(reportDir, "screenshots");
const stepsPromise = loadSpecSteps();
const entriesByWorker = new Map<number, ScreenshotEntry[]>();

export async function specStep(
  page: Page,
  testInfo: TestInfo,
  scenarioId: string,
  stepText: string,
  body: () => Promise<void>,
) {
  const step = await findSpecStep(scenarioId, stepText);
  await base.step(`${step.keyword} ${step.text}`, async () => {
    await body();
    await captureStepScreenshot(page, testInfo, step);
  });
}

async function findSpecStep(scenarioId: string, stepText: string) {
  const steps = await stepsPromise;
  const normalizedStepText = stepText.replace(
    /^(Given|When|Then|And|But)\s+/,
    "",
  );
  const step = steps.find(
    (candidate) =>
      candidate.scenarioId === scenarioId &&
      candidate.text === normalizedStepText,
  );
  if (!step) {
    throw new Error(`No spec step found for ${scenarioId}: ${stepText}`);
  }
  return step;
}

async function captureStepScreenshot(
  page: Page,
  testInfo: TestInfo,
  step: SpecStep,
) {
  await mkdir(screenshotDir, { recursive: true });
  const fileName = `${step.scenarioId}-line-${step.line}-${slug(step.text)}.png`;
  const screenshotPath = path.join(screenshotDir, fileName);
  const relativePath = `screenshots/${fileName}`;
  const title = `${step.scenarioId}:${step.line} ${step.keyword} ${step.text}`;

  await page.screenshot({ fullPage: true, path: screenshotPath });
  await testInfo.attach(title, {
    contentType: "image/png",
    path: screenshotPath,
  });

  const entries = entriesByWorker.get(testInfo.workerIndex) ?? [];
  entries.push({
    specPath: step.specPath,
    line: step.line,
    path: relativePath,
    title,
    testPath: testInfo.file,
  });
  entriesByWorker.set(testInfo.workerIndex, entries);
  await writeWorkerManifest(testInfo.workerIndex, entries);
}

async function writeWorkerManifest(
  workerIndex: number,
  screenshots: ScreenshotEntry[],
) {
  await mkdir(reportDir, { recursive: true });
  await writeFile(
    path.join(reportDir, `screenshots-${workerIndex}.json`),
    JSON.stringify({ screenshots }, null, 2),
    "utf8",
  );
}

async function loadSpecSteps() {
  const specPaths = [
    "specs/ticket-creation.feature.md",
    "specs/ticket-filtering.feature.md",
    "specs/ticket-status.feature.md",
  ];
  const steps: SpecStep[] = [];

  for (const specPath of specPaths) {
    const source = await readFile(path.join(process.cwd(), specPath), "utf8");
    let scenarioId = "";
    for (const [index, line] of source
      .replace(/\r\n/g, "\n")
      .split("\n")
      .entries()) {
      const scenario = line.match(
        /^###\s+([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-S\d{3}):/,
      );
      if (scenario) {
        scenarioId = scenario[1];
        continue;
      }

      const step = line.trim().match(/^(Given|When|Then|And|But)\s+(.+)$/);
      if (scenarioId && step) {
        steps.push({
          scenarioId,
          specPath,
          line: index + 1,
          keyword: step[1],
          text: step[2].trim(),
        });
      }
    }
  }

  return steps;
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}
