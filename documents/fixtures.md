# Fixtures

Playwright fixtures prepare reusable resources for each test. The project extends Playwright's built-in `test` in `pages/fixtures.ts` and exports that extended test along with Playwright's `expect`.

## Project Fixtures

- `shop`: a `ShopPages` object containing the login, products, product detail, cart, checkout, and orders page objects. Each object uses the test's isolated Playwright `Page`.
- `shopAssertions`: a `ShopAssertions` object containing page-specific assertion helpers created in `assertions/index.ts`.
- `users`: typed test accounts loaded from `tests/user.json`.

Use the fixtures by destructuring them from the test callback:

```ts
test('example', async ({ shop, shopAssertions, users }) => {
  await shop.login.open();
  await shop.login.signIn(users.validUser);
  await shopAssertions.products.productCount(12);
});
```

The `TestUser` and `TestUsers` interfaces describe the JSON data shape. Keep the sample practice credentials in `tests/user.json`; do not put real credentials there. Project-specific URL and environment values belong in `.env`.