import { Crachead } from "./enemies.js";
import { Crate } from "./crate.js";
import { Wall } from "./wall.js";
import { FireBarrel } from "./firebarrel.js";
import { Bookshelf } from "./bookshelf.js";
import { removeIf, isCollidingCircle } from "./util.js";
import { Weapon } from "./weapon.js";

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
    this.width = 32;
    this.height = 32;
    this.radius = 16;
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

  calculateCollisions() {
    if (this.weapon != "gun") {
      removeIf(game.weapons, weapon => {
        const colliding = isCollidingCircle(
          this.x,
          this.y,
          this.radius,
          weapon.x,
          weapon.y,
          weapon.radius
        );
        if (this,weapon && colliding) {
          this.weapon = weapon.weapon;
        }
        return weapon.loaded && colliding;
      });
    }
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

    this.calculateCollisions();
    calculateCursorCoords();
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

  center() {
    return [this.x + this.width / 2, this.y + this.height / 2];
  }

  punch() {
    console.log("owo");
    removeIf(game.enemies, enemy =>
      isCollidingCircle(cursorX, cursorY, 32, enemy.x, enemy.y, enemy.radius)
    );
  }

  shoot(vector) {
      game.bullets.push(new Bullet(this.x, this.y, vector, "player"));
      this.weapon = "fist";
      game.weapons.push(new Weapon(this.x, this.y, false));
  }
}

function calculateVector(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  const ratio = 1 / Math.sqrt(xDist ** 2 + yDist ** 2);
  return [xDist * ratio, yDist * ratio];
}

canvas.addEventListener("click", function(e) {
  if (player.weapon === "fist") {
    player.punch();
  } else {
    const [playerX, playerY] = player.center();
    const vector = calculateVector(playerX, playerY, e.layerX, e.layerY);
    player.shoot(vector);
  }
});

document.addEventListener("keydown", function(e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      player.keydown.LEFT = true;
      break;

    case "KeyW":
    case "ArrowUp":
      player.keydown.UP = true;
      break;

    case "KeyD":
    case "ArrowRight":
      player.keydown.RIGHT = true;
      break;

    case "KeyS":
    case "ArrowDown":
      player.keydown.DOWN = true;
      break;

    default:
      return;
  }
  game.update();
});

document.addEventListener("keyup", function(e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      player.keydown.LEFT = false;
      break;

    case "KeyW":
    case "ArrowUp":
      player.keydown.UP = false;
      break;

    case "KeyD":
    case "ArrowRight":
      player.keydown.RIGHT = false;
      break;

    case "KeyS":
    case "ArrowDown":
      player.keydown.DOWN = false;
      break;

    default:
  }
});

let cursorX = 0;
let cursorY = 0;

function calculateCursorCoords() {
  if (player.weapon === "fist") {
    const [playerX, playerY] = player.center();
    const xDist = mouseX - playerX;
    const yDist = mouseY - playerY;
    const distance = Math.sqrt(xDist ** 2 + yDist ** 2);
    if (distance > 64) {
      const ratio = 64 / distance;
      cursorX = playerX + xDist * ratio;
      cursorY = playerY + yDist * ratio;
      return;
    }
  }
  cursorX = mouseX;
  cursorY = mouseY;
}

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", event => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
  calculateCursorCoords();
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

  for (const obstacle of game.obstacles) {
    obstacle.draw(c);
  }

  player.draw(c);
  for (const enemy of game.enemies) {
    enemy.draw(c);
  }

  for (const weapon of game.weapons) {
    weapon.draw(c);
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
    this.weapons = [];
    this.bullets = [];
  }

  newObstacles(layout) {
    this.obstacles = [];

    for (const row of layout) {
      for (const obstacle of row) {
        const mapping = {
          c: Crate,
          b: Bookshelf,
          f: FireBarrel,
          w: Wall
        };
        if (obstacle in mapping) {
          this.obstacles.push(new mapping[obstacle](x * 64, y * 64)());
        } else {
          console.error("unknown obstacle:", obstacle);
        }
      }
    }
  }

  update() {
    this.speed =
      120 / (Math.sqrt(player.vx * player.vx + player.vy * player.vy) + 0.5);

    player.update();

    for (const enemy of this.enemies) {
      enemy.update(player, game);
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

const game = new Gamestate();
const player = new Player();

window.game = game;
window.player = player;

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
game.weapons.push(new Weapon(64, 64, true));

game.loop();
