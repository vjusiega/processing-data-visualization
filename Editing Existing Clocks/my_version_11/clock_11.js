// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0


function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(255);
  textAlign(CENTER);
  
  strokeWeight(2);

  push();
  translate(width/2, height/2);
  noFill();
  stroke(0);

  var hourSize = 90;
  var finalHourSize = 90;
  var hourAngle = map(hour() % 12,  0, 12,  0, TAU);
  rotate(hourAngle);
  triangle(0, -hourSize,  hourSize/2.5, 0,  -hourSize/2.5, 0);

  var minuteSize = 120;
  var minuteAngle = map(minute(),  0, 60,  0, TAU);
  rotate(minuteAngle);
  triangle(0, -minuteSize,  minuteSize/2.5, 0,  -minuteSize/2.5, 0);
  
  var secondSize = 150;
  var secondAngle = map(second(),  0, 60,  0, TAU);
  rotate(secondAngle);
  triangle(0, -secondSize,  secondSize/2.5, 0,  -secondSize/2.5, 0);
  pop();

  noStroke();
  fill(0);
  // adds 1 to y so that it centers a little better
  text(hoursMinutesSeconds(), width/2, height - 20);
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
