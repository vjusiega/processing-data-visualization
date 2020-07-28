// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0


function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}


function draw() {
  background(255);

  stroke(0);
  for (var i = 0; i < 31; i+= 2) {
    if (i >= second()) {
      var y = ((i/2)+1) * height/31;
      line(0, y, width, y);
      
      var y2 = (29 - (i/2)+1) * height/31;
      line(0, y2, width, y2);
    }
  }
  
  for (var j = 0; j < 31; j+=2) {
    if (j >= second()) {
      var x = ((j-1)/2+1) * width/31;
      line(x, 0, x, height);
      
      var x2 = (29 - (j-1)/2+1) * width/31;
      line(x2, 0, x2, height);
    }
  }
  
  for (var k = 30; k < 60; k+=2) {
    if (k <= second()) {
      var yy = ((k/2)+1) * height/31;
      line(0, yy, width, yy);
      
      var yy2 = (29 - (k/2)+1) * height/31;
      line(0, yy2, width, yy2);
    }
  }
  
  for (var m = 30; m < 60; m+=2) {
    if (m <= second()) {
      var xx = ((m-1)/2+1) * width/31;
      line(xx, 0, xx, height);
      
      var xx2 = (29 - (m-1)/2+1) * width/31;
      line(xx2, 0, xx2, height);
    }
  }

  noStroke();
  fill(0);
  // adds 1 to y so that it centers a little better
  text(hoursMinutesSeconds(), width/2, height/2 + 1);
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
