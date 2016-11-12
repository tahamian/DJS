var expect = require('chai').expect,
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build()

var MUSIC = "02 Let Em' Know.mp3\n03 Exchange.mp3\n04 For However Long.mp3\n05 Don't.mp3\n06 Open Interlude.mp3"

describe('Client Side Graphical Interface', () => {
/*
    it('Wepage Title Loaded', (done) => {
        driver.get('localhost:3000')
        driver.getTitle().then((title) => {
            expect(title).to.equal('DJS')
            done()
        })
    }).timeout(5000)

    it('Buttons Loaded', (done) => {
        var list = driver.findElement(By.id('list-div'))
        list.getText().then(text => {
            console.log('list.getText(): ' + list.getText())
            expect(text).to.equal(MUSIC)
            done()
        })
    })

    it('Buttons Includes Song Title', (done) => {
        var list = driver.findElement(By.id('list-div'))
        list.getText().then(text => {
            expect(text).to.equal(MUSIC)
            done()
        })
    })

    it('Vote causes button to be highlighted', (done) => {
        var list = driver.findElement(By.id('list-div'))
        var children = list.findElements(By.xpath('.//*'))
        console.log(children [0])
        done()
    })
    */
})