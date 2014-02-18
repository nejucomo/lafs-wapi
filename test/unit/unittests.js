"use strict";

describe('lafswapi', function () {
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

    describe('.get() method', function () {
      it('should translate to an XMLHttpRequest request', function () {
        var baseurl = 'https://public.wapi.example.com/lafs-v42.59/';
        var cap = 'URI:FAKE_TEST_CAP:A';

        var xhrobj = jasmine.createSpyObj('XMLHttpRequest instance', ['open', 'send']);

        /* TODO: Implement this level of sensitivity later:
        var onreadystatechangevalue = undefined;
        Object.defineProperty(
          xhrobj, 'onreadystatechangevalue',
          {
            // FIXME: Use proper jasmine api for failure in get:
            get: function () { throw new Error('Unexpected behavior.') },

            set: function (v) {
              expect(onreadystatechangevalue).not.toBeDefined();
              onreadystatechangevalue = v;
            },
          });
        */

        spyOn(window, 'XMLHttpRequest').andReturn(xhrobj);

        var client = lafswapi.Client(baseurl);
        client.get(cap, function (_) {});

        // expect(onreadystatechangevalue).toBeDefined();

        var expectedurl = baseurl + '/uri/' + encodeURIComponent(cap);
        expect(xhrobj.open).toHaveBeenCalledWith('GET', expectedurl);
        expect(xhrobj.send).toHaveBeenCalledWith();
      });
    });
  });
});
