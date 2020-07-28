var hour_size = 100;
var minute_size = 88;
var second_size = 76;

function setup() {
  createCanvas(400, 400);
  ellipseMode(RADIUS);
}


function draw() {
  noFill();
  stroke(0);
  strokeWeight(10);
  
  background(255);
  arc(width/2, height/2, hour_size, hour_size, -PI/2, (TWO_PI * (12 - twelveHour()) / 12) - PI/2);
  arc(width/2, height/2, minute_size, minute_size, -PI/2, (TWO_PI * (60 - minute()) / 60) + -PI/2);
  arc(width/2, height/2, second_size, second_size, -PI/2, (TWO_PI * (60 - second()) / 60) + -PI/2);
  
  noStroke();
  fill(0);
  text(hoursMinutesSeconds(), width/2 - 20, height - 50);
}

// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  var h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}

// format hours and minutes
function hoursMinutes() {
  return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
}


// format hours, minutes, and seconds
function hoursMinutesSeconds() {
  return hoursMinutes() + ':' + nf(second(), 2);
}
