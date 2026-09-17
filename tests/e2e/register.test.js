const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 6 — Création d'un compte ShopNow", function () {
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

  it("crée un compte avec une nouvelle adresse email", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const email = `e2e-${Date.now()}@shopnow.test`;
    await driver.get(`${baseUrl}/register.html`);

    const registerForm = await driver.wait(
      until.elementLocated(By.css('[data-testid="register-form"]')),
      5000
    );
    expect(await registerForm.isDisplayed()).to.equal(true);

    const firstNameInput = await driver.findElement(
      By.css('[data-testid="register-firstname"]')
    );
    const lastNameInput = await driver.findElement(
      By.css('[data-testid="register-lastname"]')
    );
    const emailInput = await driver.findElement(
      By.css('[data-testid="register-email"]')
    );
    const passwordInput = await driver.findElement(
      By.css('[data-testid="register-password"]')
    );
    await firstNameInput.sendKeys("Test");
    await lastNameInput.sendKeys("Selenium");
    await emailInput.sendKeys(email);
    await passwordInput.sendKeys("Password123!");

    expect(await emailInput.getAttribute("value")).to.equal(email);
    expect(await passwordInput.getAttribute("value")).to.equal("Password123!");

    await driver.findElement(By.css('[data-testid="register-submit"]')).click();

    const successMessage = await driver.wait(
      until.elementLocated(By.css('[data-testid="register-message"]')),
      5000
    );
    await driver.wait(
      until.elementTextIs(successMessage, "Compte créé avec succès."),
      5000
    );

    expect(await successMessage.getText()).to.equal("Compte créé avec succès.");
    await driver.wait(until.urlIs(`${baseUrl}/login.html`), 5000);
    expect(await driver.getCurrentUrl()).to.equal(`${baseUrl}/login.html`);
  });
});
