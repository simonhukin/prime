var nPrimes;
var primes;
var bigPrime;

function init(){
  nPrimes = $("#nPrimeInput").val();
  $("#nPrimeInput").on("input", function() {
    nPrimes = this.value;
    console.log("nPrimes = " + nPrimes);
  });
}

function getPrimes(max){
  primes = [];
  for(var i = 2; primes.length < max; i++){
    if(isPrime(i)){
      primes.push(i);
      //console.log(i);
    }
  }
  if(primes.length > 0){
    return true;
  }
  else{
    return false;
  }
}

function setBigPrime(max){
  var primeCount = 0;
  for(var i = 2; primeCount < max; i++){
    if(isPrime(i)){
      bigPrime = i;
      primeCount ++;
      //console.log(bigPrime);
    }
  }
}

// A prime number (or a prime) is a natural number greater than 1 that has
// no positive divisors other than 1 and itself.

function isPrime(num) {
    if(num < 2) return false;
    for (var i = 2; i < num; i++) {
        if(num % i === 0)
            return false;
    }
    return true;
}

function showPrimes(){
  if(nPrimes < 50){
    if(getPrimes(nPrimes)){
      $('#prime_area').html(createPrimeTable());
    }
    else{
      alert("I think you will need to pick a bigger number...");
    }
  }
  else if(nPrimes < 100000){
    //handle larger dataset
    setBigPrime(nPrimes);
    $('#prime_area').html(showBigPrime());
  }
  else{
    $('#prime_area').html("You're gonna need a better computer before we attempt a number that big!");
  }
}

function createPrimeTable(){
  var s = "<table>";
  for (var v = 0; v < primes.length; v++){
    s += "<tr id=\"row_"+v+"\">";
    for(var h = 0; h < primes.length; h++){
      if(v === 0){
        s += "<th id=\"topRow_"+v+"_"+h+"\" class=\"prime\">"+primes[h]+"</th>";
      }
      else{
        if(h === 0){
          s += "<td id=\"leftCol_"+v+"_"+h+"\" class=\"prime\">"+primes[v]+"</td>";
        }
        else{
          s += "<td>"+primes[v]*primes[h]+"</td>";
        }
      }
    }
    s += "</tr>";
  }
  s += "</table>";

  return s;
}

function showBigPrime(){
  var s = "The size of the table would be to large to display " +
          "on the screen, therefore as requested we're only going to " +
          "display the biggest prime number... <br><br> Which is: " +
          "<b>"+bigPrime+"</b>";
  return s;
}
