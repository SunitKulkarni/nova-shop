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