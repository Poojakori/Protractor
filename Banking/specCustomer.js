//import { element, by } from "protractor";
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
        var options = element.all(by.tagName('option')).then(function(options){
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

    it('TC1_login',function(){
        logger.log('info', 'TC1_login is started.');
        var homeBtn =  element(by.buttonText('Home'));
        checkPresence(homeBtn,'Home button');  
    });

    it('TC2_verifyCurrencyType',function(){
        logger.log('info', 'TC2_verifyCurrencyType is started.');
        var customerLogin= element(by.buttonText('Customer Login')); 
        buttonClick(customerLogin,'Customer Login button');
        var yourName =element(by.model('custId'));
        select(yourName,2,'Name');
        var Login= element(by.buttonText('Login')); 
        buttonClick(Login,'Login button');
        var acNum =  element(by.model('accountNo'));
        checkPresence(acNum,'Account number');  
    });

    it('TC3_InitialTraction',function(){
        logger.log('info', 'TC3_InitialTraction is started.');
        loginTo1006();
        var Transactions= element(by.buttonText('Transactions')); 
        buttonClick(Transactions,'Transactions button'); 
        
    });

    it('TC4_DepositMoney',function(){
        logger.log('info', 'TC4_DepositMoney is started.');
        loginTo1006();
        var Deposit= element(by.css('[ng-click="deposit()"]')); 
        buttonClick(Deposit,'Deposit button'); 
        var amt= element(by.model('amount')); 
        inputData(amt,data.TC4.amt,"Amount "); 
        var deposit1= element(by.css('[type="submit"]')); 
        buttonClick(deposit1,'Deposit button'); 
        var successfulMsg= element(by.tagName('span'));
        checkPresence(successfulMsg,"Deposited successfully message "); 
    });

    it('TC5_TransationAfterDeposit',function(){
        logger.log('info', 'TC5_TransationAfterDeposit is started.');
        loginTo1006();
        var Transactions= element(by.buttonText('Transactions')); 
        buttonClick(Transactions,'Transactions button'); 
        var amt =element(by.repeater("tx in transactions | orderBy:sortType:sortReverse | sDate:startDate:end"))
        .element(by.css("td:nth-child(2)")).getText().then(function(text)
        {
            check(text,data.TC5.amt,'amount column data 2000 ');
           
        });
        var cr =element(by.repeater("tx in transactions | orderBy:sortType:sortReverse | sDate:startDate:end"))
        .element(by.css("td:nth-child(3)")).getText().then(function(text)
        {
            check(text,data.TC5.transaction,'Transaction type column data is Creadit. Pass');
            
        });
    });

    it('TC6_withDrawError',function(){
        logger.log('info', 'TC6_withDrawError is started.');
        loginTo1006();
        var Withdrawl= element(by.buttonText('Withdrawl')); 
        buttonClick(Withdrawl,'Withdrawl button'); 
        var amt= element(by.model('amount')); 
        inputData(amt,data.TC6.amt,"Amount ");
        var deposit1= element(by.css('[type="submit"]')); 
        buttonClick(deposit1,'Deposit button'); 
        var error= element(by.css('[ng-show="message"]')).getText().then(function(text){
            //console.log(text);
            var actError='Transaction Failed. You can not withdraw amount more than the balance.';
            check(text,actError,'Transaction Failed. You can not withdraw amount more than the balance. ');
             
        });
    });

    it('TC7_withDrawSuccess',function(){
        logger.log('info', 'TC7_withDrawSuccess is started.');
        loginTo1006();
        var Withdrawl= element(by.buttonText('Withdrawl')); 
        buttonClick(Withdrawl,'Withdrawl button'); 
        var amt= element(by.model('amount')); 
        inputData(amt,data.TC7.amt,"Amount ");
        var deposit1= element(by.css('[type="submit"]')); 
        buttonClick(deposit1,'Deposit button'); 
        element(by.css('[ng-show="message"]')).getText().then(function(text){
            //console.log(text);
            var actMsg='Transaction successful';   
            check(text,actMsg,'Transaction successful');         
                
        });
    });

    it('TC8_TransationAfterWithdrowel',function(){
        logger.log('info', 'TC8_TransationAfterWithdrowel is started.');
        loginTo1006();
        var Transactions= element(by.buttonText('Transactions')); 
        buttonClick(Transactions,'Transactions button'); 
        
        element(by.id("anchor1")).element(by.css("td:nth-child(2)")).getText().then(function(text)
        {
            check(text,data.TC8.amt,'1000');
                       
        });
    });

    it('TC9_TransationReset',function(){
        logger.log('info', 'TC9_TransationReset is started.');
        loginTo1006();
        var Transactions= element(by.buttonText('Transactions')); 
        buttonClick(Transactions,'Transactions button'); 
        var Reset= element(by.buttonText('Reset')); 
        buttonClick(Reset,'Reset button'); 
              
    });

    it('TC10_logOut',function(){
        logger.log('info', 'TC10_logOut is started.');
        loginTo1006();
        var Logout= element(by.buttonText('Logout'));
        buttonClick(Logout,'Logout button'); 
         
    });

});

