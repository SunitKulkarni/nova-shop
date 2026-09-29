import { expect, type Page } from '@playwright/test';

export class LoginAssertions {
  constructor(private readonly page: Page) {}

  async loginError(expectedMessage: string | RegExp): Promise<void> {
    await expect(this.page.getByTestId('login-error')).toContainText(expectedMessage);
  }
}