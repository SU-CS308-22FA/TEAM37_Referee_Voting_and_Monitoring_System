// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Add referee', function() {
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
  it('Add referee', async function() {
    // Test name: Add referee
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("https://refeere-management-system.onrender.com/")
    // 2 | setWindowSize | 2064x1128 | 
    await driver.manage().window().setRect({ width: 2064, height: 1128 })
    // 3 | runScript | window.scrollTo(0,0) | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 4 | click | linkText=RefereePanel | 
    await driver.findElement(By.linkText("RefereePanel")).click()
    // 5 | click | css=.col-md-4:nth-child(4) .card-link:nth-child(5) | 
    await driver.findElement(By.css(".col-md-4:nth-child(4) .card-link:nth-child(5)")).click()
    // 6 | click | name=name | 
    await driver.findElement(By.name("name")).click()
    // 7 | type | name=name | seleniumtest
    await driver.findElement(By.name("name")).sendKeys("seleniumtest")
    // 8 | click | name=age | 
    await driver.findElement(By.name("age")).click()
    // 9 | type | name=age | 1
    await driver.findElement(By.name("age")).sendKeys("1")
    // 10 | click | name=imageurl | 
    await driver.findElement(By.name("imageurl")).click()
    // 11 | type | name=imageurl | https://i4.hurimg.com/i/hurriyet/75/750x422/5c04d6230f25441c9041275b.jpg
    await driver.findElement(By.name("imageurl")).sendKeys("https://i4.hurimg.com/i/hurriyet/75/750x422/5c04d6230f25441c9041275b.jpg")
    // 12 | click | name=matches | 
    await driver.findElement(By.name("matches")).click()
    // 13 | type | name=matches | 3
    await driver.findElement(By.name("matches")).sendKeys("3")
    // 14 | click | name=redcard | 
    await driver.findElement(By.name("redcard")).click()
    // 15 | type | name=redcard | 3
    await driver.findElement(By.name("redcard")).sendKeys("3")
    // 16 | click | name=yellowcard | 
    await driver.findElement(By.name("yellowcard")).click()
    // 17 | type | name=yellowcard | 3
    await driver.findElement(By.name("yellowcard")).sendKeys("3")
    // 18 | click | css=.styles_input__hFwDP:nth-child(8) | 
    await driver.findElement(By.css(".styles_input__hFwDP:nth-child(8)")).click()
    // 19 | type | css=.styles_input__hFwDP:nth-child(8) | seleniumtest2
    await driver.findElement(By.css(".styles_input__hFwDP:nth-child(8)")).sendKeys("seleniumtest2")
    // 20 | click | css=.styles_green_btn__MfhoU | 
    await driver.findElement(By.css(".styles_green_btn__MfhoU")).click()
    // 21 | click | css=.col-md-4:nth-child(10) .card-img-top | 
    await driver.findElement(By.css(".col-md-4:nth-child(10) .card-img-top")).click()
    // 22 | click | css=.col-md-4:nth-child(10) .card-body | 
    await driver.findElement(By.css(".col-md-4:nth-child(10) .card-body")).click()
    // 23 | click | css=.col-md-4:nth-child(10) .card-link:nth-child(5) | 
    await driver.findElement(By.css(".col-md-4:nth-child(10) .card-link:nth-child(5)")).click()
    // 24 | doubleClick | css=.col-md-4:nth-child(10) .card-link:nth-child(5) | 
    {
      const element = await driver.findElement(By.css(".col-md-4:nth-child(10) .card-link:nth-child(5)"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    // 25 | click | name=name | 
    await driver.findElement(By.name("name")).click()
    // 26 | type | name=name | seleniumtest
    await driver.findElement(By.name("name")).sendKeys("seleniumtest")
    // 27 | click | name=name | 
    await driver.findElement(By.name("name")).click()
    // 28 | type | name=name | seleniumtest-2
    await driver.findElement(By.name("name")).sendKeys("seleniumtest-2")
    // 29 | click | name=age | 
    await driver.findElement(By.name("age")).click()
    // 30 | type | name=age | 2
    await driver.findElement(By.name("age")).sendKeys("2")
    // 31 | click | name=imageurl | 
    await driver.findElement(By.name("imageurl")).click()
    // 32 | type | name=imageurl | https://i4.hurimg.com/i/hurriyet/75/750x422/5c04d6230f25441c9041275b.jpg
    await driver.findElement(By.name("imageurl")).sendKeys("https://i4.hurimg.com/i/hurriyet/75/750x422/5c04d6230f25441c9041275b.jpg")
    // 33 | click | name=matches | 
    await driver.findElement(By.name("matches")).click()
    // 34 | type | name=matches | 3
    await driver.findElement(By.name("matches")).sendKeys("3")
    // 35 | click | name=redcard | 
    await driver.findElement(By.name("redcard")).click()
    // 36 | type | name=redcard | 3
    await driver.findElement(By.name("redcard")).sendKeys("3")
    // 37 | click | name=yellowcard | 
    await driver.findElement(By.name("yellowcard")).click()
    // 38 | type | name=yellowcard | 3
    await driver.findElement(By.name("yellowcard")).sendKeys("3")
    // 39 | click | css=.styles_input__hFwDP:nth-child(8) | 
    await driver.findElement(By.css(".styles_input__hFwDP:nth-child(8)")).click()
    // 40 | type | css=.styles_input__hFwDP:nth-child(8) | selenium test3
    await driver.findElement(By.css(".styles_input__hFwDP:nth-child(8)")).sendKeys("selenium test3")
    // 41 | click | css=.styles_green_btn__MfhoU | 
    await driver.findElement(By.css(".styles_green_btn__MfhoU")).click()
  })
})
