import { meta } from 'reporting-labs';
import { test, type ShopPages, type TestUser } from '../pages/fixtures';

export const headphones = 'Aurora Wireless Headphones';

// Prepare a signed-in cart so checkout tests can focus on the case being tested.
export async function addProductToCart(
  shop: ShopPages,
  user: TestUser,
  productName = headphones,
): Promise<void> {
  await shop.login.open();
  await shop.login.signIn(user);
  await shop.products.addProductToCart(productName, shop.product);
  await shop.products.openCart();
}

export async function continueToCheckout(shop: ShopPages): Promise<void> {
  await shop.cart.checkout();
  await shop.checkout.fillShippingDetails();
}

export function addReportingMetadata(): void {
  test.beforeEach(async ({}, testInfo) => {
    const caseId = testInfo.title.match(/NOVASHOP(?:-E2E)?-\d+/)?.[0] ?? 'Nova Shop';
    const priority = testInfo.title.match(/P[1-3]/)?.[0] ?? 'P1';
    meta({ priority, owner: 'QA', feature: 'Nova Shop', story: caseId });
  });
}