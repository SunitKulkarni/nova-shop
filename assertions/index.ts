import type { Page } from '@playwright/test';
import { CartAssertions } from './cart-assertions';
import { CheckoutAssertions } from './checkout-assertions';
import { LoginAssertions } from './login-assertions';
import { OrdersAssertions } from './orders-assertions';
import { ProductAssertions } from './product-assertions';
import { ProductsAssertions } from './products-assertions';

export interface ShopAssertions {
  login: LoginAssertions;
  products: ProductsAssertions;
  product: ProductAssertions;
  cart: CartAssertions;
  checkout: CheckoutAssertions;
  orders: OrdersAssertions;
}

// Build the assertion helpers together so tests can request one fixture.
export function createShopAssertions(page: Page): ShopAssertions {
  return {
    login: new LoginAssertions(page),
    products: new ProductsAssertions(page),
    product: new ProductAssertions(page),
    cart: new CartAssertions(page),
    checkout: new CheckoutAssertions(page),
    orders: new OrdersAssertions(page),
  };
}