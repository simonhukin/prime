var prime = require('../src/js/prime');

console.log(prime);

describe("Prime validation", function() {

  it("should validate a prime number", function(){
    var result = prime.isPrime( 3 );
    expect(result).toBe( true );
  });

  it("should not validate as a prime number", function(){
    var result = prime.isPrime( 4 );
    expect(result).not.toBe( true );
  });
});
