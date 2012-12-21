/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function(hb, $) {  
    
    hb.runTests = function() {
        console.log('test start');
        
        test( "a basic test example", function() {
            console.log('test');
            var value = "hello";
            equal( value, "hell", "We expect value to be hello" );
        });
        
        test( "add new charge", function() {
            var lengthBefore = hb.vm.charges().length;
            console.log(lengthBefore);
            
            hb.vm.type('test type');
            
            ok(hb.vm.type(),'type exists')
            
            hb.vm.cost('test cost');
            
            ok(hb.vm.cost(),'cost exists')
            
            hb.vm.addCharge();

            var lengthAfter = hb.vm.charges().length;
            
            console.log(lengthAfter);
            
            equal( lengthBefore, lengthAfter - 1, "new charge was added" );
        });
    };
    
    $(window).load(function() {
        
        hb.runTests();
    
    });
    
})(window.hb = window.hb || {}, jQuery);