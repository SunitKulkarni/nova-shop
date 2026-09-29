<p align="center">
	<img src="assets/nova-shop-mark.svg" alt="Nova Shop quality engineering" width="720">
</p>

<h1 align="center">Nova Shop Automation</h1>

<p align="center">
	A maintainable Playwright suite for testing shopping journeys, checkout behavior, and order history.
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white" alt="Playwright 1.63">
	<img src="https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white" alt="TypeScript 7">
	<img src="https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions CI">
	<img src="https://img.shields.io/badge/Test%20cases-19-147D6A" alt="19 automated cases">
</p>

<p align="center">
	<a href="https://www.practiceqaautomation.com/shop">Practice app</a> |
	<a href="documents/README.md">Project guides</a> |
	<a href="tests/test_data/NovaShop-test-cases.csv">Test case source</a>
</p>

## Project Overview

This repository automates the [Nova Shop practice application](https://www.practiceqaautomation.com/shop) with Playwright Test and TypeScript. It demonstrates Page Object Model design, reusable fixtures, page-specific assertions, environment-based configuration, CI, and HTML test reporting.

The suite contains **19 independent scenarios** mapped to the case IDs in `tests/test_data/NovaShop-test-cases.csv`. Tests use the practice accounts stored in `tests/user.json`.

| Area | Coverage |
| --- | --- |
| Authentication | Valid, locked, slow, incorrect, and empty login scenarios |
| Product catalog | Search, price sorting, and maximum available quantity |
| Cart and coupons | Quantity changes, valid/invalid coupons, and threshold handling |
| Checkout | Required fields, successful payment, declined payment, and recovery |
| Orders | Order confirmation and order history |

## Quick Start

**Requirements:** Node.js 20 or newer and npm.

```bash
npm ci
npx playwright install chromium
```

Copy `.env.example` to `.env` to set the app URL and report environment label. The checked-in sample values target the public practice site; `.env` is ignored by Git.

```bash
npm test
```

## Test Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run the full Chromium suite |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:ui` | Open Playwright's test UI |
| `npm run typecheck` | Type-check the TypeScript source |

Run a specific CSV case by ID:

```bash
npx playwright test -g NOVASHOP-01
```

## Reports

The reportingLabs reporter creates a self-contained report at `reporting-labs/index.html`. Screenshots for failed tests and traces on retry are saved under `test-results/`.

## CI

GitHub Actions runs the suite on pushes and pull requests to `main` or `master`. It installs Node.js 22 and Chromium, runs `npm test`, and uploads the report and test artifacts for 30 days. Workflow definition: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

## Project Structure

```text
assertions/       Page-specific web-first checks
documents/        Guides to the code and workflow
pages/            One Page Object Model per app page, plus fixtures
tests/            Workflow suites and shared test helpers
	test_data/      CSV source cases
```

The test suites are organized by workflow:

| Spec file | Focus |
| --- | --- |
| `tests/auth.spec.ts` | Login and route protection |
| `tests/catalog.spec.ts` | Search, sorting, and product quantity |
| `tests/cart-coupons.spec.ts` | Coupon behavior |
| `tests/checkout.spec.ts` | Checkout validation and payment outcomes |
| `tests/end-to-end.spec.ts` | Multi-step shopping flows |

Page objects live in separate modules such as `pages/login-page.ts` and `pages/checkout-page.ts`. The `shop` and `shopAssertions` fixtures in `pages/fixtures.ts` provide the page objects and assertion helpers to each test.

## Documentation

Start at the [documentation index](documents/README.md), with dedicated guides for [Page Objects](documents/pages.md), [Fixtures](documents/fixtures.md), [Tests](documents/tests.md), [Assertions](documents/assertions.md), and [Configuration and CI](documents/configuration-and-ci.md).