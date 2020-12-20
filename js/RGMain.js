let canvas = document.getElementById("RGcanvas");
const ctx = canvas.getContext('2d');
let center;
let circles = [];
let graph;
let stats = ["First", "Second", "Third", "Fourth", "Fifth"];
let items = [];

class RGraph {
  referenceCircles;
  referenceCircles_col = rgb(100, 100, 100);
  referenceMark_col = rgb(100, 100, 100);
  constructor(elements){
    this.elements = elements;
  }
}
class RGColour {
  rgba;
  constructor(r,g,b,a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a?a:1;
    this.rgba = "rgb("+this.r+","+this.g+","+this.b+","+this.a+")";
  }
}
class RGCircle {
  circle;

  constructor(posX, posY, radius){
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.drawCircle();
  }


  drawCircle(){
    ctx.beginPath();
    this.circle = new Path2D();
    this.circle = ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}
class RGElement {
  color;
  transparentColor;
  statsMarks;
  selected = false;
  constructor(name, stats, color){
    this.name = name;
    this.stats = stats;
    if (color)
      this.setColor(color);
  }
  selectItem(){
    this.selected = true;
  }
  disselectItem(){
    this.selected = false;
  }
  setColor(col){
    this.color = new RGColour(col[0],col[1],col[2],1);
    this.getTransparentColor();
  }
  getTransparentColor(){
    let newCol = new RGColour(this.color.r,this.color.g,this.color.b,0.05);
    this.transparentColor = newCol;
  }
}
class Vector2 {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}
function rgb(r, g, b, a){
  if (r == RGColour){
    return 'rgb('+r.r+','+r.g+','+r.b+r.a+')';
  }
  if (a){
    if (a > 1 || a < 0){
      console.log("%cALPHA value must be between 0 and 1", "color: red");
      return 'rgb('+r+','+g+','+b+')';
    } else {
      return 'rgb('+r+','+g+','+b+','+a+')';
    }
  } else{
    return 'rgb('+r+','+g+','+b+')';
  }
}
function stroke(rgb){
  ctx.strokeStyle = rgb;
}
function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

draw();
setInterval(draw, 30);
function draw() {
  if (!graph){
     graph = new RGraph();
  } else if (!graph.referenceCircles) {
    console.log("null circles");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  center = new Vector2(canvas.width/2, canvas.height/2);
  drawReferenceCircles();
  drawMarksLabels();
  drawCircles();
}

function drawReferenceCircles() {
  // draw circles
  stroke(graph.referenceCircles_col);
  for (let i = 1; i <= 5; i++){
    circles[i] = new RGCircle(center.x, center.y, i * 30);
    drawReferenceMarks(circles[i]);
  }
  if (!graph.referenceCircles)
    graph.referenceCircles = circles;
}

function drawReferenceMarks (circle) {

  if(!circle){
    console.log("%cno circle", "color: red");
    return;
  }
  let circleMarks = []
  let centerX = circle.posX;
  let centerY = circle.posY;
  let r = circle.radius;
  ctx.fillStyle = graph.referenceMark_col;
  for (let i = 0; i < stats.length; i++){
    let a = centerX-r*Math.sin(Math.PI*-2*(i/stats.length));
    let b = centerY-r*Math.cos(Math.PI*-2*(i/stats.length));
    circleMarks[i] = new RGCircle(a, b, 1);
    ctx.fill(circleMarks[i].circle);
  }
}

function drawMarksLabels () {
  let lastCircle = circles[circles.length-1];
  let centerX = lastCircle.posX;
  let centerY = lastCircle.posY;
  let r = lastCircle.radius;
  let margin = 50;
  ctx.fillStyle = rgb(100, 100, 100);
  for (let i = 0; i < stats.length; i++){
    let a = centerX-(r+margin)*Math.sin(Math.PI*-2*(i/stats.length));
    let b = centerY-(r+margin)*Math.cos(Math.PI*-2*(i/stats.length));
    ctx.font = "10px Sans-Serif";
    ctx.textAlign = "center";
    ctx.fillText(stats[i], a, b);
  }
}

function drawItemGraph(item) {
  let lastCircle = circles[circles.length-1];
  let centerX = lastCircle.posX;
  let centerY = lastCircle.posY;
  let maxValue = lastCircle.radius;
  let arrayOfValues = [];
  let statsMarks;
  if (!item.statsMarks || !item.selected){
    statsMarks = [];
    for (let i = 0; i < stats.length; i++){
      if (item.stats[i] >= 100){
        arrayOfValues[i] = maxValue;
      } else {
        arrayOfValues[i] = item.stats[i]*maxValue/100;
      }
      statsMarks[i] = new RGCircle(centerX, centerY, 1);
      ctx.fillStyle = item.color;
      ctx.fill(statsMarks[i].circle);
    }
    item.statsMarks = statsMarks;
  } else {
    for (let i = 0; i < stats.length; i++){
      if (item.stats[i] >= 100){
        arrayOfValues[i] = maxValue;
      } else {
        arrayOfValues[i] = item.stats[i]*maxValue/100;
      }

      let a = centerX-arrayOfValues[i]*Math.sin(Math.PI*-2*(i/stats.length));
      let b = centerY-arrayOfValues[i]*Math.cos(Math.PI*-2*(i/stats.length));
      let _a = lerp(item.statsMarks[i].posX, a, 0.1);
      let _b = lerp(item.statsMarks[i].posY, b, 0.1);
      item.statsMarks[i] = new RGCircle(_a, _b, 1);
      ctx.fillStyle = item.color;
      ctx.fill(item.statsMarks[i].circle);
    }
  }

  ctx.beginPath();
  ctx.moveTo(item.statsMarks[0].posX, item.statsMarks[0].posY)
  for (let i = 1; i < stats.length; i++){
    ctx.lineTo(item.statsMarks[i].posX, item.statsMarks[i].posY);
  }
  ctx.closePath();
  ctx.strokeStyle = item.color.rgba;
  ctx.shadowBlur = 10;
  ctx.shadowColor = item.color.rgba;
  ctx.stroke();
  ctx.fillStyle = item.transparentColor.rgba;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawCircles(){
  items.forEach(element => {
    if (element.selected){
      drawItemGraph(element);
    }
  });
}
