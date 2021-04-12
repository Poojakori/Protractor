//import { browser } from "protractor";

describe('Angularjs HomePage', function(){
    it('should greet the named user',function(){
        browser.get("https://angularjs.org/");
        browser.sleep(2000);
    });
});