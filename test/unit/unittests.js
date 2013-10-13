describe('lafs-wapi', function () {
  it('should be a window binding', function () {
    expect(window.lafswapi).toBeDefined();
  });

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
});
