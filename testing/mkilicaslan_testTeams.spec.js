const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('testTeams', function() {
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
  it('testTeams', async function() {
    // Test name: testTeams
    // Step # | name | target | value
    // 1 | open | /login | 
    await driver.get("https://refeere-management-system.onrender.com/login")
    // 2 | setWindowSize | 1080x656 | 
    await driver.manage().window().setRect({ width: 1080, height: 656 })
    // 3 | click | name=email | 
    await driver.findElement(By.name("email")).click()
    // 4 | type | name=email | testacc@hotmail.com
    await driver.findElement(By.name("email")).sendKeys("testacc@hotmail.com")
    // 5 | click | name=password | 
    await driver.findElement(By.name("password")).click()
    // 6 | type | name=password | testacc@hotmail.com
    await driver.findElement(By.name("password")).sendKeys("testacc@hotmail.com")
    // 7 | click | css=.styles_green_btn__xBeh7 | 
    await driver.findElement(By.css(".styles_green_btn__xBeh7")).click()
    // 8 | click | linkText=Teams | 
    await driver.findElement(By.linkText("Teams")).click()
    // 9 | click | css=.col:nth-child(1) .card-img-top | 
    await driver.findElement(By.css(".col:nth-child(1) .card-img-top")).click()
  })
})
