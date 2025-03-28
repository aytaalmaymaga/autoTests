const { By, until, Builder, Key } = require("selenium-webdriver");
const assert = require("assert");

// Данные
let textPhoneLogIn = '//*[@id="signForm"]/form/div[3]/div[1]/label';

// Кнопки
let buttonSingIn = 'popButton login with-modal-popup1';
let buttonSign = 'signbutton';

// Инпуты
let sign = 'sign';
let password = 'password';

describe("sign in Farpost.ru by password", () => {
    let driver;

    before(() => {
        driver = new Builder()
            .forBrowser("chrome")
            .build();
    });

    after(() => {
        driver.quit();
    });

    it("check modal signIn", async () => {
        await driver.get('https://www.farpost.ru/');
        driver.manage().window().maximize();

        await driver.wait(until.elementLocated(By.className(buttonSingIn)), 5 * 1000)
            .click();
        let checkSignIn = await driver.wait(until.elementLocated(By.xpath(textPhoneLogIn)), 5 * 1000)
            .getText();

        assert.strictEqual(checkSignIn, 'Телефон / Логин');
    });

    it("check authorization", async () => {
        await driver.wait(until.elementLocated(By.id(sign)), 5 * 1000)
            .sendKeys('+79958748932');
        await driver.wait(until.elementLocated(By.id(password)), 5 * 1000)
            .sendKeys('Ahahaha2024')
        await driver.wait(until.elementLocated(By.id(buttonSign)), 5 * 1000)
            .click();
        let profileName = await driver.wait(until.elementLocated(By.className('userNick auto-shy')), 5 * 1000)
            .getText();

        assert.strictEqual(profileName, 'testasd');
        let asd;
    });
})
