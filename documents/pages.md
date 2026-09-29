# Page Objects

Each class in `pages/` represents one part of Nova Shop. A page object keeps that page's locators and actions together so tests can describe user behavior without repeating selector details.

| File | Responsibility |
| --- | --- |
| `login-page.ts` | Open sign-in, sign in with a `TestUser`, and log out |
| `products-page.ts` | Search and sort products, open a product, and navigate to the cart |
| `product-page.ts` | Add a product and select the maximum available quantity |
| `cart-page.ts` | Apply coupons, change item quantities, and go to checkout |
| `checkout-page.ts` | Fill shipping/payment details, accept terms, and place an order |
| `orders-page.ts` | Open the order history |

Each constructor receives Playwright's `Page` object. Locators use accessible roles and labels where possible, and the application's test IDs for controls that have a stable explicit test contract.

Tests normally access these objects through the `shop` fixture rather than constructing them directly:

```ts
await shop.login.open();
await shop.login.signIn(users.validUser);
await shop.products.searchFor('headphones');
```

The `ShopPages` interface and object construction are in `pages/fixtures.ts`.