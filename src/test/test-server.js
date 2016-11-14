var expect = require('chai').expect,
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build()

const BUTTON_NAMES = ["03 Exchange.mp3", "04 For However Long.mp3", "05 Don't.mp3"]
const TITLE = "DJS"

describe('Client Side Graphical Interface', function() {

    it('Wepage Title Loaded', function(done) {

        driver.get('localhost:3000')
        driver.getTitle().then(function(title) {
            expect(title).to.equal('DJS')
            done()
        })

    }).timeout(5000)

    it('Loads the first button', function(done) {
        driver.findElements(By.className('list-group-item list-group-item-action'))
            .then((children) => {
                var child = children[0].getText().then((text) => {
                    expect(text).to.equal(BUTTON_NAMES[0])
                    done()
                })
            })
    })

    it('Loads the second button', function(done) {
        driver.findElements(By.className('list-group-item list-group-item-action'))
            .then((children) => {
                var child = children[1].getText().then((text) => {
                    expect(text).to.equal(BUTTON_NAMES[1])
                    done()
                })
            })
    })

    it('Loads the third button', function(done) {
        driver.findElements(By.className('list-group-item list-group-item-action'))
            .then((children) => {
                var child = children[2].getText().then((text) => {
                    expect(text).to.equal(BUTTON_NAMES[2])
                    done()
                })
            })
    })

    it('Initially sets first vote to zero', function(done) {
        driver.findElements(By.className('vote-count'))
            .then(function(children) {
                var child = children[0].getText().then((text) => {
                    expect(text).to.equal('0')
                    done()
                })
            })
    })

    it('Initially sets second vote to zero', function(done) {
        driver.findElements(By.className('vote-count'))
            .then(function(children) {
                var child = children[1].getText().then((text) => {
                    expect(text).to.equal('0')
                    done()
                })
            })
    })

    it('Initially sets third vote to zero', function(done) {
        driver.findElements(By.className('vote-count'))
            .then(function(children) {
                var child = children[2].getText().then((text) => {
                    expect(text).to.equal('0')
                    done()
                })
            })
    })

    it('Votes for an item when a user clicks a button', function(done) {

        driver.findElements(By.className('list-group-item list-group-item-action'))
            .then(function(buttons) {
                driver.findElements(By.className('vote-count'))
                    .then(function(counts) {
                        var button = buttons[0]
                        var count = counts[0]

                        button.click().then(() => {
                            var c = count.getText().then((text) => {
                                expect(text).to.equal('1')
                                done()
                            })
                        })
                    })
            })

    })
    
})