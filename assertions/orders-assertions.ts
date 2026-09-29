import { expect, type Page } from '@playwright/test';

export class OrdersAssertions {
  constructor(private readonly page: Page) {}

  async orderIsListed(orderId: string): Promise<void> {
    await expect(this.page.getByText(orderId)).toBeVisible();
  }

  async orderCount(expectedCount: number): Promise<void> {
    await expect(this.page.getByRole('row').filter({ hasText: /NS-\d+/ })).toHaveCount(expectedCount);
  }
}