var mouse = {
  x: 0,
  y: 0,
  down: false
};

var selected = false;

const cnv = document.querySelector("#canvas");
const ctx = cnv.getContext("2d");
const width = 500,
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
  for (i in rect) {
    rect[i].draw();

    if (isCursorInRect(rect[i])) {
      rect[i].stroke();
    }
  }

  if (selected) {
    selected.stroke();
  }
}, 30);

window.onmousemove = function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
};

window.onmousedown = function() {
  mouse.down = true;
};

window.onmousedown = function() {
  mouse.down = false;
};
