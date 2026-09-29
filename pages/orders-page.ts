import { type Page } from '@playwright/test';

export class OrdersPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/shop/orders');
  }
}