(function() {
  'use strict';

  var itemService = require('../../server/services/item.service');
  var awsLib = require('aws-lib');
  var awsMock = require('../../mocks/services/aws-lib');

  describe('aws item service', function() {
    var service;
    var clientMock;

    beforeEach(function() {
      clientMock = function(){
        return {};
      };
      spyOn(awsLib, 'createProdAdvClient')
        .andCallFake(clientMock);
      service = itemService.init(awsLib);
    });

    it('should init product client', function(){
      expect(service).not.toBeNull();
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
      awsLib.createProdAdvClient.andCallFake(function(){});
      //ACT
      service.search('All', 'iphone', '3');
      //ASSERT
      expect(awsLib.call).toHaveBeenCalledWith('ItemSearch', {
        SearchIndex: 'All',
        Keywords: 'iphone',
        ItemPage: '3'
      }, jasmine.any(Function));
    });
  });
})();
