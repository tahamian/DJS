var expect = require('chai').expect,
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build()

const BUTTON_NAMES = ["03 Exchange.mp3", "04 For However Long.mp3", "05 Don't.mp3", "06 Open Interlude.mp3", "Drake.mp3"]
const TITLE = "DJS"

describe('Client Side Graphical Interface', () => {

    it('Wepage Title Loaded', (done) => {

        driver.get('localhost:3000')
        driver.getTitle().then((title) => {
            expect(title).to.equal('DJS')
            done()
        })

    }).timeout(5000)

    it('Buttons Loaded', (done) => {

        driver.findElements(By.className('list-group-item list-group-item-action'))
            .then(children => {

                var flag = true
                
                for (var i = 0; i < children.length; i++) {
                    var child = children[i].getText().then(text => {
                        console.log(BUTTON_NAMES[0])
                        if (text != BUTTON_NAMES[i]) flag = false
                    })
                }

                expect(flag).to.equal(true)
                done()

            })
    })

    it('Vote causes button to be highlighted', (done) => {
        done()
    })
    
})