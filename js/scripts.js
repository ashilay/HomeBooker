
(function(hb, window, $) {  
    
    $(window).load(function() {   
        
        var storage = window.localStorage,
            scrollableContent = $('#scrollableContent'),
            isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/),
            parsedCharges;
        
        function viewModel() {
            var self = this;

            self.charges = ko.observableArray([]); 
            self.commonCharges = ko.observableArray([]);
            
            self.chargeName = ko.observable('');
            
            self.cost = ko.observable(0);
            
            self.type = ko.observable('none');
            
            self.grandTotal = ko.observable(0);
            
            self.chargePerMonth = ko.observable(0);
            
            self.newChargeType = ko.observable(''),
            
            self.chargeList = ko.observableArray ([]);
            
            self.getChargeList = function() {
                if (!storage.chargeList) {
                    charges= [
                        {"text": "товары для дома", value: "товары для дома"},
                        {"text": "продукты", value: "продукты"},
                        {"text": "отдых", value: "отдых"},
                        {"text": "мобильный", value: "мобильный"},
                        {"text": "налоги", value: "налоги"}
                    ];

                    storage.chargeList = JSON.stringify(charges);
                    storage.chargeList = JSON.stringify(charges);
                } else {
                    b = JSON.parse(storage.chargeList);
                    parsedCharges = b;
                    for (var i = 0; i < b.length; i++) {
                        self.chargeList.push(b[i]);
                    }
                }
            };         
            
            self.addNewChargeType = function() {
                var newCh = new chargeType(self.newChargeType());
                self.chargeList.push(newCh);
                parsedCharges[parsedCharges.length] = newCh;
                storage.chargeList = JSON.stringify(parsedCharges);
            };
            
            self.getCharges = function() {
                console.log(storage);                       
                if (!storage.charges) {
                    storage.charges = '[]';
                } else {
                    self.charges(JSON.parse(storage.charges));
                }
                console.log(storage);
                console.log(ko.toJSON(self.charges()));
            };
            
            self.addCharge = function () {
                
                if (!self.type() || !self.cost()) {
                    return;
                }
                
                var storageCharges = JSON.parse(storage.charges);
                
                var newCharge = new Charge(self.type(), self.cost());
                
                self.charges.push(newCharge);
                
                storageCharges[storageCharges.length] = newCharge;
                storage.charges = JSON.stringify(storageCharges);
                
                self.updateGrandTotal();
                
                hb.updateProgressBar();
                
            };
            
            // custom binding - calculate total cost per charge type
            ko.bindingHandlers.totalCostPerType = {
                update: function (element, valueAccessor) {
                    var total = 0,
                        type = valueAccessor();
                    
                    
                    ko.utils.arrayForEach(self.charges(), function(item) {
                        if (item.type == type) {
                            total += parseInt(item.count);
                        }
                    })
                    $(element).text(total);
                    
                    
                    
                }
            };
            //
            
            // update general summ for all types
            self.updateGrandTotal = function() {
                var grTotal = 0,
                    storageCharges = JSON.parse(storage.charges),
                    chLength;
                
                chLength = storageCharges.length;
                
                for (var i = 0; i < chLength; i++) {
                    grTotal += parseInt(storageCharges[i].count);
                }
                    
                self.grandTotal(grTotal);
            };
            //
            
            self.setChargePerMonth = function() {
                storage.monthlyCost = self.chargePerMonth();
                self.getMonthlyCost();
                
                hb.updateProgressBar();
            };
            
            self.getMonthlyCost = function() {
                if (storage.monthlyCost) {
                    self.chargePerMonth(storage.monthlyCost);
                } 
            };
            
            self.calcProgressBarVal = ko.computed(function() {
                var val = (self.grandTotal()/self.chargePerMonth())*100;
                return val;
            });
            
    }
    
    
    hb.vm = new viewModel();
    hb.vm.getChargeList();
    hb.vm.getCharges();
    hb.vm.getMonthlyCost();
    hb.vm.updateGrandTotal();
    ko.applyBindings(hb.vm);        

    
    function Charge (type, count) {
        this.type = type;
        this.count = count;
        this.date = moment(new Date()).format('DD MMM YYYY : HH mm');
    };
    
    function chargeType (type) {
        this.text = type;
        this.value = type;
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
})(window.hb = window.hb || {}, window, jQuery);

