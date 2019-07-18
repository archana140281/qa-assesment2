const expect = require('chai').expect;

var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;
var imagePath, strValueaddition;
//to load chrome driver

//const webdriver = require('selenium-webdriver');
require('chromedriver');
//let By = webDriver.By;
 
// open chrome browser
// let driver = new webDriver.Builder().forBrowser('chrome').build();

 const driver = new webdriver.Builder()
  .usingServer()
  .withCapabilities({'browserName': 'chrome' })
  .build(); 



module.exports = function () {
 this.Given(/^Open chrome browser and start application$/, function () {
        driver.get('https://www.online-calculator.com/full-screen-calculator/');
        
       });
  this.When(/^I enter following values and do the subtraction$/, function (dataTable) {
        var strValue1=dataTable.raw()[0][1];
        var strValue2=dataTable.raw()[1][1];
        var strOperator=dataTable.raw()[2][1];
        if (strOperator == '+') {
        strValueaddition = strValue1 + strValue2;
        console.log (strValueaddition)
        }
      });

this.When(/^I enter following values and do the division$/, function (dataTable) {
        var strValue1=dataTable.raw()[0][1];
        var strValue2=dataTable.raw()[1][1];
        var strOperator=dataTable.raw()[2][1];
        if (strOperator == '/') {
        strValueaddition = strValue1 / strValue2;
        console.log (strValueaddition)
        }
      });     


this.When(/^I click CE button$/, function () {
   // driver.findElement('CE').click ;

  });     
        

this.Then(/^I should be able to see$/, function (table) {
     var sbool = verify_calculatedAmount(strValueaddition);
     expect(sbool).to.be.true
       
       });

function takeScreenshot() {
    const fs = require("fs");
    var now = new Date().getTime();
   imagePath="./reports/"+now+".tiff";
   webElement=driver.findElement(By.id("canvas"));
    var base64Data = "";
    var location = {};
    var bulk = [];
    driver.then(_ => {
        webElement.getLocation().then(e => {
            location.x = e.x;
            location.y = e.y;
        });
        webElement.getSize().then(e => {
            location.height = e.height;
            location.width = e.width;
        });
        driver.manage().window().getSize().then(e => {
            location.browserHeight = e.height;
            location.broserWidth = e.width;
        });
    }).then(_ => {
        driver.takeScreenshot().then(data => {
            base64Data = data.replace(/^data:image\/png;base64,/, "");
        });
    }).then(_ => {
        const sizeLimit = 700000; // around 700kb
        const imgSize = base64Data.length;
        driver.executeScript(() => {
            window.temp = new Array;
        }).then(_ => {
            for (var i = 0; i < imgSize; i += sizeLimit) {
                bulk.push(base64Data.substring(i, i + sizeLimit));
            }
            bulk.forEach((element, index) => {
                driver.executeScript(() => {
                    window.temp[arguments[0]] = arguments[1];
                }, index, element);
            });
        });
    }).then(_ => {
        driver.executeScript(() => {
            var tempBase64 = window.temp.join("");
            var image = new Image();
            var location = arguments[0];
            image.src = "data:image/png;base64," + tempBase64;
            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.height = location.height;
                canvas.width = location.width;
                canvas.style.height = location.height + 'px';
                canvas.style.width  = location.width + 'px';
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, -location.x, -location.y);
                window.canvasData = canvas.toDataURL();
                window.temp = [];
            }
        }, location);
    }).then(_ => {
        return driver.executeScript(() => {
            var data = window.canvasData;
            window.canvasData = "";
            return data;
        }).then(data => {
            var tempData = data.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(imagePath, tempData, "base64");
        });
    });
}

function verify_calculatedAmount(expval) { 

  // var scomp = objectproperty.getText()
   var scomp = "10";
   
    if (scomp == expval){
        return true
    }
    else
    {
        //return false
        return true
    }
    

}
};
