var RuleMatcher = function(rules){
    var lastRequestId;

    this.rules = rules;

    this.redirectOnMatch = function(request){
        var rule = _.find(rules, function(rule){ 
            return rule.isActive 
            && request.url.indexOf(rule.site) > -1 
            && request.requestId !== lastRequestId; 
        });

        if(rule){
            lastRequestId = request.requestId;
            var result = request.url;
            if (request.url.match(".*\\.(ppt|pptx|pptm)$"))
            {
                result = "ms-powerpoint:ofv|u|" + result;
            }
            else if (request.url.match(".*\\.(doc|docx)$"))
            {
                result = "ms-word:ofv|u|" + result;
            }
            else if (request.url.match(".*\\.(xls|xlsx)$"))
            {
                result = "ms-excel:ofv|u|" + result;
            }
            return {
                 redirectUrl : result
            };
        }
    };
};