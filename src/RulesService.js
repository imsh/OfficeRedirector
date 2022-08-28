var LocalRulesService = function (){
		this.get = async function(){
			var storedRules = await readLocalStorage('rules');

			console.warn("Local storage rules = " + storedRules);

			if(storedRules === undefined){
				return [];
			}

			return JSON.parse(storedRules);
		};

		this.set = async function(rules){
			var rulesToStore = JSON.stringify(rules);
			await writeLocalStorage({'rules': rulesToStore});
		};
};

const readLocalStorage = async (key) => {
    return new Promise((resolve, _) => {
      chrome.storage.local.get([key], function (result) {
        resolve(result[key]);
      });
    });
};

const writeLocalStorage = async (value) => {
    return new Promise((resolve, _) => {
      chrome.storage.local.set(value, function () {
        resolve();
      });
    });
};

var RulesServiceFactory = {
getRulesService: function(){
	return new LocalRulesService();
}
};