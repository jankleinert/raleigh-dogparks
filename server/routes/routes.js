const express = require('express');
const request = require('request');
const cloudinary = require('cloudinary');

const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET 
});

router.get('/', function(req, res) {
  res.render('index')
});

router.get('/getMarkers', function(req, res) {
	request.get('https://services1.arcgis.com/a7CWfuGP5ZnLYE7I/arcgis/rest/services/Wake_Parks_Public/FeatureServer/0/query?where=DOGPARK=%27Yes%27&outFields=OBJECTID,NAME,ALIAS1,ALIAS2,ADDRESS,Address2,URL,PHONE,DOGPARK,Lat,Lon,Notes,ObjectID_1,GlobalID&outSR=4326&f=json', (error, response, body) => {
		if (error) {
			res.send(error);
		} else {
			var data = JSON.parse(body);
			res.send(data);
		}
	});
});

router.route('/insertImage')
.post(function(req, res) {
	cloudinary.v2.uploader.upload(req.body.fileData, {tags: req.body.parkId}, function(error, result){
		res.send(result.secure_url);
	});
});

router.get('/getImages',function(req, res) {
	var id = req.query.id;
	var imageUrls = [];

	cloudinary.v2.api.resources_by_tag(id, function(error, result) {
		if (error) {
			res.send(error);
		} else {
			for (var i = 0; i < result.resources.length; i++) {
				imageUrls.push(result.resources[i].secure_url);
			}
			res.send(imageUrls.slice());
		}
	});
});

module.exports = router;
