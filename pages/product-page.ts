import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  get addButton(): Locator {
    return this.page.getByTestId('add-to-cart');
  }

  async addToCart(): Promise<void> {
    await this.addButton.click();
  }

  async fillMaximumAvailableQuantity(): Promise<void> {
    const increaseButton = this.page.getByRole('button', { name: 'Increase quantity' });

    // Increase only while the app reports more stock is available.
    for (let count = 0; count < 20 && await increaseButton.isEnabled(); count += 1) {
      await increaseButton.click();
    }
  }
}