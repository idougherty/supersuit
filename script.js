import { Crachead, GuyThatShootsYou } from "./enemies.js";
import { Crate } from "./crate.js";
import { Wall } from "./wall.js";
import { FireBarrel } from "./firebarrel.js";
import { Bookshelf } from "./bookshelf.js";
import {
  removeIf,
  isCollidingCircle,
  isCollidingCircleEntities,
  isCollidingRectEntities,
  entityCenter
} from "./util.js";
import { Weapon } from "./weapon.js";
import { Bullet } from "./bullet.js";
import { TILE_SIZE } from "./constants.js";
import { Trapdoor } from "./trapdoor.js";

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

c.imageSmoothingEnabled = false;

class Player {
  constructor() {
    this.x = canvas.width / 3;
    this.y = canvas.height / 3;
    this.vx = 0;
    this.vy = 0;
    this.width = 32;
    this.height = 32;
    this.radius = 16;
    this.weapon = "fist";
    this.maxSpeed = 4;
    this.punchCoolDown = 0;
    this.texture = document.getElementById("frozoefront");

    this.keydown = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: false
    };
  }
  //owo
  draw() {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
    //c.fillStyle = "white";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }

  respawn() {
    game.enemies = [];
    game.weapons = [];
    game.bullets = [];
    game.particles = [];
    game.newObstacles(game.levels[game.currentLevel]);
    this.x = game.entranceX;
    this.y = game.entranceY;
    this.vx = 0;
    this.vy = 0;
  }

  calculateCollisions() {
    if (this.weapon != "gun") {
      removeIf(game.weapons, weapon => {
        const shouldPickUp =
          weapon.loaded && isCollidingCircleEntities(this, weapon);
        if (shouldPickUp) {
          this.weapon = weapon.weapon;
        }
        return shouldPickUp;
      });
    }

    for (const obs of game.obstacles) {
      if (obs instanceof Trapdoor) {
        if (game.enemies.length === 0) {
          obs.open = true;
        }
        if (obs.open && isCollidingRectEntities(player, obs)) {
          game.currentLevel++;
          game.newObstacles(game.levels[game.currentLevel]);
          this.respawn();
        }
      }
    }
    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    } else if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.vy = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.vx = 0;
    }
  }

  update() {
    this.punchCoolDown++;

    if (this.keydown.LEFT && !this.keydown.RIGHT) {
      this.left();
    } else if (this.keydown.RIGHT && !this.keydown.LEFT) {
      this.right();
    } else {
      this.vx *= 0.7;
    }

    if (
      (this.keydown.RIGHT || this.keydown.LEFT) &&
      (this.keydown.UP || this.keydown.DOWN)
    ) {
      this.maxSpeed = 2.828;
    } else {
      this.maxSpeed = 4;
    }

    if (this.keydown.UP && !this.keydown.DOWN) {
      this.up();
    } else if (this.keydown.DOWN && !this.keydown.UP) {
      this.down();
    } else {
      this.vy *= 0.7;
    }

    this.x += this.vx;

    for (const obs of game.obstacles) {
      if (!(obs instanceof Trapdoor) && isCollidingRectEntities(player, obs)) {
        this.x -= this.vx;
        this.vx = 0;
      }
    }

    this.y += this.vy;

    for (const obs of game.obstacles) {
      if (!(obs instanceof Trapdoor) && isCollidingRectEntities(player, obs)) {
        this.y -= this.vy;
        this.vy = 0;
      }
    }

    this.calculateCollisions();
    calculateCursorCoords();
  }

  left() {
    if (this.vx > -this.maxSpeed) {
      this.vx -= 1;
    } else {
      this.vx = -this.maxSpeed;
    }
    this.texture = document.getElementById("left");
  }

  right() {
    if (this.vx < this.maxSpeed) {
      this.vx += 1;
    } else {
      this.vx = this.maxSpeed;
    }
    this.texture = document.getElementById("right");
  }
  //iwi
  up() {
    if (this.vy > -this.maxSpeed) {
      this.vy -= 1;
    } else {
      this.vy = -this.maxSpeed;
    }
    this.texture = document.getElementById("back");
  }

  down() {
    if (this.vy < this.maxSpeed) {
      this.vy += 1;
    } else {
      this.vy = this.maxSpeed;
    }
    this.texture = document.getElementById("frontwalk");
  }
  //uwu

  punch() {
    removeIf(game.enemies, enemy => {
      const isColliding = isCollidingCircle(
        cursorX,
        cursorY,
        32,
        enemy.x,
        enemy.y,
        enemy.radius
      );
      if (isColliding) enemy.kill(game);
      return isColliding;
    });
  }

  shoot(vector) {
    const [centerX, centerY] = entityCenter(this);
    game.bullets.push(new Bullet(centerX, centerY, vector, "player"));
    this.weapon = "fist";
    game.weapons.push(
      new Weapon(centerX - this.width / 4, centerY - this.height / 4, false)
    );
  }
}

export function calculateVector(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  const ratio = 1 / Math.sqrt(xDist ** 2 + yDist ** 2);
  return [xDist * ratio, yDist * ratio];
}

canvas.addEventListener("click", function(e) {
  if (player.weapon === "fist" && player.punchCoolDown > 20) {
    player.punch();
    player.punchCoolDown = 0;
  } else {
    const [playerX, playerY] = entityCenter(player);
    const vector = calculateVector(playerX, playerY, e.offsetX, e.offsetY);
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
//owo
let cursorX = 0;
let cursorY = 0;

function calculateCursorCoords() {
  if (player.weapon === "fist") {
    const [playerX, playerY] = entityCenter(player);
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
//WwW
canvas.addEventListener("mousemove", event => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
  calculateCursorCoords();
});

const fist = document.getElementById("fist");
/** @param {CanvasRenderingContext2D} c */
function drawCursor(c) {
  //c.beginPath();
  //c.arc(cursorX, cursorY, 5, 0, Math.PI * 2);
  //c.fillStyle = "#da1001";
  //c.fill();
  if(player.punchCoolDown > 20) {
    c.globalAlpha = 1;
  } else {
    c.globalAlpha = 0.4;
  }
  c.drawImage(fist, cursorX-6, cursorY-6, 12, 12);
  c.globalAlpha = 1;
}

function draw() {
  player.update();

  game.speed =
    120 / (Math.sqrt(player.vx * player.vx + player.vy * player.vy) + 0.5);

  c.fillStyle = `rgba(0, 0, 0, ${(1 / game.speed) * 15})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (const entity of [
    ...game.obstacles,
    ...game.weapons,
    ...game.enemies,
    ...game.bullets,
    ...game.particles
  ]) {
    entity.draw(c);
  }

  player.draw(c);

  drawCursor(c);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

class Gamestate {
  constructor() {
    this.speed = 1;
    this.currentLevel = 0;
    this.enemies = [];
    this.obstacles = [];
    this.weapons = [];
    this.bullets = [];
    this.particles = [];
    this.levels = [];
    this.entranceX = 0;
    this.entranceY = 0;
  }

  newObstacles(layout) {
    this.obstacles = [];

    layout.forEach((row, y) => {
      row.forEach((obstacle, x) => {
        const obstacles = {
          c: Crate,
          b: Bookshelf,
          f: FireBarrel,
          w: Wall,
          t: Trapdoor
        };
        const enemies = {
          h: Crachead,
          g: GuyThatShootsYou
        };
        if (obstacle in obstacles) {
          this.obstacles.push(
            new obstacles[obstacle](x * TILE_SIZE, y * TILE_SIZE)
          );
        } else if (obstacle in enemies) {
          this.enemies.push(
            new enemies[obstacle](x * TILE_SIZE, y * TILE_SIZE)
          );
        } else if (obstacle == "e") {
          this.entranceX = x * TILE_SIZE;
          this.entranceY = y * TILE_SIZE;
        } else if (obstacle !== " ") {
          console.error("unknown obstacle:", obstacle);
        }
      });
    });
  }

  update() {
    for (const entity of [
      ...this.enemies,
      ...this.bullets,
      ...this.particles
    ]) {
      if (entity.update) entity.update(player, game);
    }
  }
  loop() {
    game.update();
    setTimeout(game.loop, game.speed);
  }
}
//uwu
const game = new Gamestate();
const player = new Player();

window.game = game;
window.player = player;

game.weapons.push(new Weapon(64, 64, true));

game.loop();
game.levels.push(
  [
    ["h", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "e", " ", " ", " ", " ", " ", " ", " "],
    ["c", " ", " ", " ", " ", " ", "f", " ", " ", " ", "t", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "b", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ],

  [
    [" ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "g", " ", " "],
    [" ", " ", "f", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "w", " ", "c", " ", " ", " ", " ", " "],
    ["e", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "t"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "w", " ", "h", "g", " ", "f", " ", " "],
    [" ", " ", "h", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ],

  [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "g", " ", " ", " ", " ", " ", " ", " ", " ", "g", " "],
    [" ", " ", "c", " ", " ", " ", " ", "c", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["t", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "h", "h", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "h", "h", " ", " ", " ", " ", " "],
    [" ", " ", "c", " ", " ", " ", " ", "c", " ", " ", " ", "e"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "g", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ],

  [
    [" ", " ", " ", " ", "f", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "g", " ", " "],
    [" ", " ", " ", "w", "b", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "h", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["e", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "w", " ", " ", " ", "h", " ", " ", "g", " "],
    [" ", " ", "h", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "f", " ", "t"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "f", " ", " ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ],

  [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "h", "h", "h", "h", "h", "h", " ", " ", " "],
    ["t", " ", " ", "h", " ", " ", " ", " ", "h", " ", " ", " "],
    [" ", " ", " ", "h", " ", "f", "f", " ", "h", " ", " ", " "],
    [" ", " ", " ", "h", " ", "f", "f", " ", "h", " ", " ", " "],
    [" ", " ", " ", "h", " ", " ", " ", " ", "h", " ", " ", "e"],
    [" ", " ", " ", "h", "h", "h", "h", "h", "h", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ],

  [
    ["c", " ", " ", "c", " ", " ", "c", " ", " ", "c", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["b", " ", " ", " ", "b", " ", " ", " ", "b", " ", " ", " "],
    ["e", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "h", "h", "h", "h", "h", " ", "g", " "],
    [" ", " ", " ", " ", "h", "h", "h", "h", "h", "g", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "t"],
    ["b", " ", " ", " ", "b", " ", " ", " ", "b", " ", " ", " "],
    ["c", " ", " ", "c", " ", " ", "c", " ", " ", "c", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ]
);

player.respawn();
