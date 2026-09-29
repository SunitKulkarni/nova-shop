# Page-Wise Assertions

Assertion helpers are grouped under `assertions/` by the application page they verify. `assertions/index.ts` exports the `ShopAssertions` interface and builds the helpers for the `shopAssertions` fixture.

| File | Checks |
| --- | --- |
| `login-assertions.ts` | Login error text |
| `products-assertions.ts` | Number of displayed product cards |
| `product-assertions.ts` | Add button is disabled at the cart quantity limit |
| `cart-assertions.ts` | Coupon messages, absence of discounts, and item quantities |
| `checkout-assertions.ts` | Order ID, declined payment, no order after failure, and validation summary |
| `orders-assertions.ts` | An order is listed and order count matches |

Call the helper matching the page under test. For example:

```ts
await shopAssertions.login.loginError('Username is required');
await shopAssertions.cart.couponMessage(/SAVE10.*10%/i);
const orderId = await shopAssertions.checkout.orderConfirmation();
await shopAssertions.orders.orderIsListed(orderId);
```

The helpers use Playwright's asynchronous web-first assertions, such as `toBeVisible`, `toHaveCount`, and `toContainText`. These retry until the expected UI state appears or the assertion timeout is reached.