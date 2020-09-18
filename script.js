let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")
let radius = canvas.height / 2

// Make (0,0) centre of the canvas
context.translate(radius, radius)
radius = radius * 0.95

// Draw circle + edge + inner circle
function drawBase(radius, context) {
  context.beginPath()
  context.arc(0, 0, radius, 0, 2 * Math.PI)
  context.fillStyle = "#365D7A"
  context.fill();

  let gradient = context.createRadialGradient(0, 0, radius, 0, 0, radius * 1.05)
  gradient.addColorStop(0, "#30536d")
  gradient.addColorStop(0.1, "#D2B7A1")
  gradient.addColorStop(1, "#D2B7A1")
  context.strokeStyle = gradient
  context.lineWidth = radius * 0.1
  context.stroke()

  context.beginPath()
  context.arc(0, 0, radius * 0.05, 0, 2 * Math.PI)
  context.fillStyle = "#D2B7A1"
  context.fill()
}


function drawNumbers(radius, context) {
  context.font = radius * 0.15 + "px courgette"
  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6
    context.rotate(ang)
    context.translate(0, -radius * 0.8)
    context.rotate(-ang)
    context.fillText(num.toString(), -12, 12)
    context.rotate(ang)
    context.translate(0, radius * 0.8)
    context.rotate(-ang)
  }
}



function drawTime(radius, context) {
  var now = new Date()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()

  hour = hour % 12;
  hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60))
  drawHand(context, hour, radius * 0.5, radius * 0.05)
 
  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60))
  drawHand(context, minute, radius * 0.7, radius * 0.03)

  second = (second * Math.PI / 30)
  drawHand(context, second, radius * 0.8, radius * 0.015)
}

function drawHand(context, position, height, width) {
  context.beginPath()
  context.lineWidth = width
  context.lineCap = "round"
  context.moveTo(0, 0)
  context.rotate(position)
  context.lineTo(0, -height)
  context.strokeStyle = "#D2B7A1"
  context.stroke()
  context.rotate(-position)

}

function drawClock() {
  drawBase(radius, context)
  drawNumbers(radius, context)
  drawTime(radius, context)
}

// Draw the clock every second
setInterval(drawClock, 1000)