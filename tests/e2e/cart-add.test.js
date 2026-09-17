const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 7 — Ajout au panier ShopNow", function () {
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

  it("ajoute un produit et le retrouve dans le panier", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/products.html`);
    await driver.executeScript("window.localStorage.clear();");
    await driver.navigate().refresh();

    const productsPage = await driver.wait(
      until.elementLocated(By.css('[data-testid="products-page"]')),
      5000
    );
    const productCard = await driver.wait(
      until.elementLocated(By.css('[data-testid="product-card-101"]')),
      5000
    );
    const addButton = await driver.findElement(
      By.css('[data-testid="add-to-cart-101"]')
    );

    expect(await productsPage.isDisplayed()).to.equal(true);
    expect(await productCard.isDisplayed()).to.equal(true);

    await addButton.click();
    const alert = await driver.wait(until.alertIsPresent(), 5000);
    await alert.accept();

    await driver.findElement(By.css('[data-testid="cart-link"]')).click();

    const cartPage = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-page"]')),
      5000
    );
    const cartProduct = await driver.wait(
      until.elementLocated(By.css('[data-testid="cart-product-101"]')),
      5000
    );
    const quantity = await driver.findElement(
      By.css('[data-testid="quantity-101"]')
    );

    expect(await cartPage.isDisplayed()).to.equal(true);
    expect(await cartProduct.getText()).to.equal("Clavier mécanique RGB");
    expect(await quantity.getText()).to.equal("1");
  });
});
