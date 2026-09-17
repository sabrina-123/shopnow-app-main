const { By, until } = require("selenium-webdriver");

class ProductsPage {
  constructor(driver, baseUrl = "http://localhost:3000") {
    this.driver = driver;
    this.baseUrl = baseUrl;
  }

  async open() {
    await this.driver.get(`${this.baseUrl}/products.html`);
  }

  async waitUntilDisplayed() {
    return this.driver.wait(
      until.elementLocated(By.css('[data-testid="products-page"]')),
      5000
    );
  }

  async openProduct(productId) {
    await this.driver.findElement(
      By.css(`[data-testid="view-product-${productId}"]`)
    ).click();
  }

  async addProduct(productId) {
    await this.driver.findElement(
      By.css(`[data-testid="add-to-cart-${productId}"]`)
    ).click();
    const alert = await this.driver.wait(until.alertIsPresent(), 5000);
    await alert.accept();
  }
}

module.exports = ProductsPage;
