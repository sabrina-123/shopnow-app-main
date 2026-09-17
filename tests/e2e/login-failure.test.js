const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 5 — Connexion refusée ShopNow", function () {
  this.timeout(60000);

  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("refuse la connexion avec un mauvais mot de passe", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/login.html`);

    const emailInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-email"]')),
      5000
    );
    const passwordInput = await driver.findElement(
      By.css('[data-testid="login-password"]')
    );
    await emailInput.sendKeys("alice@shopnow.test");
    await passwordInput.sendKeys("WrongPassword!");

    await driver.findElement(By.css('[data-testid="login-submit"]')).click();

    const errorMessage = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-message"]')),
      5000
    );
    await driver.wait(
      until.elementTextIs(errorMessage, "Email ou mot de passe incorrect."),
      5000
    );

    expect(await driver.getCurrentUrl()).to.equal(`${baseUrl}/login.html`);
    expect(await errorMessage.getText()).to.equal(
      "Email ou mot de passe incorrect."
    );
  });
});
