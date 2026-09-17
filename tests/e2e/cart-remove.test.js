const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 10 — Suppression d'un produit ShopNow", function () {
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

  it("supprime un produit du panier", async function () {
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
    const cartProduct = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-product-101"]')),
      5000
    );

    expect(await cartProduct.getText()).to.equal("Clavier mécanique RGB");
    expect(
      (await driver.findElements(By.css('[data-testid="cart-item-101"]'))).length
    ).to.equal(1);

    await driver.findElement(By.css('[data-testid="remove-item-101"]')).click();

    const emptyCart = await driver.wait(
      until.elementLocated(By.css('[data-testid="empty-cart"]')),
      5000
    );
    const remainingProduct = await driver.findElements(
      By.css('[data-testid="cart-product-101"]')
    );

    expect(await emptyCart.isDisplayed()).to.equal(true);
    expect(remainingProduct.length).to.equal(0);
  });
});
