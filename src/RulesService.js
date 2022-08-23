var LocalRulesService = function (){
		this.get = function(){
			var storedRules = localStorage['rules'];

			console.warn("Local storage rules = " + storedRules);

			//Preparing to migrate to chrome.storage.local
			chrome.storage.local.set({'rules': storedRules}, function() {});

			if(!storedRules){
				return [];
			}

			return JSON.parse(storedRules);
		};
		this.set = function(rules){
			var rulesToStore = JSON.stringify(rules);
			localStorage['rules'] = rulesToStore;

			//Preparing to migrate to chrome.storage.local
			chrome.storage.local.set({'rules': rulesToStore}, function() {});
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