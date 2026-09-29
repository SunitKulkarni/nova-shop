import { expect, test } from '../pages/fixtures';
import { addProductToCart, addReportingMetadata, continueToCheckout, headphones } from './test-helpers';

addReportingMetadata();

test('NOVASHOP-E2E-01 P1: Guest to paid order with coupon', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await shop.cart.applyCoupon('SAVE10');
  await shopAssertions.cart.couponMessage(/SAVE10.*10%/i);
  await continueToCheckout(shop);
  await shop.checkout.fillCardDetails();
  await shop.checkout.acceptTerms();
  await shop.checkout.placeOrder();
  const orderId = await shopAssertions.checkout.orderConfirmation();
  await shop.orders.open();
  await shopAssertions.orders.orderIsListed(orderId);
});

test('NOVASHOP-E2E-02 P1: Declined card then cash on delivery', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await shop.products.open();
  await shop.products.addProductToCart('Pulse Smartwatch', shop.product);
  await shop.products.openCart();
  await continueToCheckout(shop);
  await shop.checkout.fillCardDetails('4000 0000 0000 0002');
  await shop.checkout.acceptTerms();
  await shop.checkout.placeOrder();
  await shopAssertions.checkout.paymentDeclined();
  await shop.checkout.chooseCashOnDelivery();
  await shop.checkout.placeOrder();
  await shopAssertions.checkout.orderConfirmation();
  await shop.orders.open();
  await shopAssertions.orders.orderCount(1);
});

test('NOVASHOP-E2E-03 P2: Cart survives navigation and logout rules', async ({ page, shop, users, shopAssertions }) => {
  await shop.login.open();
  await shop.login.signIn(users.validUser);
  await shop.products.addProductToCart(headphones, shop.product);
  await shop.products.openCart();
  await shop.cart.increaseQuantity(headphones);
  await shopAssertions.cart.itemQuantity(headphones, 2);
  await shop.products.open();
  await shop.products.openProduct(headphones);
  await expect(shop.product.addButton).toBeVisible();
  await shop.products.openCart();
  await shopAssertions.cart.itemQuantity(headphones, 2);
  await shop.login.logOut();
  await shop.cart.open();
  await expect(page).toHaveURL(/\/shop(?:\/?$)/);
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});