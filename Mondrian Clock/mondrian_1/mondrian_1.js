function setup() {
  createCanvas(400, 400);
}

var rectangeWidth = 200;
var rectangleHeight = 300; 


function draw() {
   background(255);
   
   noFill();
   stroke(0);
   var x = (width - rectangeWidth) / 2;
   var y = (height - rectangleHeight) / 2; 
   rect(x, y, rectangeWidth, rectangleHeight);
   
   hourSectionX = x + rectangeWidth / 3; 
   minuteSectionX = x + 2 * rectangeWidth / 3;
   secondSectionX = x + rectangeWidth; 
   
   line(hourSectionX, y, hourSectionX, y + 300);
   line(minuteSectionX, y, minuteSectionX, y + 300);
         
   var hour = twelveHour(); 
   var hourFraction = rectangleHeight / hour;
   for(i = 0; i < hour; i++){
      line(x, i * hourFraction + y, hourSectionX, i * hourFraction + y);
   }
   
   var minuteFraction = rectangleHeight / minute();
   for(j = 0; j < minute(); j++){
     line(hourSectionX, j * minuteFraction + y, minuteSectionX, j * minuteFraction + y);
   }
   
   var secondFraction = rectangleHeight / second();
   for(k = 0; k < second(); k++){
     line(minuteSectionX, k * secondFraction + y, secondSectionX, k * secondFraction + y);
   }
   
   noStroke();
   fill(0,0,0, 150);
   rect(x, y, hourSectionX - x, rectangleHeight);
   
   fill(0,0,0, minute() / 60 * 150);
   rect(hourSectionX, y, minuteSectionX - hourSectionX, rectangleHeight);
   
   fill(0,0,0, second() / 60 * 150);
   rect(minuteSectionX, y, secondSectionX - minuteSectionX, rectangleHeight);
   
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
