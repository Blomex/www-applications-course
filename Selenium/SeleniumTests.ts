import {expect} from "chai";
import {Builder, By, Capabilities} from 'selenium-webdriver';

var mainPagePath = 'file:///C:/Users/Beniamin/PhpstormProjects/untitled3/main.html'

describe('content test', function () {
    this.timeout(20000);
    it('should contain starship', async function() {
        const driver = await new Builder().forBrowser('firefox').build();
        await driver.get(mainPagePath);

        expect(await driver.findElement(By.className('statek'))[0].getText()).to.include('Axiom');
    });
});