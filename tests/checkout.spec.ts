import { expect, test } from '../pages/fixtures';
import { addProductToCart, addReportingMetadata, continueToCheckout } from './test-helpers';

addReportingMetadata();

test('NOVASHOP-02 P1: Buy a product end to end', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await continueToCheckout(shop);
  await shop.checkout.fillCardDetails();
  await shop.checkout.acceptTerms();
  await shop.checkout.placeOrder();
  expect(await shopAssertions.checkout.orderConfirmation()).toMatch(/^NS-\d+$/);
});

test('NOVASHOP-06 P1: Order appears in history', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await continueToCheckout(shop);
  await shop.checkout.fillCardDetails();
  await shop.checkout.acceptTerms();
  await shop.checkout.placeOrder();
  const orderId = await shopAssertions.checkout.orderConfirmation();
  await shop.orders.open();
  await shopAssertions.orders.orderIsListed(orderId);
});

test('NOVASHOP-11 P1: Declined card', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await continueToCheckout(shop);
  await shop.checkout.fillCardDetails('4000 0000 0000 0002');
  await shop.checkout.acceptTerms();
  await shop.checkout.placeOrder();
  await shopAssertions.checkout.paymentDeclined();
  await shopAssertions.checkout.noOrderWasCreated();
});

test('NOVASHOP-12 P2: Checkout with empty form', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await shop.cart.checkout();
  await shop.checkout.placeOrder();
  await shopAssertions.checkout.validationSummary();
});