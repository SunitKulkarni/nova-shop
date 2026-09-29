import { expect, type Page } from '@playwright/test';

export class ProductsAssertions {
  constructor(private readonly page: Page) {}

  async productCount(expectedCount: number): Promise<void> {
    await expect(this.page.getByRole('listitem')).toHaveCount(expectedCount);
  }
}