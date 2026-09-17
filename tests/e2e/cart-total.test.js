const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 9 — Calcul du total ShopNow", function () {
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

  it("calcule le total selon le prix et la quantité", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/products.html`);
    await driver.executeScript("window.localStorage.clear();");
    await driver.navigate().refresh();

    const addButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="add-to-cart-101"]')),
      5000
    );
    await addButton.click();
    let alert = await driver.wait(until.alertIsPresent(), 5000);
    await alert.accept();

    await driver.findElement(By.css('[data-testid="add-to-cart-101"]')).click();
    alert = await driver.wait(until.alertIsPresent(), 5000);
    await alert.accept();

    await driver.findElement(By.css('[data-testid="cart-link"]')).click();

    const quantity = await driver.wait(
      until.elementLocated(By.css('[data-testid="quantity-101"]')),
      5000
    );
    const total = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-total"]')),
      5000
    );

    expect(await quantity.getText()).to.equal("2");
    expect(await total.getText()).to.equal("159,80 €");
    expect(Number((79.9 * 2).toFixed(2))).to.equal(159.8);
  });
});
