var router	= require('express').Router();
var AV      = require('../cloud/av.js');
var err 	= require('../cloud/error.js');
var crypto  = require('crypto');
var signKey = require('../config/config.js').signKey;


//查询
router.get('/',function(req,res){
	var u77Id = parseInt(req.query.u77Id);
	var tid = parseInt(req.query.tid);

	var sign = req.query.sign;

	if(sign == crypto.createHash('md5').update(u77Id+''+tid+signKey,'utf-8').digest('hex')){
		var Post = global.Post;
		var queryPost = new AV.Query(Post);
		queryPost.equalTo('u77Id',u77Id);
		queryPost.equalTo('tid',tid);

		queryPost.first().then(function(post){
			if(post){
				post.set('status',0);
				res.json(post);
			}else{
				post = {
					status:0
				}
				res.json(post);
			}
		});
	}else{
		var err={
			msg : 'sign错误，获取失败'
		}
		res.json(err);
	}

});


router.post('/save',function(req,res){

	var u77Id = parseInt(req.body.u77Id);
	var tid = parseInt(req.body.tid);
	var title = req.body.title;
	var content = req.body.content;
	var sign = req.body.sign;

	if(sign == crypto.createHash('md5').update(u77Id+''+tid+signKey,'utf-8').digest('hex')){

		var Post = global.Post;
		var queryPost = new AV.Query(Post);
		queryPost.equalTo('u77Id',u77Id);
		queryPost.equalTo('tid',tid);

		queryPost.first().then(function(post){
			if(!post){
				post = new Post();
			}
			post.set('u77Id',u77Id);
			post.set('tid',tid);
			post.set('title',title);
			post.set('content',content);

			post.save().then(function(result){
				result.msg = '保存成功';
				result.status = 0;
				res.json(result);
			},function(err){
				err.msg = '保存失败';
				err.status = 100;
				res.json(err);
			});
		});
	}else{
		var err={
			msg : 'sign错误，保存失败'
		}
		res.json(err);
	}

});


module.exports = router;