import { expect, type Page } from '@playwright/test';

export class CheckoutAssertions {
  constructor(private readonly page: Page) {}

  async orderConfirmation(): Promise<string> {
    const orderId = this.page.getByText(/NS-\d+/).first();
    await expect(orderId).toBeVisible();
    return (await orderId.textContent())?.match(/NS-\d+/)?.[0] ?? '';
  }

  async paymentDeclined(): Promise<void> {
    await expect(this.page.getByText(/payment.*declined|card.*declined/i)).toBeVisible();
  }

  async noOrderWasCreated(): Promise<void> {
    await expect(this.page.getByText(/NS-\d+/)).toHaveCount(0);
  }

  async validationSummary(): Promise<void> {
    await expect(this.page.getByTestId('form-errors')).toBeVisible();
    await expect(this.page.getByText(/required/i).first()).toBeVisible();
  }
}