import { expect, type Page } from '@playwright/test';

export class ProductAssertions {
  constructor(private readonly page: Page) {}

  async maximumQuantityReached(): Promise<void> {
    const addButton = this.page.getByTestId('add-to-cart');
    await expect(addButton).toBeDisabled();
    await expect(addButton).toHaveText('Max quantity in cart');
  }
}