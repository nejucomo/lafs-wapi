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

        // Set up a mock for part of XMLHttpRequest usage:
        var mockxhr = jasmine.createSpyObj('XMLHttpRequest instance', ['open', 'send']);
        spyOn(window, 'XMLHttpRequest').andReturn(mockxhr);

        // Mock the callback-relevant parts of the API:
        var mockcb = jasmine.createSpy('Client.get callback');
        var capturedlistener = undefined;
        mockxhr.addEventListener = function (_, listener) {
          capturedlistener = listener;
        };

        spyOn(mockxhr, 'addEventListener').andCallThrough();

        var fakeresponse = {} // Just a singleton for comparison.
        mockxhr.responseText = fakeresponse;


        // Execute the code under test:
        var client = lafswapi.Client(baseurl);

        client.get(cap, mockcb);

        var expectedurl = baseurl + '/uri/' + encodeURIComponent(cap);
        expect(mockxhr.addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
        expect(mockxhr.open).toHaveBeenCalledWith('GET', expectedurl, true);
        expect(mockxhr.send).toHaveBeenCalledWith();

        /* Trigger our captured internal callback, which should
         * delegate to the application code's callback (our mockcb):
         */
        capturedlistener();
        expect(mockcb).toHaveBeenCalledWith(mockxhr.responseText);
      });
    });
  });
});
