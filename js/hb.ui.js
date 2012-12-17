/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(hb, window, $) {  
    
    $(window).load(function() {
        
        // init tabs
        (function() {
            $( "#tabs" ).tabs();
        })();
        
        //init progress bar
        
        
        hb.updateProgressBar = function() {
            console.log(0);
            console.log(hb);
            console.log(hb.vm.calcProgressBarVal());
            $( "#progressbar" ).progressbar({
                value: hb.vm.calcProgressBarVal()
            });
        };
        
        hb.updateProgressBar();
    
    });
    
})(window.hb = window.hb || {}, window, jQuery);
