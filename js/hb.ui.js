/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(hb, window, $) {  
    
    hb.updateProgressBar = function() {
        $( "#progressbar" ).progressbar({
            value: hb.vm.calcProgressBarVal()
        });
    };
        
        
    $(window).load(function() {
        
        // init tabs
        (function() {
            $( "#tabs" ).tabs();
        })();
        
        //init progress bar
        hb.updateProgressBar();
    
    });
    
})(window.hb = window.hb || {}, window, jQuery);
