const { By, until } = require("selenium-webdriver");

class CartPage {
  constructor(driver, baseUrl = "http://localhost:3000") {
    this.driver = driver;
    this.baseUrl = baseUrl;
  }

  async open() {
    await this.driver.get(`${this.baseUrl}/cart.html`);
  }

  async waitUntilDisplayed() {
    return this.driver.wait(
      until.elementLocated(By.css('[data-testid="cart-page"]')),
      5000
    );
  }

  async increaseQuantity(productId) {
    await this.driver.findElement(
      By.css(`[data-action="increase"][data-id="${productId}"]`)
    ).click();
  }

  async decreaseQuantity(productId) {
    await this.driver.findElement(
      By.css(`[data-action="decrease"][data-id="${productId}"]`)
    ).click();
  }

  async removeProduct(productId) {
    await this.driver.findElement(
      By.css(`[data-testid="remove-item-${productId}"]`)
    ).click();
  }

  async clear() {
    await this.driver.findElement(By.css('[data-testid="clear-cart"]')).click();
  }

  async waitUntilEmpty() {
    return this.driver.wait(
      until.elementLocated(By.css('[data-testid="empty-cart"]')),
      5000
    );
  }
}

module.exports = CartPage;
