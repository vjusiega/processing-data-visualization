var outerSize = 175; // radius of the outer circle
var hourDistance = 150;
var hourSize = 40;
var minuteDistance = 60;
var minuteSize = 7;
var secondsDistance = 15; 
var secondsSize = 2;

var screenCenter;

function setup() {
  createCanvas(400, 400);
  screenCenter = createVector(width/2, height/2);

  ellipseMode(RADIUS);
  noStroke();
}


function draw() {
  background(255);
  // place a big circle at the hour
  
  hourCenter = analogClock(hour() % 12, 12, screenCenter, hourDistance);
  noFill();
  stroke(200, 200, 200);
  ellipse(width/2, height/2, hourDistance, hourDistance);
  fill(0);
  stroke(0);
  ellipse(hourCenter.x, hourCenter.y, hourSize, hourSize);
  
  minuteCenter = analogClock(minute(), 60, hourCenter, minuteDistance);
  noFill();
  stroke(200, 200, 200);
  ellipse(hourCenter.x, hourCenter.y, minuteDistance, minuteDistance);
  fill(0);
  stroke(0);
  ellipse(minuteCenter.x, minuteCenter.y, minuteSize, minuteSize);
  
  secondsCenter = analogClock(second(), 60, minuteCenter, secondsDistance);
  noFill();
  stroke(200, 200, 200);
  ellipse(minuteCenter.x, minuteCenter.y, secondsDistance, secondsDistance);
  fill(0);
  stroke(0);
  ellipse(secondsCenter.x, secondsCenter.y, secondsSize, secondsSize);

  fill(0);
  textAlign(CENTER, CENTER);
  text(hoursMinutesSeconds(), screenCenter.x, screenCenter.y);
}

function analogClock(value, high, mid, radius) {
  var angle = map(value, 0, high, radians(-90), radians(270));
  return createVector(mid.x + cos(angle)*radius, mid.y + sin(angle)*radius);
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
