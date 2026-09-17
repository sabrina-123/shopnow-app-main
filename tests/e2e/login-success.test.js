const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 4 — Connexion réussie ShopNow", function () {
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

  it("connecte l'utilisateur avec le compte de démonstration", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/login.html`);

    const loginForm = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-form"]')),
      5000
    );
    expect(await loginForm.isDisplayed()).to.equal(true);

    const emailInput = await driver.findElement(
      By.css('[data-testid="login-email"]')
    );
    const passwordInput = await driver.findElement(
      By.css('[data-testid="login-password"]')
    );
    await emailInput.sendKeys("alice@shopnow.test");
    await passwordInput.sendKeys("Password123!");

    await driver.findElement(By.css('[data-testid="login-submit"]')).click();

    const loggedUser = await driver.wait(
      until.elementLocated(By.css('[data-testid="logged-user"]')),
      5000
    );
    expect(await driver.getTitle()).to.equal("ShopNow — Accueil");
    expect(await loggedUser.getText()).to.contain("Bonjour Alice");
  });
});
