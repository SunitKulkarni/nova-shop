import { test } from '../pages/fixtures';
import { addProductToCart, addReportingMetadata } from './test-helpers';

addReportingMetadata();

test('NOVASHOP-03 P1: Apply SAVE10 coupon', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await shop.cart.applyCoupon('SAVE10');
  await shopAssertions.cart.couponMessage(/SAVE10.*10%/i);
});

test('NOVASHOP-10 P2: Invalid coupon code', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser);
  await shop.cart.applyCoupon('ABC123');
  await shopAssertions.cart.couponMessage(/not a valid coupon/i);
  await shopAssertions.cart.hasNoDiscount();
});

test('NOVASHOP-13 P2: FLAT20 below the $100 threshold', async ({ shop, users, shopAssertions }) => {
  await addProductToCart(shop, users.validUser, 'Lumen Desk Lamp');
  await shop.cart.applyCoupon('FLAT20');
  await shopAssertions.cart.couponMessage('FLAT20 needs a subtotal of at least $100');
});