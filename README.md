# Nova Shop Playwright Automation

This project contains end-to-end browser tests for the Nova Shop practice application at PracticeQAAutomation. Tests use Playwright Test, Page Object Model classes, custom fixtures, web-first assertions, and the test accounts in `tests/user.json`.

The regression cases map to the IDs in `tests/test_data/NovaShop-test-cases.csv` and are grouped by workflow:

- `tests/auth.spec.ts`: sign-in and route protection
- `tests/catalog.spec.ts`: product sorting, search, and quantity limits
- `tests/cart-coupons.spec.ts`: valid and invalid coupons
- `tests/checkout.spec.ts`: order placement, payment failure, and validation
- `tests/end-to-end.spec.ts`: complete purchase and cart persistence flows

Shared setup helpers and report metadata are in `tests/test-helpers.ts`.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm ci
npx playwright install chromium
```

Copy `.env.example` to `.env` and adjust `SHOP_BASE_URL` or `TEST_ENV` if needed. The default URL points to the public practice shop. `.env` is ignored by Git; user accounts remain in `tests/user.json` as required by the practice app.

## Run Tests

```bash
npm test
npm run test:headed
npm run test:ui
```

To run a single case, use its CSV ID:

```bash
npx playwright test -g NOVASHOP-01
```

## Reports

Each run generates the self-contained reportingLabs report at `reporting-labs/index.html`. Playwright traces and screenshots for failures are saved under `test-results/`.

## Documentation

Detailed guides for the page objects, fixtures, tests, page-wise assertions, environment, reports, and CI are in the [documents folder](documents/README.md).

## Project Layout

- `pages/login-page.ts`: sign-in and sign-out actions
- `pages/products-page.ts`: catalog search, sorting, product navigation, and cart access
- `pages/product-page.ts`: product details and add-to-cart actions
- `pages/cart-page.ts`: coupon, quantity, and checkout actions
- `pages/checkout-page.ts`: shipping, payment, and order submission
- `pages/orders-page.ts`: order history navigation
- `pages/fixtures.ts`: typed test-user data and reusable page-object fixtures
- `assertions/`: page-specific, retrying assertions composed by the assertion fixture
- `tests/*.spec.ts`: separate workflow suites linked to the CSV IDs
- `tests/test-helpers.ts`: shared setup and reporting metadata
- `documents/`: code and workflow guides
- `playwright.config.ts`: browser, `.env`, and reporter configuration
- `.github/workflows/playwright.yml`: GitHub Actions CI workflow

The CI workflow runs the Chromium suite for pushes and pull requests targeting `main` or `master`, then uploads reports and failure artifacts.