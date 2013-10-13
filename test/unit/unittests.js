"use strict";

describe('lafs-wapi', function () {
  it('should be a window binding', function () {
    expect(window.lafswapi).toBeDefined();
  });

  describe('Client', function () {
    it('should be callable with a webapi URL', function () {
      var url = 'https://public.wapi.example.com/lafs-v42.59/';
      var client = lafswapi.Client(url);
      expect(client).toBeDefined();
      expect(client.url).toBe(url);
    });

    it('should be callable with a webapi URL and an XMLHttpRequest provider', function () {
      var url = 'https://public.wapi.example.com/lafs-v42.59/';
      var mockxhr = jasmine.Spy('XMLHttpRequest');
      var client = lafswapi.Client(url, mockxhr);
      expect(client).toBeDefined();
      expect(client.url).toBe(url);
    });

    describe('.get() method', function () {
      it('should translate to an XMLHttpRequest request', function () {
        var baseurl = 'https://public.wapi.example.com/lafs-v42.59/';
        var cap = 'URI:FAKE_TEST_CAP:A';
        var mockxhr = jasmine.createSpyObj(
          'XMLHttpRequest',
          ['open',
           'send']);

        var onreadystatechangevalue = undefined;
        Object.defineProperty(
          mockxhr, 'onreadystatechangevalue',
          {
            // FIXME: Use proper jasmine api for failure in get:
            get: function () { throw new Error('Unexpected behavior.') },

            set: function (v) {
              expect(onreadystatechangevalue).not.toBeDefined();
              onreadystatechangevalue = v;
            },
          });

        var client = lafswapi.Client(baseurl, mockxhr);
        client.get(cap, function (_) {});

        expect(onreadystatechangevalue).toBeDefined();

        var expectedurl = baseurl + '/uri/' + encodeURIComponent(cap);
        expect(mockxhr.open).toHaveBeenCalledWith('GET', expectedurl);
        expect(mockxhr.send).toHaveBeenCalledWith();
      });
    });
  });
});
