const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const createDriver = require("../helpers/create-driver");

describe("Test 1 — Page d'accueil ShopNow", function () {
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

  it("affiche correctement la page d'accueil", async function () {
    await driver.get(process.env.BASE_URL || "http://localhost:3000");

    const homePage = await driver.wait(
      until.elementLocated(By.css('[data-testid="home-page"]')),
      5000
    );
    const mainTitle = await driver.wait(
      until.elementLocated(By.css("h1")),
      5000
    );

    expect(await driver.getTitle()).to.equal("ShopNow — Accueil");
    expect(await homePage.isDisplayed()).to.equal(true);
    expect(await mainTitle.getText()).to.equal("Bienvenue sur ShopNow");
  });
});
