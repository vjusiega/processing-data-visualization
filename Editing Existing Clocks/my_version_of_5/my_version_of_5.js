// (c) Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0


function setup() {
  createCanvas(400, 400);
}


function draw() {
  background('white');
  fill(0,0,0,60);
  noStroke();
  textAlign(CENTER);

  var startAngle = radians(-90);
  var stopAngle = radians(270);

  var y = height/2;
  var each = width/3;
  var textY = height*0.8;

  var hourCenter = width/2;
  var hourAngle = map(hour() % 12, 0, 12, startAngle, stopAngle);
  arc(hourCenter, y, each, each, startAngle, hourAngle);
  //text(nf(twelveHour(), 2), hourCenter, textY);

  var minuteCenter = width/2;
  var minuteAngle = map(minute(), 0, 60, startAngle, stopAngle);
  arc(minuteCenter, y, each*1.5, each*1.5, startAngle, minuteAngle);
  //text(nf(minute(), 2), minuteCenter, textY);

  var secondCenter = width/2;
  var secondAngle = map(second(), 0, 60, startAngle, stopAngle);
  arc(secondCenter, y, each*2, each*2, startAngle, secondAngle);
  //text(nf(second(), 2), secondCenter, textY);
  
  text(hoursMinutesSeconds(), width/2, 9*height/10);
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
