import { expect, test } from '../pages/fixtures';
import { addProductToCart, addReportingMetadata } from './test-helpers';

addReportingMetadata();

test('NOVASHOP-03 P1: Apply SAVE10 coupon', async ({ shop, users }) => {
  await addProductToCart(shop, users.validUser);
  await shop.cart.applyCoupon('SAVE10');
  await expect(shop.page.getByTestId('coupon-message')).toContainText(/SAVE10.*10%/i);
});

test('NOVASHOP-10 P2: Invalid coupon code', async ({ shop, users }) => {
  await addProductToCart(shop, users.validUser);
  await shop.cart.applyCoupon('ABC123');
  await expect(shop.page.getByTestId('coupon-message')).toContainText(/not a valid coupon/i);
  await expect(shop.page.getByText(/discount/i)).toHaveCount(0);
});

test('NOVASHOP-13 P2: FLAT20 below the $100 threshold', async ({ shop, users }) => {
  await addProductToCart(shop, users.validUser, 'Lumen Desk Lamp');
  await shop.cart.applyCoupon('FLAT20');
  await expect(shop.page.getByText('FLAT20 needs a subtotal of at least $100')).toBeVisible();
});