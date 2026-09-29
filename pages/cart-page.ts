import { type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/shop/cart');
  }

  async applyCoupon(code: string): Promise<void> {
    await this.page.getByRole('textbox', { name: /coupon/i }).fill(code);
    await this.page.getByRole('button', { name: /apply/i }).click();
  }

  async increaseQuantity(productName: string): Promise<void> {
    await this.page.getByRole('button', { name: `Increase ${productName}` }).click();
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Checkout' }).click();
  }
}