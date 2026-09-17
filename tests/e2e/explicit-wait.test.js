const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 13 — Attente explicite Selenium", function () {
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

  it("attend explicitement l'accès à la page Produits", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(baseUrl);

    const productsLink = await driver.wait(
      until.elementLocated(By.css('[data-testid="products-link"]')),
      5000,
      "Le lien Produits doit être présent"
    );
    await driver.wait(
      until.elementIsVisible(productsLink),
      5000,
      "Le lien Produits doit être visible avant le clic"
    );
    await productsLink.click();

    const productsPage = await driver.wait(
      until.elementLocated(By.css('[data-testid="products-page"]')),
      5000,
      "La page Produits doit être présente"
    );
    const productCard = await driver.wait(
      until.elementLocated(By.css('[data-testid^="product-card-"]')),
      5000,
      "Au moins un produit doit être chargé"
    );

    expect(await productsPage.isDisplayed()).to.equal(true);
    expect(await productCard.isDisplayed()).to.equal(true);
  });
});
