const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('testMatchEvents', function() {
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
  it('testMatchEvents', async function() {
    // Test name: testMatchEvents
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
    // 8 | click | linkText=Matches | 
    await driver.findElement(By.linkText("Matches")).click()
    // 9 | click | css=.css-15lsz6c-indicatorContainer path | 
    await driver.findElement(By.css(".css-15lsz6c-indicatorContainer path")).click()
    // 10 | click | id=react-select-4-option-3 | 
    await driver.findElement(By.id("react-select-4-option-3")).click()
    // 11 | click | css=.match-element:nth-child(2) | 
    await driver.findElement(By.css(".match-element:nth-child(2)")).click()
    // 12 | click | linkText=Referee Voting & Monitoring System | 
    await driver.findElement(By.linkText("Referee Voting & Monitoring System")).click()
    // 13 | runScript | window.scrollTo(0,0) | 
    await driver.executeScript("window.scrollTo(0,0)")
  })
})
