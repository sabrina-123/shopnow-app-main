const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 8 — Modification de la quantité ShopNow", function () {
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

  it("augmente puis diminue la quantité d'un produit", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/products.html`);
    await driver.executeScript("window.localStorage.clear();");
    await driver.navigate().refresh();

    await driver.wait(
      until.elementLocated(By.css('[data-testid="add-to-cart-101"]')),
      5000
    );
    await driver.findElement(By.css('[data-testid="add-to-cart-101"]')).click();
    const alert = await driver.wait(until.alertIsPresent(), 5000);
    await alert.accept();

    await driver.findElement(By.css('[data-testid="cart-link"]')).click();
    const cartItem = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-item-101"]')),
      5000
    );
    let quantity = await driver.findElement(
      By.css('[data-testid="quantity-101"]')
    );

    expect(await cartItem.isDisplayed()).to.equal(true);
    expect(await quantity.getText()).to.equal("1");

    await driver.findElement(
      By.css('[data-action="increase"][data-id="101"]')
    ).click();
    quantity = await driver.findElement(By.css('[data-testid="quantity-101"]'));
    expect(await quantity.getText()).to.equal("2");

    await driver.findElement(
      By.css('[data-action="decrease"][data-id="101"]')
    ).click();
    quantity = await driver.findElement(By.css('[data-testid="quantity-101"]'));
    expect(await quantity.getText()).to.equal("1");
  });
});
