var mouse = {
  x: 0,
  y: 0,
  down: false
};

var selected = false;

var cnv = document.querySelector("#canvas");
var ctx = cnv.getContext("2d");
var width = 500,
  height = 300;

cnv.width = width;
cnv.height = height;
cnv.style.backgroundColor = "#D9FF9E";

ctx.fillStyle = "#985D5D";
ctx.strokeStyle = "#001EFF";
ctx.lineWidth = 3;

const Rect = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

Rect.prototype = {
  draw: function() {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },

  stroke: function() {
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
};

var isCursorInRect = function(rect) {
  return (
    mouse.x > rect.x &&
    mouse.x < rect.x + rect.w &&
    mouse.y > rect.y &&
    mouse.y < rect.y + rect.h
  );
};

var i,
  rect = [];
for (i = 0; i < 5; i++) {
  rect.push(new Rect(50 + i * (50 + 20), 50, 50, 50));
}

setInterval(function() {
  ctx.clearRect(0, 0, width, height);

  for (i in rect) {
    rect[i].draw();

    if (isCursorInRect(rect[i])) {
      rect[i].stroke();
    }
  }

  if (selected) {
    selected.x = mouse.x;
    selected.y = mouse.y;
    selected.stroke();
  }
}, 30);

window.onmousemove = function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
};

window.onmousedown = function() {
  mouse.down = true;
  if (!selected) {
    var i;
    for (i in rect) {
      if (isCursorInRect(rect[i])) {
        selected = rect[i];
      }
    }
  }
};

window.onmouseup = function() {
  mouse.down = false;
  selected = false;
};
