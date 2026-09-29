import { type Page } from '@playwright/test';

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