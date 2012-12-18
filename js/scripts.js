
(function(hb, window, $) {  
    
    
        
        var storage = window.localStorage,
            isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/),
            scrollableContent,
            parsedCharges;
        
        function viewModel() {
            var self = this;

            self.charges = ko.observableArray([]); 
            self.commonCharges = ko.observableArray([]);
            self.chargeName = ko.observable('');
            self.cost = ko.observable(0);
            self.chargeDescr = ko.observable('');
            self.type = ko.observable('none');
            self.grandTotal = ko.observable(0);
            self.chargePerMonth = ko.observable(0);            
            self.newChargeType = ko.observable('');            
            self.cashLeft = ko.observable('');            
            self.chargeList = ko.observableArray ([]);    
            
            self.getChargeList = function() {               
                // if first loading, create default charge types
                if (!storage.chargeList) {
                    charges= [
                        {"text": "товары для дома", value: "товары для дома"},
                        {"text": "продукты", value: "продукты"},
                        {"text": "отдых", value: "отдых"},
                        {"text": "мобильный", value: "мобильный"},
                        {"text": "налоги", value: "налоги"}
                    ];

                    storage.chargeList = JSON.stringify(charges);
                    self.chargeList(charges);
                } else {
                    
                    // use existing charge types if already exist in storage
                    b = JSON.parse(storage.chargeList);
                    parsedCharges = b;
                    for (var i = 0; i < b.length; i++) {
                        self.chargeList.push(b[i]);
                    }
                }
            };         
            
            // add new type for charges
            self.addNewChargeType = function() {
                var newCh = new chargeType(self.newChargeType());
                self.chargeList.push(newCh);
                parsedCharges[parsedCharges.length] = newCh;
                storage.chargeList = JSON.stringify(parsedCharges);
            };
            //
            
            // ger all charges from storage
            self.getCharges = function() {                   
                if (!storage.charges) {
                    storage.charges = '[]';
                } else {
                    self.charges(JSON.parse(storage.charges));
                }
            };
            //
            
            // add new charge
            self.addCharge = function () { 
                if (!self.type() || !self.cost()) {
                    return;
                }
                
                var storageCharges = JSON.parse(storage.charges);
                
                var newCharge = new Charge(self.type(), self.cost(), self.chargeDescr());
                
                self.charges.push(newCharge);
                
                storageCharges[storageCharges.length] = newCharge;
                storage.charges = JSON.stringify(storageCharges);
                
                self.updateGrandTotal();
                
                hb.updateProgressBar();
                self.calcLeftCash();
                updateScroll();
            };
            //
            
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
            
            // set planned charge summ for month
            self.setChargePerMonth = function() {
                storage.monthlyCost = self.chargePerMonth();
                self.getMonthlyCost();
                
                hb.updateProgressBar();
                self.calcLeftCash();
            };
            //
            
            // get planned monthly charge from storage
            self.getMonthlyCost = function() {
                if (storage.monthlyCost) {
                    self.chargePerMonth(storage.monthlyCost);
                } 
            };
            //
            
            // calculate montly charge in % for progress bar
            self.calcProgressBarVal = ko.computed(function() {
                var val = (self.grandTotal()/self.chargePerMonth())*100;
                return val;
            });
            //
            
            // calculate left money to charge
            self.calcLeftCash = ko.computed(function() {
                var val = self.chargePerMonth() - self.grandTotal();
                self.cashLeft(val);
            });
            //
    }
    
    //
    $(window).load(function() {   
    
        hb.vm = new viewModel();
        hb.vm.getChargeList();
        hb.vm.getCharges();
        hb.vm.getMonthlyCost();
        hb.vm.updateGrandTotal();
        ko.applyBindings(hb.vm);        
        
        initScrollableContent();
    })
    //
    
    function Charge (type, count, descr) {
        this.type = type;
        this.count = count;
        this.descr = descr;
        this.date = moment(new Date()).format('DD MMM YYYY : HH mm');
    };
    
    function chargeType (type) {
        this.text = type;
        this.value = type;
    };
            
    function initScrollableContent() {
        scrollableContent = $('.scrollableContent');
        scrollableContent.mCustomScrollbar({
            scrollInertia:0
        });
    };
    
    function updateScrollToTop () {
        scrollableContent.mCustomScrollbar("update");
        scrollableContent.mCustomScrollbar("scrollTo","bottom");
    };
    
    function updateScroll () {
        scrollableContent.mCustomScrollbar("update");
    };
         
    
})(window.hb = window.hb || {}, window, jQuery);

