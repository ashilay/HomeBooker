
(function($) {  
    
    $(window).load(function() {   
        
        var enterChat = $('#enterChat'),
            scrollableContent = $('.scrollableContent'),
            email = $('#emailField input'),
            sendButton = $('.sendButton'),
            addAttachment = $('.addAttachment a'),
            addFile = $('.addFile'),
            textArea = $('#textArea'),
            isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
        
        function viewModel() {
            var self = this;

            self.charges = ko.observableArray([]); 
            self.commonCharges = ko.observableArray([]);
            
            self.chargeName = ko.observable('');
            self.cost = ko.observable('');
            self.type = ko.observable('');
            
            self.chargeOptions = ko.observableArray ([
                {"text": "товары для дома", value: "товары для дома"},
                {"text": "продукты", value: "продукты"},
                {"text": "отдых", value: "отдых"},
                {"text": "мобильный", value: "мобильный"},
                {"text": "налоги", value: "налоги"}
            ]);
            
            self.addCharge = function () {
                var newCharge = new Charge(self.type(), self.cost());
                self.charges.push(newCharge);
            };
            
            self.recalculateCommonCost = function () {
                ko.utils.arrayForEach(self.chargeOptions(), function (item) {
                    var type = item.text,
                        common;
                    
                });
            };
    }
    
    ko.applyBindings(new viewModel());        
    
    
    function Charge (type, count) {
        this.type = type;
        this.count = count;
        this.date = moment(new Date()).format('DD MMM YYYY : HH mm');
    };
            
    scrollableContent.mCustomScrollbar({
        scrollInertia:0
    });
    
    if (isMobile) {
        scrollableContent.mCustomScrollbarMobile({
            scrollInertia:0
        });
    }
    
    function updateScroll () {
        scrollableContent.mCustomScrollbar("update");
        scrollableContent.mCustomScrollbar("scrollTo","bottom");
        if (isMobile) {
            crollableContent.mCustomScrollbarMobile("update");
        }
    };
    
    
    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
      
    })
})(jQuery);

