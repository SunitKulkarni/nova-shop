import { type Locator, type Page } from '@playwright/test';
import type { TestUser } from './fixtures';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.signInButton = page.getByTestId('login-button');
  }

  async open(): Promise<void> {
    await this.page.goto('/shop');
  }

  async signIn(user: TestUser): Promise<void> {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.signInButton.click();
  }

  async logOut(): Promise<void> {
    await this.page.getByRole('button', { name: 'Log out' }).click();
  }
}

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

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillShippingDetails(details: ShippingDetails = {
    firstName: 'Nova',
    lastName: 'Tester',
    email: 'nova.tester@example.com',
    phone: '5551234567',
    address: '123 QA Street',
    city: 'Seattle',
    state: 'Washington',
    postalCode: '98101',
  }): Promise<void> {
    await this.page.getByLabel(/first name/i).fill(details.firstName);
    await this.page.getByLabel(/last name/i).fill(details.lastName);
    await this.page.getByLabel(/email/i).fill(details.email);
    await this.page.getByLabel(/phone/i).fill(details.phone);
    await this.page.getByLabel(/address/i).fill(details.address);
    await this.page.getByLabel(/city/i).fill(details.city);
    await this.page.getByLabel(/state/i).selectOption(details.state);
    await this.page.getByLabel(/zip|postal/i).fill(details.postalCode);
  }

  async fillCardDetails(cardNumber = '4242 4242 4242 4242'): Promise<void> {
    await this.page.getByLabel(/name on card/i).fill('Nova Tester');
    await this.page.getByLabel(/card number/i).fill(cardNumber);
    await this.page.getByLabel(/expir/i).fill('12/30');
    await this.page.getByLabel(/cvv|security code/i).fill('123');
  }

  async acceptTerms(): Promise<void> {
    await this.page.getByRole('checkbox', { name: /terms/i }).check();
  }

  async chooseCashOnDelivery(): Promise<void> {
    await this.page.getByRole('radio', { name: /cash on delivery/i }).check();
  }

  async placeOrder(): Promise<void> {
    await this.page.getByRole('button', { name: /place order/i }).click();
  }
}

export class OrdersPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/shop/orders');
  }
}