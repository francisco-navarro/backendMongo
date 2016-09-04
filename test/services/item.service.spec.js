(function() {
  'use strict';

  var itemService = require('../../server/services/item.service');
  var awsLib = require('aws-lib');
  var awsMock = require('../../mocks/services/aws-lib');

  describe('aws item service', function() {
    var clientMock = {
      call: jasmine.createSpy('call')
    };

    beforeEach(function() {
      spyOn(awsLib, 'createProdAdvClient')
        .andCallFake(function() {
          return clientMock;
        });
      itemService.init(awsLib);
    });

    it('should init product client', function() {
      expect(awsLib.createProdAdvClient).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.any(String),
        jasmine.any(String), {
          host: 'webservices.amazon.es',
          version: '2011-08-01'
        });
    });

    it('should return items', function() {
      //ARRANGE
      var actual;
      clientMock.call.andCallFake(function(operation, search, callback) {
        callback(null, awsMock.itemSearch);
      });
      //ACT
      itemService.search('All', 'iphone', '3', function(err, result) {
        actual = result;
      });
      //ASSERT
      var expected = {
        title: 'iPhone 6s Protector de Pantalla',
        price: 'EUR 1,84'
      };
      expect(clientMock.call).toHaveBeenCalledWith('ItemSearch', {
        SearchIndex: 'All',
        Keywords: 'iphone',
        ItemPage: '3'
      }, jasmine.any(Function));
      expect(actual.totalPages).toBe(5238);
      expect(actual.items.length).toBe(3);
      expect(actual.items[0]).toEqual(expected);
    });
  });
})();
