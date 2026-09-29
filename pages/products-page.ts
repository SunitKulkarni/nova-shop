import { type Locator, type Page } from '@playwright/test';
import type { ProductPage } from './product-page';

export class ProductsPage {
  readonly productCards: Locator;

  constructor(private readonly page: Page) {
    this.productCards = page.getByRole('listitem');
  }

  async open(): Promise<void> {
    await this.page.goto('/shop/products');
  }

  async searchFor(productName: string): Promise<void> {
    await this.page.getByRole('searchbox', { name: 'Search products' }).fill(productName);
  }

  async sortBy(option: string): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Sort by' }).selectOption({ label: option });
  }

  async openProduct(productName: string): Promise<void> {
    const productCard = this.productCards.filter({ hasText: productName });
    await productCard.getByTestId('product-name').click();
  }

  async addProductToCart(productName: string, productPage: ProductPage): Promise<void> {
    await this.openProduct(productName);
    await productPage.addToCart();
  }

  async openCart(): Promise<void> {
    await this.page.getByRole('link', { name: /cart with/i }).click();
  }
}