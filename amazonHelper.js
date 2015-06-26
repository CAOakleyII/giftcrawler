module.exports = AmazonHelper

OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId: 'nottelling',
    awsSecret: 'noneya',
    assocId:   'nope'
});

function AmazonHelper(){

}

AmazonHelper.prototype.ItemSearch = function(searchParams, next){
	opHelper.execute('ItemSearch', searchParams, function(err, results, xml) {
	    if(err){
	    	console.log('Error during the request.');
	    	console.log(err);
	    	return next(err);
	    }

	    if(!results.ItemSearchResponse){
	    	// probably and error
	    	console.log('Error');
			return next(err);
	    }


	    var items = results.ItemSearchResponse.Items[0].Item;
	    return next(null, items);
	});
}

AmazonHelper.prototype.BrowseNodeId = function(searchParams, next){
	opHelper.execute('BrowseNodeLookup', searchParams, function(err, results, xml) {
	    if(err){
	    	console.log('Error during the request.');
	    	return next(err);
	    }

	    if(!results.BrowseNodeLookupResponse){
	    	// probably and error
	    	console.log('Error');
	    	return next(err);
	    }

	    console.log(xml);
	    var items = results.BrowseNodeLookupResponse.BrowseNodes[0].BrowseNode

	    return next(null, items);
	    console.dir(items);
	    
	});
}