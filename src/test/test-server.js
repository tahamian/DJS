var expect = require('chai').expect,
    async = require('async'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build()

const BUTTON_NAMES = ["03 Exchange.mp3", "04 For However Long.mp3", "05 Don't.mp3", "06 Open Interlude.mp3", "Drake.mp3"]
const TITLE = "DJS"

describe('Client Side Graphical Interface', function() {

    it('Wepage Title Loaded', function(done) {

        driver.get('localhost:3000')
        driver.getTitle().then(function(title) {
            expect(title).to.equal('DJS')
            done()
        })

    }).timeout(5000)

    it('Buttons Loaded', function(done) {

        driver.findElements(By.className('list-group-item list-group-item-action'))
            .then(function(children) {

                var flag = true
                
                for (var i = 0; i < children.length; i++) {
                    var child = children[i].getText().then(function(text) {
                        if (text != BUTTON_NAMES[i]) flag = false
                    })
                }

                expect(flag).to.equal(true)
                done()

            })
    })

    it('Initially sets all votes to zero', function(done) {

        driver.findElements(By.className('vote-count'))
            .then(function(children) {

                var flag = true

                for (var i = 0; i < children.length; i++) {
                    var child = children[i].getText().then(function(text) {
                        if (text != '0') flag = false
                    })
                }

                expect(flag).to.equal(true)
                done()

            })

    })

    it('Votes for an item when a user clicks a button', function(done) {

        driver.findElements(By.className('list-group-item list-group-item-action'))
            .then(function(buttons) {
                driver.findElements(By.className('vote-count'))
                    .then(function(counts) {

                        var flag = true

                        counts[0].getText().then(function(text) {
                            console.log('HELLO!')
                            if (text != '0') flag = false
                        })


                        buttons[0].click()


                        counts[0].getText().then(function(text) {
                            if (text != '1') flag = false
                        })

                        expect(flag).to.equal(true)
                        done()

                    })
            })

    })
    
})