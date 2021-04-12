var data =  require('./data.json');
var winston = require('winston');
var logger;

function checkPresence(ele,msg){
    browser.sleep(3000)
    if(ele.isPresent()){
        console.log(msg +' is present');
        logger.log('info', msg +' is present. Pass');
    }    
    else{
        console.log(msg + ' is not present');
        logger.log('error', msg +' is not present. Fail');
    }    
} 

function buttonClick(ele,msg){
    if(ele.isPresent()){
        ele.click();
        browser.sleep(3000);
        logger.log('info', msg +' is successfully clicked.');
    }    
    else{    
        console.log(msg +" is not present");
        logger.log('error', msg +' is not present.');
    }    
}

function select(ele,optIndex,msg){
    if(ele.isPresent()){
        element.all(by.tagName('option')).then(function(options){
            browser.sleep(3000);
        options[optIndex].click();
        browser.sleep(2000);
        logger.log('info', msg +' is successfully selected.');
      });
    }
    else
    logger.log('error', msg +' is not present.');
}

function inputData(ele,str,msg){
    if(ele.isPresent()){
        ele.sendKeys(str);
        browser.sleep(3000);
        logger.log('info', msg +' is successfully entered.');
    }
    else
    logger.log('error', msg +' is not entered.');
}

function loginTo1006(){
    var customerLogin= element(by.buttonText('Customer Login')); 
    buttonClick(customerLogin,'Customer Login button');
    var yourName =element(by.model('custId'));
    select(yourName,2,'selected');
    var Login= element(by.buttonText('Login')); 
    buttonClick(Login,'Login button');
    var acNum =  element(by.model('accountNo'));
    select(acNum,2,"1006");
}

function check(dataCheck,orgData,msg){
    if(dataCheck==orgData){
        console.log("correct");
        logger.log('info', msg);
    }
    else{
        console.log('error');
        logger.log('error', msg+' is not present');    
    }

}

describe('BankingCustomerSuite', function () {

    beforeAll(function(){
        logger = winston.createLogger({
             level: 'info',
             format: winston.format.json(),
             transports: [
               new winston.transports.File({ filename: './log/error.log', level: 'error' }),
               new winston.transports.File({ filename: 'combined.log' })
             ]
           });
 
    });

    beforeEach(function () {
        browser.get(data.url);
        browser.manage().window().maximize();
        //logger.log('info', 'URL is entered.');
        browser.sleep(1000);
        logger.log('info', 'URL is entered.');
    });

    afterEach(function () {
        console.log('TestCase Completed');
        logger.log('info','TestCase Completed')
    });

    it('TC1_ManagerLogin',function(){
        logger.log('info', 'TC1_ManagerLogin is started.');
        var manager= element(by.buttonText('Bank Manager Login'));
        buttonClick(manager,'Manager login button');
        var homeBtn =  element(by.buttonText('Add Customer'));
        checkPresence(homeBtn,'Add Customer');  
    });

    it('TC2_addCustomer',function(){
        logger.log('info', 'TC2_addCustomer is started.');
        var manager= element(by.buttonText('Bank Manager Login'));
        buttonClick(manager,'Manager login button');
        var addCustomer =  element(by.buttonText('Add Customer'));
        buttonClick(addCustomer,'Add Customer');
        var firstName =  element(by.model('fName'));
        inputData(firstName,'xyz','First Name');
        var lastName =  element(by.model('lName'));
        inputData(lastName,'abc','Last Name');
        var postCode =  element(by.model('postCd'));
        inputData(postCode,'123','Post Code');
        var submit= element(by.css('[type="submit"]'));
        buttonClick(submit,'Add customer button');
        var alert = browser.switchTo().alert();
        logger.log('info','Customer added successfully.');
        alert.accept();
       
    });    

    it('TC3_oppenAccountForDoller',function(){
        logger.log('info', 'TC3_oppenAccountForDoller is started.');
        var manager= element(by.buttonText('Bank Manager Login'));
        buttonClick(manager,'Manager login button');
        var OpenAccount =  element(by.buttonText('Open Account'));
        buttonClick(OpenAccount,'Open Account');
        var userSelect= element(by.id('userSelect'));
        select(userSelect,6,'userSelect');
        element(by.id('currency')).click().then(function(){
            browser.sleep(2000);
            element(by.css('[value="Dollar"]')).click();
            logger.log('info', 'doller is successfully selected.');
        });
        var Process =  element(by.buttonText('Process'));
        buttonClick(Process,'Process');
        var alert = browser.switchTo().alert();
        alert.getText();
        logger.log('info','Accounnt created successfully.');
        alert.accept();
    });    

    it('TC4_oppenAccountForPound',function(){
        logger.log('info', 'TC4_oppenAccountForPound is started.');
        var manager= element(by.buttonText('Bank Manager Login'));
        buttonClick(manager,'Manager login button');
        var OpenAccount =  element(by.buttonText('Open Account'));
        buttonClick(OpenAccount,'Open Account');
        var userSelect= element(by.id('userSelect'));
        select(userSelect,6,'userSelect');
        element(by.id('currency')).click().then(function(){
            browser.sleep(2000);
            element(by.css('[value="Pound"]')).click();
            logger.log('info', 'doller is successfully selected.');
        });
        var Process =  element(by.buttonText('Process'));
        buttonClick(Process,'Process');
        var alert = browser.switchTo().alert();
        alert.getText();
        logger.log('info','Accounnt created successfully.');
        alert.accept();
    }); 

    it('TC5_oppenAccountForRupee',function(){
        logger.log('info', 'TC5_oppenAccountForRupee is started.');
        var manager= element(by.buttonText('Bank Manager Login'));
        buttonClick(manager,'Manager login button');
        var OpenAccount =  element(by.buttonText('Open Account'));
        buttonClick(OpenAccount,'Open Account');
        var userSelect= element(by.id('userSelect'));
        select(userSelect,6,'userSelect');
        element(by.id('currency')).click().then(function(){
            browser.sleep(2000);
            element(by.css('[value="Rupee"]')).click();
            logger.log('info', 'doller is successfully selected.');
        });
        var Process =  element(by.buttonText('Process'));
        buttonClick(Process,'Process');
        var alert = browser.switchTo().alert();
        alert.getText();
        logger.log('info','Accounnt created successfully.');
        alert.accept();
    }); 

    it('TC6_ToDeleteCustomer',function(){
        logger.log('info', 'TC6_ToDeleteCustomer is started.');
        var manager= element(by.buttonText('Bank Manager Login'));
        buttonClick(manager,'Manager login button');
        var Customers =  element(by.buttonText('Customers'));
        buttonClick(Customers,'Customers button');
        var searchCustomer =  element(by.model('searchCustomer'));
        inputData(searchCustomer,'abc','Name');
        var Delete =  element(by.buttonText('Delete'));
        buttonClick(Customers,'Delete button');
        logger.log('info','Accounnt deleted successfully.');
    });    

});    