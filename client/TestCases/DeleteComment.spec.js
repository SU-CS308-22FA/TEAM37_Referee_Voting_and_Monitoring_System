const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('DeleteComment', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('DeleteComment', async function() {
    await driver.get("http://localhost:3000/referee/637d26d6caef7813b741abb0")
    await driver.manage().window().setRect({ width: 1552, height: 840 })
    await driver.findElement(By.css(".text-danger > path")).click()
    assert(await driver.switchTo().alert().getText() == "Review has been deleted successfully!")
  })
})
