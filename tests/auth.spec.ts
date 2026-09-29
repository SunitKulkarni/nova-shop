import { expect, test } from '../pages/fixtures';
import { addReportingMetadata } from './test-helpers';

addReportingMetadata();

test('NOVASHOP-01 P1: Login with valid standard user', async ({ shop, users, shopAssertions }) => {
  await shop.login.open();
  await shop.login.signIn(users.validUser);
  await expect(shop.products.productCards).toHaveCount(12);
  await shopAssertions.productsCount(12);
});

test('NOVASHOP-07 P1: Wrong password is rejected', async ({ shop, users, shopAssertions }) => {
  await shop.login.open();
  await shop.login.signIn({ ...users.validUser, password: 'wrong' });
  await shopAssertions.loginError('Username and password do not match any user in this service');
});

test('NOVASHOP-08 P1: Locked user cannot log in', async ({ shop, users, shopAssertions }) => {
  await shop.login.open();
  await shop.login.signIn(users.lockedUser);
  await shopAssertions.loginError('Sorry, this user has been locked out.');
});

test('NOVASHOP-09 P2: Empty login form', async ({ shop, shopAssertions }) => {
  await shop.login.open();
  await shop.login.signIn({ username: '', password: '', name: 'Empty account' });
  await shopAssertions.loginError('Username is required');
});

test('NOVASHOP-14 P2: Slow user login waits for products', async ({ shop, users }) => {
  await shop.login.open();
  await shop.login.signIn(users.slowuser);
  await expect(shop.page).toHaveURL(/\/shop\/products$/);
  await expect(shop.products.productCards).toHaveCount(12);
});

test('NOVASHOP-15 P2: Route guard redirects signed-out users', async ({ page, shop }) => {
  await shop.cart.open();
  await expect(page).toHaveURL(/\/shop(?:\/?$)/);
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});