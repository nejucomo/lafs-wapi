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

        // Some test input data:
        var baseurl = 'https://public.wapi.example.com/lafs-v42.59/';
        var cap = 'URI:FAKE_TEST_CAP:A';

        // Set up a mock for the non-callback-related parts of XMLHttpRequest usage:
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

        // Expectations:
        expect(mockxhr.addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));
        /* Note: If mockxhr.addEventListener was called, we have captured
         * the internal callback, which is tested below.
         */

        var expectedurl = baseurl + '/uri/' + encodeURIComponent(cap);
        expect(mockxhr.open).toHaveBeenCalledWith('GET', expectedurl, true);
        expect(mockxhr.send).toHaveBeenCalledWith();

        /* Because mockxhr.addEventListener was called, and the spy
         * delegated to our local capturing function, our capturedlistener
         * now points to the internal callback used inside the Client
         * abstraction.  We now trigger this callback to simulate a real
         * XMLHttpRequest responding with an HTTP response body.
         */
        capturedlistener();

        /* And the internal Client callback should pass the result to
         * the application code:
         */
        expect(mockcb).toHaveBeenCalledWith(mockxhr.responseText);
      });
    });
  });
});
