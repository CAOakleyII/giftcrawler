var util = require('util'),
	fs = require('fs'),
    amazonHelper = require('./amazonHelper')




var searchParams = {
  'SearchIndex': 'Toys',
  'Keywords': 'rocket',
  'ResponseGroup': 'ItemAttributes'
}


var amazonBrowseNodeIds = {
    'Comedy': 1036592,
    'Jewelry': 3367581,
    'Literature & Fiction': 17
}

var amazon = new amazonHelper();

/* commented out for testing
amazon.ItemSearch(searchParams, function(err, results){
    fs.writeFile('data/test2.json', JSON.stringify(results, null, 4), function(err){
        if(err){
            console.log(err);
            return;
        }


        console.log('data file created');
    });
});*/


var browseNodeParams = {
    'BrowseNodeId': amazonBrowseNodeIds['Literature & Fiction']
}


amazon.BrowseNodeId(browseNodeParams, function(err, results){
    fs.writeFile('data/node1.json', JSON.stringify(results, null, 4), function(err){
        if(err){
            console.log(err);
            return;
        }

        console.log('data file created');

    });
});

