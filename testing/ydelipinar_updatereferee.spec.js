const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Update', function() {
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
  it('Update', async function() {
    // Test name: Update
    // Step # | name | target | value
    // 1 | open | /refereePanel/updateReferee/63b46fd4e1a952254d88b0bf | 
    await driver.get("https://refeere-management-system.onrender.com/refereePanel/updateReferee/63b46fd4e1a952254d88b0bf")
    // 2 | setWindowSize | 714x850 | 
    await driver.manage().window().setRect({ width: 714, height: 850 })
    // 3 | click | css=.styles_form_container__0imzU | 
    await driver.findElement(By.css(".styles_form_container__0imzU")).click()
    // 4 | type | css=.styles_input__hFwDP:nth-child(8) | selenium
    await driver.findElement(By.css(".styles_input__hFwDP:nth-child(8)")).sendKeys("selenium")
    // 5 | click | css=.styles_green_btn__MfhoU | 
    await driver.findElement(By.css(".styles_green_btn__MfhoU")).click()
    // 6 | runScript | window.scrollTo(0,0) | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 7 | click | css=.col-md-4:nth-child(4) .card-link:nth-child(3) | 
    await driver.findElement(By.css(".col-md-4:nth-child(4) .card-link:nth-child(3)")).click()
    // 8 | click | id=root | 
    await driver.findElement(By.id("root")).click()
    // 9 | type | name=name | Selenoumtest
    await driver.findElement(By.name("name")).sendKeys("Selenoumtest")
    // 10 | click | css=.styles_green_btn__MfhoU | 
    await driver.findElement(By.css(".styles_green_btn__MfhoU")).click()
    // 11 | runScript | window.scrollTo(0,0) | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 12 | click | css=.col-md-4:nth-child(5) .card-link:nth-child(3) | 
    await driver.findElement(By.css(".col-md-4:nth-child(5) .card-link:nth-child(3)")).click()
    // 13 | click | name=name | 
    await driver.findElement(By.name("name")).click()
    // 14 | type | name=name | Cüneyt Cakir2
    await driver.findElement(By.name("name")).sendKeys("Cüneyt Cakir2")
    // 15 | click | css=.styles_green_btn__MfhoU | 
    await driver.findElement(By.css(".styles_green_btn__MfhoU")).click()
    // 16 | runScript | window.scrollTo(0,0) | 
    await driver.executeScript("window.scrollTo(0,0)")
  })
})
