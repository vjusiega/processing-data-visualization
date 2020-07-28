var c; 
var maxCrosses = 100;
var crosses;
var crossSize; 
var initialized;
var windSpeed; 
var humidityPercentage;
var backgroundColor; 
var b1; 
var b2;
var b3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // get the current weather for MIT's latitude and longitude
  w = requestWeather(42.3596764, -71.0958358);

  // un-comment any of these lines (and comment-out the line above)
  // to try your weather app with another location/another time of day
  //w = requestWeather('data/mit-tuesday.json');
  //w = requestWeather('data/mit-wednesday.json');
  //w = requestWeather('data/alcatraz.json');
  //w = requestWeather('data/cambridge.json');
  //w = requestWeather('data/indianapolis.json');
  //w = requestWeather('data/medfield.json');
  
  backgroundColor = [255, 255, 255];
  b1 = 0;
  b2 = 0;
  b3 = 0;
  crosses = [];
  crossSize = 10;
  initialized = false; 
  
}

function draw() {
  //background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  
  if(w.ready && !initialized){
    temp = w.getTemperature(); 
    wind = w.getWindSpeed();
    //print("the wind speed is " + wind);
    windSpeed = wind / 10;
    humidityPercentage = w.getHumidity();
    _color = getColor(w.getTemperature());
    backgroundColor = brighten(_color);
    b1 = int(backgroundColor[0]);
    b2 = int(backgroundColor[1]); 
    b3 = int(backgroundColor[2]);
    populateRandomCrosses(humidityPercentage, color(_color[0], _color[1], _color[2]));
    initialized = true; 
    print("got the data" + temp);
  }
  
  clear();
  background(b1, b2, b3);
  
  for(j = 0; j < crosses.length; j++){
    drawCross(crosses[j]);
    windBlowCross(crosses[j], windSpeed);
    rotateCross(crosses[j], windSpeed/100);
  }
  
  //drawCross(c);
  //rotateCross(c, 0.02);
}

function brighten(_color){
  newColor = [0,0,0];
  for(i = 0; i < _color.length; i++){
    newColor[i] = _color[i] + 50;
    if(_color[i] > 255){
      _color[i] = 255;
    }
  }
  return newColor;
}

function windBlowCross(cross, windSpeed){
  cross.x += windSpeed;
  if(cross.x >= windowWidth){
    cross.x = -10;
    cross.y = Math.random() * windowHeight;
  }
}

function getColor(temp){
  r = 150;
  b = 150;
  g = 150;
  
  //diff = temp / 100;
  if(temp < 50){
    b += (50 - temp) * 2 + 15;
    //g += temp / 2;
  }else{
    r += (temp - 50) * 2 + 15;
  }
  
  if(temp < 70 && temp > 30){
    g -= temp - 30;
  }
  
  return [r, g, b];
}

function getColorOld(temp){
  zero = [181, 248, 255];
  thirtyNine = [67, 120, 255];
  sixty = [250, 139, 255];
  seventyNine = [255, 164, 40];
  oneHundred = [255, 74, 0];
  
  if(temp <= 0){
    return zero;
  }
  if(temp > 0 && temp < 39){
    return _interpolateColor(zero, thirtyNine, temp / 39);
  }
  if(temp == 39){
    return thirtyNine;
  }
  if(temp > 39 && temp < 60){
    return _interpolateColor(thirtyNine, sixty, (temp - 39) / (60 - 39));
  }
  if(temp == 60){
    return sixty;
  }
  if(temp > 60 && temp < 79){
    return _interpolateColor(sixty, seventyNine, (temp - 60) / (79 - 60));
  }
  if(temp == 79){
    return seventyNine;
  }
  if(temp > 79 && temp < 100){
    return _interpolateColor(seventyNine, oneHundred, (temp - 79) / (100 - 79));
  }
  if(temp >= 100){
    return oneHundred;
  }
}

function populateRandomCrosses(percentage, _color){
  tot = Math.round(percentage * maxCrosses);
  for(i = 0; i < tot; i++){
    randomX = Math.random() * windowWidth;
    randomY = Math.random() * windowHeight;
    randomAng = Math.random() * PI/2;
    crosses.push(createCross(randomX, randomY, _color, crossSize, randomAng));
  }
}

function createCross(in_xpos, in_ypos, inColor, inSize, inAng){
  obj = {
    x : in_xpos, y : in_ypos, col : inColor, size : inSize, ang : inAng
  };
  
  obj.x = in_xpos; 
  obj.y = in_ypos; 
  obj.col = inColor; 
  obj.size = inSize;
  obj.ang = inAng;
  
  return obj;
}

function rotateCross(crossObj, deltaTheta){
  crossObj.ang = crossObj.ang + deltaTheta;
}

function drawCross(crossObj){
  for(i = 0; i < 2; i++){
    x = crossObj.x;
    y = crossObj.y;
    
    newPoint = rotatePoint(x + crossObj.size, y, x, y, crossObj.ang + (PI * i));
    strokeWeight(3);
    stroke(crossObj.col);
    
    line(crossObj.x, crossObj.y, newPoint[0], newPoint[1]);
  }
}

function rotatePoint(px, py, ox, oy, theta){
  
  xPrime = cos(theta) * (px - ox) - sin(theta) * (py - oy) + ox;
  yPrime = sin(theta) * (px - ox) + cos(theta) * (py - oy) + oy;
  return [xPrime, yPrime];
}

function _interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) { factor = 0.5; }
  //var result = color1.slice();
  //print("color1 is " + color1);
  //print("color2 is " + color2);
  newColor = [0,0,0];
  for (var i=0;i<3;i++) {
    //print("color1" + i + " is " + color1[i]);
    //print("color red is" + color1.r);
    newColor[i] = Math.round(color1[i] + factor*(color2[i]-color1[i]));
    //print("color1" + i + " is now " + color1[i]);
  }
  //print("color1 is now " + color1);
  return [newColor[0], newColor[1], newColor[2]];
}
