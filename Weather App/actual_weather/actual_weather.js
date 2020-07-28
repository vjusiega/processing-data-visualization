var timeRange = 6;
var tempForecast;
var percipForecast;
var cloudForecast;
var initialized; 
var tempMin;
var tempMax; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20, 20, 20);
  
  // get the current weather for MIT's latitude and longitude
  //w = requestWeather(42.3596764, -71.0958358);

  // un-comment any of these lines (and comment-out the line above)
  // to try your weather app with another location/another time of day
  //w = requestWeather('data/mit-tuesday.json');
  //w = requestWeather('data/mit-wednesday.json');
  //w = requestWeather('data/alcatraz.json');
  //w = requestWeather('data/cambridge.json');
  //w = requestWeather('data/indianapolis.json');
  w = requestWeather('data/medfield.json');
  
  initialized = false; 
}


function draw() {
  
  if(w.ready && !initialized){
    getData();
    
    //stroke(50, 50, 50);
    //strokeWeight(0.5);
    
    //pw = (windowWidth - (windowWidth * 0.1)) / (timeRange - 1);
    //for(i = 0; i < timeRange; i ++){
    //  line(windowWidth * 0.05 + i * pw, 0, windowWidth * 0.05 + i * pw, windowHeight);
    //}
    
    let readout = formatDegrees(w.getTemperature());
    //readout = 70;
    
    deltab = 0;
    deltar = 0; 
    //if(readout > 50){
    //  deltar = readout - 50; 
    //}
    //if(readout < 50){
    //  deltab = 50 - readout; 
    //}
    
    
    drawMyCurve(tempForecast, true, [200 + deltar, 50, 150 + deltab], true, 100);
    drawMyCurve(cloudForecast, false, [130 + deltar, 100, 100 + deltab], false, 100);
    drawMyCurve(percipForecast, false, [60 + deltar,0,250 + deltab], false, 150);
    
    drawMyCurve(tempForecast, true, [200 + deltar, 50, 150 + deltab], true, 0);
    drawMyCurve(cloudForecast, false, [130 + deltar, 100, 100 + deltab], false, 0);
    drawMyCurve(percipForecast, false, [60 + deltar,0,250 + deltab], false, 0);
    
    let deltaHeight = windowHeight / 4;
    
    textSize(120);
    stroke(color(200 + 100 + deltar, 50 + 100, 150 + 100 + deltab));
    fill(color(200 + 100 + deltar, 50 + 100, 150 + 100 + deltab));
    text(readout, windowWidth * 0.5 - 70, windowHeight * 0.2 + 10 + deltaHeight);
    
    strokeWeight(0);
    textSize(15);
    stroke(color(60 + 100 + deltar, 0 + 100,250 + 100 + deltab));
    fill(color(60 + 100 + deltar, 0 + 100, 250 + 100 + deltab));
    //fill(color(60 + 100,0 + 100,250 + 100));
    text(round((w.getPrecipProbability()*100)) + "% percipitation", windowWidth * 0.5 - 55, windowHeight * 0.2 + 50 + deltaHeight);
    
    strokeWeight(0);
    textSize(15);
    stroke(color(130 + 100 + deltar, 100 + 100, 100 +100 + deltab));
    fill(color(130 + 100 + deltar, 100 + 100, 100 +100 + deltab));
    //fill(color(60 + 100,0 + 100,250 + 100));
    text(    round((w.getCloudCover()*100)) + "% cloud coverage", windowWidth * 0.5 - 65, windowHeight * 0.2 + 75 + deltaHeight);
    
    //stroke(0); 
    //fill(20,20,20);
    //rect(0, 0, windowWidth * 0.09, windowHeight);
   // setGradient(0, 0, windowWidth, windowHeight, color(255, 255, 255), color(255,255,255), false);
    
    setGradient(0, 0, windowWidth * 0.09, windowHeight, color(20, 20, 20), color(20,20,20,0), false);
    //setGradient(0, 0, windowWidth, windowHeight, color(0, 0, 0), color(0,0,0,0), true);
    //setGradient(0, 0, windowWidth, windowHeight, color(0, 0, 0), color(0,0,0,0), true);
    //setGradient(0, 0, windowWidth, windowHeight, color(0, 0, 0), color(0,0,0,0), true);
    //setGradient(0, 0, windowWidth, windowHeight, color(0, 0, 0), color(0,0,0,0), true);
    //setGradient(0, 0, windowWidth, windowHeight, color(0, 0, 0), color(0,0,0,0), true);
    
    
    drawNumbers();
    
    
    initialized = true;
  }
}

function drawNumbers(){
  fill(color(150, 150, 150));
  textSize(10);
  strokeWeight(0);
  stroke(color(150, 150, 150));
  
  for(i = 0; i < 6; i++){
    if(i == 0 || i == 5){
     text((i*20) + "%", windowWidth*0.02, ((windowHeight/4)/5)*i + 15);  
    }
  }
  
  fill(color(200 + 100 + deltar, 50 + 100, 150 + 100 + deltab));
  stroke(color(200 + 100 + deltar, 50 + 100, 150 + 100 + deltab));
  text(round(tempMax) + '°', windowWidth*0.015, windowHeight*2/3 - 5);
  text(round(tempMin) + '°', windowWidth*0.02, windowHeight - 5);
}

function drawMyCurve(data, verticalScale, graphColor, bottomGraph, opacity){
  hey_height = windowHeight / 3;
  if(!bottomGraph){
    hey_height = windowHeight / 4;
  }
  
  let points = getDataPoints(data, hey_height, verticalScale, bottomGraph);
 
  //now draw
  smooth(-10);
  fill(graphColor[0], graphColor[1], graphColor[2], opacity);
  strokeWeight(2);
  stroke(color(graphColor[0], graphColor[1], graphColor[2]));
  beginShape();
  curveVertex(-100, points[1]); // edge vertex
  //curveVertex(points[0], points[1]);
  
  for(j = 0; j < points.length; j+=2){
    curveVertex(points[j], points[j + 1]);   
  }

  //curveVertex(points[points.length - 2], points[points.length - 1]);
  curveVertex(windowWidth + 500, points[points.length - 1]); // edge vertex
  if(bottomGraph){
    vertex(windowWidth + 500, windowHeight); 
    vertex(-100, windowHeight + 500);
  }
  else{
    vertex(windowWidth + 500, -100);
    vertex(-100, -100);
  }
  endShape(CLOSE);
  
  fill(color(graphColor[0] + 100, graphColor[1] + 100, graphColor[2] + 100));
  noStroke();
  for ( i = 0; i < points.length; i += 2) {
    ellipse(points[i], points[i + 1], 10, 10);
  }
}

function getMin(data){
  min = data[0];
  for(i = 0; i < data.length; i++){
    if(data[i] < min){
      min = data[i];
    }
  }
  return min;
}

function getMax(data){
  max = data[0];
  for(i = 0; i < data.length; i++){
    if(data[i] > max){
      max = data[i];
    }
  }
  return max;
}

function getDataPoints(data, verticalHeight, wholeSpace, bottomGraph){
  let min = getMin(data);
  let max = getMax(data);
  
  if(bottomGraph){
    tempMin = min;
    tempMax = max;
  }
  
  let dataPoints = [];
  let pointWidth = (windowWidth - (windowWidth * 0.1)) / (data.length - 1); 
  for(i = 0; i < data.length; i++){
    dataPoints.push((i * pointWidth) + ((windowWidth * 0.1))); //x-coord
    
    if(wholeSpace){
      ycoord = ((data[i] - min) / (max - min)) * verticalHeight;
    }
    else{
      ycoord = data[i] * verticalHeight;
    }
    if(bottomGraph){
      ycoord = windowHeight - ycoord - 10;
    }
    else{
      ycoord = ycoord + 10;
    }
    dataPoints.push(ycoord);
  }
  return dataPoints;
}

function getData(){
  let temps = w.getTemperature('hourly');
  tempForecast = subset(temps, 0, timeRange); //gets the first hours
  
  let percip = w.getPrecipProbability('hourly');
  percipForecast = subset(percip, 0, timeRange);
  
  let clouds = w.getCloudCover('hourly');
  cloudForecast = subset(clouds, 0, timeRange);
}

function formatDegrees(amount) {
  // the degree symbol, or \u00B0
  return round(amount) + '°';  
}

function setGradient(x,  y,  w,  h,  c1,  c2,  y_axis ) {
  print("i am setting");
  noFill();
  strokeWeight(5);

  if (y_axis == true) {  // Top to bottom gradient
    for (i = y; i <= y+h; i++) {
      inter = map(i, y, y+h, 0, 1);
      c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (y_axis == false) {  // Left to right gradient
    for (i = x; i <= x+w; i++) {
      inter = map(i, x, x+w, 0, 1);
      c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
