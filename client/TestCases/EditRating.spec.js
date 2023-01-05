const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('EditRating', function() {
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
  it('EditRating', async function() {
    await driver.get("http://localhost:3000/referee/637d26d6caef7813b741abb0")
    await driver.manage().window().setRect({ width: 1552, height: 840 })
    await driver.findElement(By.css(".bg-warning > path")).click()
    await driver.findElement(By.id("exampleForm.ControlTextarea2")).click()
    {
      const dropdown = await driver.findElement(By.id("exampleForm.ControlTextarea2"))
      await dropdown.findElement(By.xpath("//option[. = '5']")).click()
    }
    await driver.findElement(By.css(".btn:nth-child(2)")).click()
  })
})
