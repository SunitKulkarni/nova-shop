# Test Suites

The test cases are based on IDs in `tests/test_data/NovaShop-test-cases.csv`. The `NOVASHOP-*` title prefix makes it easy to find a case in the terminal, HTML report, or Playwright UI.

| File | Coverage |
| --- | --- |
| `auth.spec.ts` | Valid/invalid login, locked and slow users, empty form, and route guard |
| `catalog.spec.ts` | Price sorting, search, and maximum quantity |
| `cart-coupons.spec.ts` | SAVE10, invalid coupons, and FLAT20 threshold |
| `checkout.spec.ts` | Successful checkout, order history, declined card, and required fields |
| `end-to-end.spec.ts` | Coupon purchase, payment recovery, cart navigation, and logout |

`tests/test-helpers.ts` contains small reusable flows such as adding an item to the cart and adding reporting metadata. Page behavior belongs in a page object; reusable expected outcomes belong in `assertions/`.

Run all cases or select a case by its CSV ID:

```bash
npm test
npx playwright test -g NOVASHOP-01
```

Tests run in isolated browser contexts. Avoid depending on data created by another test; each end-to-end case should prepare its own cart and order.