var aws = require('aws-lib');
var itemService = require('./services/item.service.js');

itemService.init(aws);

itemService.search('All', 'iphone 6s 64gb', 3, function(err, result) {
  if (err) {
    console.error(err);
  } else  {
    console.log('Found ', result.TotalPages, ' pages');
    console.log('Found ', result.Item.length, ' items in this page');
    result.Item.forEach(function(item) {
      console.log(item.ItemAttributes.Title);
      if (item.OfferSummary.LowestNewPrice) {
        console.log('\t', item.OfferSummary.LowestNewPrice.FormattedPrice);
      }
    });
  }
});
