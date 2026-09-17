const { By, until } = require("selenium-webdriver");

class LoginPage {
  constructor(driver, baseUrl = "http://localhost:3000") {
    this.driver = driver;
    this.baseUrl = baseUrl;
  }

  async open() {
    await this.driver.get(`${this.baseUrl}/login.html`);
  }

  async openFromHome() {
    await this.driver.get(this.baseUrl);
    const loginLink = await this.driver.wait(
      until.elementLocated(By.css('[data-testid="login-link"]')),
      5000
    );
    await loginLink.click();
  }

  async waitUntilDisplayed() {
    return this.driver.wait(
      until.elementLocated(By.css('[data-testid="login-form"]')),
      5000
    );
  }

  async login(email, password) {
    await this.driver.findElement(By.css('[data-testid="login-email"]')).sendKeys(email);
    await this.driver.findElement(By.css('[data-testid="login-password"]')).sendKeys(password);
    await this.driver.findElement(By.css('[data-testid="login-submit"]')).click();
  }
}

module.exports = LoginPage;
