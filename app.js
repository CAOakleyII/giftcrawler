var util = require('util'),
	fs = require('fs'),
    OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId: 'AKIAIMAGTN3CTUWDPEKQ',
    awsSecret: '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',
    assocId:   'gifox-20'
});


var searchParams = {
  'SearchIndex': 'Toys',
  'Keywords': 'gamers',
  'ResponseGroup': 'ItemAttributes,Offers'
}

opHelper.execute('ItemSearch', searchParams, function(err, results, xml) {
    if(err){
    	console.log('Error during the request.');
    	console.log(err);
    	return;
    }

    if(!results.ItemSearchResponse){
    	// probably and error
    	console.log('Error');
    }


    var items = results.ItemSearchResponse.Items[0].Item;

    fs.writeFile('data/test2.json', JSON.stringify(items, null, 4), function(err){
    	if(err){
    		console.log(err);
    		return;
    	}

    	console.log('data file created');
    });
});
