angular.module('officeredirector')
.controller('RulesController', ['$scope', 'RulesService', function($scope, rulesService) {
	$scope.isEditing = false;

	rulesService.get().then(function(rules) {
		console.warn('In init getting rules = ' + rules);
		$scope.rules = rules;
	});

	$scope.add = function() {
		$scope.rules.push({
			site: $scope.site,
			isActive: true
		});

		$scope.site = '';
	};

	$scope.remove = function(index) {
		$scope.rules.splice(index,1);
	};

	$scope.clear = function() {
		$scope.rules = [];
	};

	$scope.enableEditing = function() {
		$scope.isEditing = true;
	};

	$scope.disableEditing = function() {
		$scope.isEditing = false;
	};

	$scope.shortenText = function (text){
		var maxLength = 25;
		if(text && text.length > maxLength){
			text = text.substring(0,maxLength) + "...";
		}

		return text;
	};

	$scope.$watch('rules', async function(newValue, oldValue){
		console.warn('Setting rules to value = ' + newValue);
		await rulesService.set(newValue);
	}, true);
}]);