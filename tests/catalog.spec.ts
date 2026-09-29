import { expect, test } from '../pages/fixtures';
import { addReportingMetadata, headphones } from './test-helpers';

addReportingMetadata();

test('NOVASHOP-04 P2: Sort products by price low to high', async ({ shop, users }) => {
  await shop.login.open();
  await shop.login.signIn(users.validUser);
  await shop.products.sortBy('Price (low to high)');
  const cardTexts = await shop.products.productCards.allTextContents();
  const prices = cardTexts.map((text) => Number(text.match(/\$(\d+(?:\.\d{2})?)/)?.[1]));
  expect(prices.every(Number.isFinite)).toBeTruthy();
  expect(prices).toEqual([...prices].sort((first, second) => first - second));
});

test('NOVASHOP-05 P2: Search narrows the grid', async ({ shop, users }) => {
  await shop.login.open();
  await shop.login.signIn(users.validUser);
  await shop.products.searchFor('headphones');
  await expect(shop.products.productCards).toHaveCount(1);
  await expect(shop.products.productCards).toContainText(headphones);
  await expect(shop.page.getByText('Showing 1 of 12 products')).toBeVisible();
});

test('NOVASHOP-16 P3: Maximum quantity in cart disables add button', async ({ shop, users }) => {
  await shop.login.open();
  await shop.login.signIn(users.validUser);
  await shop.products.openProduct(headphones);
  await shop.product.fillMaximumAvailableQuantity();
  await shop.product.addToCart();
  await expect(shop.product.addButton).toBeDisabled();
  await expect(shop.product.addButton).toHaveText('Max quantity in cart');
});