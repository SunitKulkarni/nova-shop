# Configuration and CI

## Environment

`playwright.config.ts` loads `.env` with `dotenv`. `SHOP_BASE_URL` sets Playwright's base URL; `.env.example` contains the public Nova Shop host. If unset, the config defaults to `https://www.practiceqaautomation.com/shop`. `TEST_ENV` labels the environment in the report and defaults to `local`.

Copy `.env.example` to `.env` to configure a local run. `.env` is ignored by Git.

## Commands

```bash
npm ci
npx playwright install chromium
npm test
npm run test:headed
npm run test:ui
npm run typecheck
```

The test script runs Playwright. The typecheck script compiles the TypeScript files without generating output.

## Reports and Artifacts

The Playwright config uses the list reporter and reportingLabs. A test run writes the self-contained report to `reporting-labs/index.html`. Screenshots on failure and retry traces are saved under `test-results/`.

## GitHub Actions

`.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It uses Node.js 22, installs dependencies and Chromium, runs `npm test`, and uploads `reporting-labs/` and `test-results/` for 30 days.