var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');


var relatedCategories = new Array();
relatedCategories["Men's"] = new Array ("Men", "Him", "Boyfriend", "Husband", "Man");
relatedCategories["Women's"] = new Array ("Women", "Her", "Girlfriend", "Wife", "Woman");
relatedCategories["Kids"] = new Array("Kids", "Kid", "Children", "Son", "Daughter");
relatedCategories["Pets"] = new Array("Pets", "Dogs", "Kittens", "Cats", "Puppies" );
relatedCategories["Home"] = new Array("Home", "House");
relatedCategories["Gadgets"] = new Array("Techie", "Geeks", "GadetLovers", "Engineers");
relatedCategories["Art"] = new Array("Artist", "Artsy");
relatedCategories["Food"] = new Array("Foodies", "FoodExperts");
relatedCategories["Media"] = new Array("Hipsters", "Teens", "YoungAdults", "Her", "Girlfriend");
relatedCategories["Architecture"] = new Array("Engineers", "Artist", "Artsy");
relatedCategories["Sports & Outdoors"] = new Array("SportsLover", "SportsFan", "Sports", "Men", "Boyfriend");
relatedCategories["Travel & Destinations"] = new Array("Travelers", "Nomads", "Explorers");
relatedCategories["DIY & Crafts"] = new Array("DIY", "Crafters", "Artist", "Women");
relatedCategories["Workspace"] = new Array("Workmate", "Boss", "Employee")
relatedCategories["Cars & Vehicles"] = new Array("CarEnthusiast", "Men", "Boyfriend", "Him");

var fancyCrawler = new Crawler({
	maxConnections : 10,
	// this will be called for each crawled page
	callback : function (error, result, $){
		// $ is Cheerio by default
		// a lean implementation of core jquery designed specifically for the server
		
		// add each category to the queue
		if(result.uri == 'http://fancy.com/shop')
		{
			$('.browse-shop a').each(function(index, a){
				var toQueueUrl = $(a).attr('href');
				toQueueUrl = "http://fancy.com" + toQueueUrl
				console.log(toQueueUrl);
				fancyCrawler.queue(toQueueUrl);
			})
		}

		if($('.breadcrumbs').attr("data-category") != undefined && $('.breadcrumbs').attr("data-category") != "Other,"){
			var tag = $('.breadcrumbs').attr("data-category");
			
			console.log(tag);
			tag = tag.replace(',', '');
			var tags = "";
			for(var i = 0; i < relatedCategories[tag].length; i++){
				tags += "#" + relatedCategories[tag][i] + " ";
			}

			var data =""

			$('.figure-item').each(function()
			{ 
				var imgUrl = $(this).children('figure').css('background-image');
				imgUrl = imgUrl.replace('url(', '').replace(')', '');
				var directLink = $(this).children('figcaption').children('.title').attr('href');
				var title = $(this).children('figcaption').children('.title').text();
				var price = $(this).children('figcaption').children('.price').text();
				var itemsTags = tags;

				data += "\r\n" + title + ";" + price + ";" + imgUrl + ";" + directLink + ";" + itemsTags;

			});

			fs.appendFile('data.txt', data, function(err){ console.log(err); });
		}
	}
});



fancyCrawler.queue('http://fancy.com/shop')
