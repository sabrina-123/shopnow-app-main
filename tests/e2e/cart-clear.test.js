const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 11 — Panier vide ShopNow", function () {
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

  it("vide complètement le panier", async function () {
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
    await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-item-101"]')),
      5000
    );

    await driver.findElement(By.css('[data-testid="clear-cart"]')).click();

    const emptyCart = await driver.wait(
      until.elementLocated(By.css('[data-testid="empty-cart"]')),
      5000
    );
    const remainingProducts = await driver.findElements(
      By.css('[data-testid^="cart-product-"]')
    );

    expect(await emptyCart.isDisplayed()).to.equal(true);
    expect(remainingProducts.length).to.equal(0);
    expect(await driver.findElements(By.css('[data-testid^="cart-item-"]'))).to.have.lengthOf(0);
  });
});
