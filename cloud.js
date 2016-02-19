
var AV  = require('leanengine');

AV.Cloud.define('deleteOverTime', function(request, response) {
	global.Post = global.Post || AV.Object.extend('Post');
	var query = new AV.Query(global.Post);

	var myDate = new Date();
	var date = myDate.getDate();
	date = date - 30;
	myDate.setDate(date);

	query.lessThan('updatedAt',myDate);
	query.destroyAll().then(function(result){
    	response.success(result);
    },function(err){
        response.success(err);
    });
});