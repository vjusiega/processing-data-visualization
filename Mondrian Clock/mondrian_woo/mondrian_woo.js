var hourSquares; 
var minuteSquares;
var secondSquares; 

var frameWidth;
var frameHeight; 
var startX;
var startY;

var currentHour;
var currentMin;
var currentSec;

function setup() {
  createCanvas(400, 400);
  
  hourSquares = [];
  minuteSquares = [];
  secondSquares = []; 
  frameWidth = 390;
  frameHeight = 390; 
  startX = 5;
  startY = 5;

  currentHour = twelveHour();
  currentMin = minute();
  
  //var indexOfHourSquareToSlice = findBiggestSquare(hourSquares);
  
  //create the first square
  hourSquares.push(createSquare(startX, startY, frameWidth, frameHeight, false));
  
  // if hour > 1 split it! otherwise continue to the minutes part 
  for(i = 0; i < twelveHour() - 1; i++){
    var indexOfHourSquareToSlice = findBiggestSquare(hourSquares);
    var newSquares = splitSquare(hourSquares[indexOfHourSquareToSlice]);
    hourSquares[indexOfHourSquareToSlice] = newSquares[0];
    hourSquares.push(newSquares[1]);
  }
  
  var indexOfMinuteSquareToSlice = findBiggestSquare(hourSquares);
  minuteSquares.push(hourSquares[indexOfMinuteSquareToSlice]);
  for(j = 0; j < minute() - 1; j++){
    indexOfMinuteSquareToSlice = findBiggestSquare(minuteSquares);
    var newMinSquares = splitSquare(minuteSquares[indexOfMinuteSquareToSlice]);
    minuteSquares[indexOfMinuteSquareToSlice] = newMinSquares[0];
    minuteSquares.push(newMinSquares[1]);
  }
  
  var indexSecondToSlice = findBiggestSquare(minuteSquares);
  secondSquares.push(minuteSquares[indexSecondToSlice]);
  for(k = 0; k < second() - 1; k++){
    indexSecondToSlice = findBiggestSquare(secondSquares);
    var secMinSquares = splitSquare(secondSquares[indexSecondToSlice]);
    secondSquares[indexSecondToSlice] = secMinSquares[0];
    secondSquares.push(secMinSquares[1]);
  }
  currentSec = second();
}

function createSquare(input_x, input_y, input_w, input_h, prev_s) {
  obj = {
    x : input_x, y : input_y, w : input_w, h : input_h, area : input_w * input_h, previous_slice_vertical : prev_s
  };
  
  obj.x = input_x;
  obj.y = input_y;
  obj.w = input_w;
  obj.h = input_h;
  obj.area = input_w * input_h;
  obj.previous_slice_vertical = prev_s;
  
  return obj;
}

function splitSquare(square){
  //choose percentage between 40 and 60% to split the square by so that's it's slightly random 
  var divisionRatio = ((Math.random() * 35) + 30) /100; 
  
  if(square.previous_slice_vertical){
    //slice this square horizontally 
    // so that means that we are keeping the same x values, just changing the y values
    var s1 = createSquare(square.x, square.y, square.w, square.h * divisionRatio, false);
    var s2 = createSquare(square.x, square.y + (square.h * divisionRatio), square.w, square.h * (1 - divisionRatio), false);
    return [s1, s2];
  }
  else{
    //slice this square vertically 
    //so that means that we keep the same y values, change the x values
    var s3 = createSquare(square.x, square.y, square.w  * divisionRatio, square.h, true);
    var s4 = createSquare(square.x + square.w  * divisionRatio, square.y, square.w * (1 - divisionRatio), square.h, true);
    return [s3, s4];
  }
}

function doTheSplit(squares){
  var bigSquareIndex = findBiggestSquare(squares);
  var newSquares = splitSquare(squares[bigSquareIndex]);
  squares[bigSquareIndex] = newSquares[0];
  squares.push(newSquares[1]);
}

function findBiggestSquare(squares){
  var largestIndex = 0; 
  
  for(s = 0; s < squares.length; s++){
      if(squares[s].area > squares[largestIndex].area){
        largestIndex = s; 
      }
  }
  
  return largestIndex; 
}


function draw() {
  background(255);
  
  stroke(0);
  strokeWeight(5);
  noFill();
  
  if(twelveHour() != currentHour){
    currentHour = twelveHour();
    currentMin = 0;
    currentSec = 0; 
    
    if(currentHour > 1) {
      doTheSplit(hourSquares);
    }
    
    minuteSquares = [hourSquares[findBiggestSquare(hourSquares)]];
    secondSquares = [hourSquares[findBiggestSquare(minuteSquares)]];
  }
  if(minute() != currentMin) {
    currentMin = minute();
    currentSec = 0; 
    
    if(currentMin > 1) {
      doTheSplit(minuteSquares);
    }
    
    secondSquares = [minuteSquares[findBiggestSquare(minuteSquares)]];
  }
  if(second() != currentSec) {
    currentSec = second();
    
    if(currentSec > 1) {
      doTheSplit(secondSquares);
    }
  }
  
  for(i = 0; i < hourSquares.length; i++){
    rect(hourSquares[i].x, hourSquares[i].y, hourSquares[i].w, hourSquares[i].h);
  }
  
  strokeWeight(3);
  for(j = 0; j < minuteSquares.length; j++){
    rect(minuteSquares[j].x, minuteSquares[j].y, minuteSquares[j].w, minuteSquares[j].h);
  }
  
  strokeWeight(1);
  for(k = 0; k < secondSquares.length; k++){
    rect(secondSquares[k].x, secondSquares[k].y, secondSquares[k].w, secondSquares[k].h);
  }
  
  //rect(200,0,200,200);
}

// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  var h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}
