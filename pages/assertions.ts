import { expect, type Page } from '@playwright/test';

// Shared web-first assertions keep checks readable and automatically retried.
export class ShopAssertions {
	constructor(private readonly page: Page) {}

	async productsCount(expectedCount: number): Promise<void> {
		await expect(this.page.getByRole('listitem')).toHaveCount(expectedCount);
	}

	async loginError(expectedMessage: string | RegExp): Promise<void> {
		await expect(this.page.getByTestId('login-error')).toContainText(expectedMessage);
	}

	async orderConfirmation(): Promise<string> {
		const orderId = this.page.getByText(/NS-\d+/).first();
		await expect(orderId).toBeVisible();
		return (await orderId.textContent())?.match(/NS-\d+/)?.[0] ?? '';
	}
}
