const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const LoginPage = require("../pages/LoginPage");
const createDriver = require("../helpers/create-driver");

describe("Page de connexion ShopNow", function () {
  this.timeout(60000);

  let driver;
  let loginPage;

  beforeEach(async function () {
    driver = await createDriver();
    loginPage = new LoginPage(driver, process.env.BASE_URL || "http://localhost:3000");
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("ouvre la page de connexion depuis ShopNow", async function () {
    await loginPage.openFromHome();
    const loginForm = await loginPage.waitUntilDisplayed();

    expect(await driver.getTitle()).to.equal("ShopNow — Connexion");
    expect(await loginForm.isDisplayed()).to.equal(true);
  });
});
