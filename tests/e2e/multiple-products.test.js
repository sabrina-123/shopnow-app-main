const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test supplémentaire — Ajout de plusieurs produits", function () {
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

  it("ajoute deux produits et les retrouve dans le panier", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/products.html`);
    await driver.executeScript("window.localStorage.clear();");
    await driver.navigate().refresh();

    const productsPage = await driver.wait(
      until.elementLocated(By.css('[data-testid="products-page"]')),
      5000
    );
    const firstProduct = await driver.wait(
      until.elementLocated(By.css('[data-testid="product-card-101"]')),
      5000
    );
    const secondProduct = await driver.wait(
      until.elementLocated(By.css('[data-testid="product-card-102"]')),
      5000
    );

    expect(await productsPage.isDisplayed()).to.equal(true);
    expect(await firstProduct.isDisplayed()).to.equal(true);
    expect(await secondProduct.isDisplayed()).to.equal(true);

    await driver.findElement(By.css('[data-testid="add-to-cart-101"]')).click();
    let alert = await driver.wait(until.alertIsPresent(), 5000);
    await alert.accept();

    await driver.findElement(By.css('[data-testid="add-to-cart-102"]')).click();
    alert = await driver.wait(until.alertIsPresent(), 5000);
    await alert.accept();

    await driver.findElement(By.css('[data-testid="cart-link"]')).click();
    const cartPage = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-page"]')),
      5000
    );
    const firstCartProduct = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-product-101"]')),
      5000
    );
    const secondCartProduct = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-product-102"]')),
      5000
    );

    expect(await cartPage.isDisplayed()).to.equal(true);
    expect(await firstCartProduct.getText()).to.equal("Clavier mécanique RGB");
    expect(await secondCartProduct.getText()).to.equal("Souris sans fil");
    expect(
      (await driver.findElements(By.css('[data-testid^="cart-item-"]'))).length
    ).to.equal(2);
  });
});
