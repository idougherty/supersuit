import { Crachead } from "./enemies.js";
import { Crate } from "./crate.js";
import { Wall } from "./wall.js";
import { FireBarrel } from "./firebarrel.js";
import { Bookshelf } from "./bookshelf.js";

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var p = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vy = 2.5;
    this.size = 5;
    this.color =
      "rgba(" + (Math.floor(Math.random() * 100) + 155) + ", 50, 30, 1)";
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.y += this.vy;
  }
}

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    this.weapon = "fist";

    this.keydown = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: false
    };
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.keydown.LEFT && !this.keydown.RIGHT) {
      this.left();
    } else if (this.keydown.RIGHT && !this.keydown.LEFT) {
      this.right();
    } else {
      this.vx *= 0.7;
    }

    if (this.keydown.UP && !this.keydown.DOWN) {
      this.up();
    } else if (this.keydown.DOWN && !this.keydown.UP) {
      this.down();
    } else {
      this.vy *= 0.7;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  left() {
    if (this.vx > -4) {
      this.vx -= 1;
    } else {
      this.vx = -4;
    }
  }

  right() {
    if (this.vx < 4) {
      this.vx += 1;
    } else {
      this.vx = 4;
    }
  }

  up() {
    if (this.vy > -4) {
      this.vy -= 1;
    } else {
      this.vy = -4;
    }
  }

  down() {
    if (this.vy < 4) {
      this.vy += 1;
    } else {
      this.vy = 4;
    }
  }

  punch(vector) {}

  shoot(vector) {}
}

function playerCenter() {
  return [player.x + player.width / 2, player.y + player.height / 2];
}

function calculateVector(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  const ratio = 1 / Math.sqrt(xDist ** 2 + yDist ** 2);
  return [xDist * ratio, yDist * ratio];
}

canvas.addEventListener("click", function(e) {
  if (player.weapon === "fist") {
    const [playerX, playerY] = playerCenter();
    const vector = calculateVector(playerX, playerY, e.layerX, e.layerY);
    player.punch(vector);
  } else {
    player.shoot(vector);
  }
});

document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37: //left
      player.keydown.LEFT = true;
      break;

    case 38: //up
      player.keydown.UP = true;
      break;

    case 39: //right
      player.keydown.RIGHT = true;
      break;

    case 40: //down
      player.keydown.DOWN = true;
      break;

    default:
      return;
  }
  game.update();
});

document.addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 37: //left
      player.keydown.LEFT = false;
      break;

    case 38: //up
      player.keydown.UP = false;
      break;

    case 39: //right
      player.keydown.RIGHT = false;
      break;

    case 40: //down
      player.keydown.DOWN = false;
      break;

    default:
  }
});

let cursorX = 0;
let cursorY = 0;

canvas.addEventListener("mousemove", event => {
  if (player.weapon === "fist") {
    const [playerX, playerY] = playerCenter();
    const xDist = event.offsetX - playerX;
    const yDist = event.offsetY - playerY;
    const distance = Math.sqrt(xDist ** 2 + yDist ** 2);
    if (distance > 64) {
      const ratio = 64 / distance;
      cursorX = playerX + xDist * ratio;
      cursorY = playerY + yDist * ratio;
      console.log(cursorX, cursorY);
      return;
    }
  }
  cursorX = event.offsetX;
  cursorY = event.offsetY;
});

/** @param {CanvasRenderingContext2D} c */
function drawCursor(c) {
  c.beginPath();
  c.arc(cursorX, cursorY, 5, 0, Math.PI * 2);
  c.fillStyle = "#da1001";
  c.fill();
}

function draw() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(c);
  for (const enemy of game.enemies) {
    enemy.draw(c);
  }

  for (const particle of p) {
    particle.update(c);
  }

  drawCursor(c);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

p.push(new Particle(200, 0));

class Gamestate {
  constructor() {
    this.speed = 1;
    this.enemies = [new Crachead(10, 10)];
    this.obstacles = [];
  }
  newObstacles(layout) {
    this.obstacles = [];

    for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout.length; x++) {
        switch (layout[y][x]) {
          case "c": //crate
            this.obstacles.push(new Crate(x * 64, y * 64));
            break;

          case "b": //bookshelf
            this.obstacles.push(new Bookshelf(x * 64, y * 64));
            break;

          case "f": //fire_barrel
            this.obstacles.push(new FireBarrel(x * 64, y * 64));
            break;

          case "w": //wall
            this.obstacles.push(new Wall(x * 64, y * 64));
            break;

          default:
            console.log("i don't know what this is");
        }
      }
    }
  }
  update() {
    this.speed =
      120 / (Math.sqrt(player.vx * player.vx + player.vy * player.vy) + 0.5);

    player.update();

    for (const enemy of this.enemies) {
      enemy.update();
    }

    for (const particle of p) {
      particle.update();
    }
  }
  loop() {
    game.update();
    setTimeout(game.loop, game.speed);
  }
}

window.game = new Gamestate();
window.player = new Player();
game.newObstacles([
  [" ", " ", " ", " ", "w", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["c", " ", " ", " ", " ", " ", "f", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "b", " ", " ", " "]
]);

game.loop();
