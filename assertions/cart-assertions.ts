import { expect, type Page } from '@playwright/test';

export class CartAssertions {
  constructor(private readonly page: Page) {}

  async couponMessage(expectedMessage: string | RegExp): Promise<void> {
    await expect(this.page.getByTestId('coupon-message')).toContainText(expectedMessage);
  }

  async hasNoDiscount(): Promise<void> {
    await expect(this.page.getByText(/discount/i)).toHaveCount(0);
  }

  async itemQuantity(productName: string, quantity: number): Promise<void> {
    const item = this.page.getByRole('listitem').filter({ hasText: productName });
    await expect(item).toContainText(String(quantity));
  }
}