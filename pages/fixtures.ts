import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test as base, type Page } from '@playwright/test';
import { ShopAssertions } from './assertions';
import { CartPage } from './cart-page';
import { CheckoutPage } from './checkout-page';
import { LoginPage } from './login-page';
import { OrdersPage } from './orders-page';
import { ProductPage } from './product-page';
import { ProductsPage } from './products-page';

export interface TestUser {
	username: string;
	password: string;
	name: string;
}

export interface TestUsers {
	validUser: TestUser;
	lockedUser: TestUser;
	slowuser: TestUser;
}

export interface ShopPages {
	page: Page;
	login: LoginPage;
	products: ProductsPage;
	product: ProductPage;
	cart: CartPage;
	checkout: CheckoutPage;
	orders: OrdersPage;
}

// Read the committed practice accounts once when Playwright starts.
const users = JSON.parse(
	readFileSync(resolve(__dirname, '../tests/user.json'), 'utf8'),
) as TestUsers;

export const test = base.extend<{
	shop: ShopPages;
	shopAssertions: ShopAssertions;
	users: TestUsers;
}>({
	shop: async ({ page }, use) => {
		await use({
			page,
			login: new LoginPage(page),
			products: new ProductsPage(page),
			product: new ProductPage(page),
			cart: new CartPage(page),
			checkout: new CheckoutPage(page),
			orders: new OrdersPage(page),
		});
	},
	shopAssertions: async ({ page }, use) => {
		await use(new ShopAssertions(page));
	},
	users: async ({}, use) => {
		await use(users);
	},
});

export { expect } from '@playwright/test';
