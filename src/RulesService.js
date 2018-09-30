var LocalRulesService = function (){
		this.get = function(){
			var storedRules = localStorage['rules'];

			if(!storedRules){
				return [];
			}

			return JSON.parse(storedRules);
		};
		this.set = function(rules){
			localStorage['rules'] = JSON.stringify(rules);
		};
};

var SyncedRulesService = function(){
	this.get = function(){
		var rules = [];
		chrome.storage.sync.get('rules', function(item){
			rules = item.rules;
		});

		return rules;
	};
	this.set = function(rules){
		chrome.storage.sync.set({'rules': rules});
	};
}

var RulesServiceFactory = {
getRulesService: function(){
	return new LocalRulesService();
}
};