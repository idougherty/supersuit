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
import { images, loadImageNow, loadImage } from "./img.js";

var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var c = canvas.getContext("2d");

c.imageSmoothingEnabled = false;

let win = false;

const PUNCH_COOL_DOWN = 50;

const playerFront = loadImage(require("./art/frozoefront.png"));
const playerFrontWalking = loadImage(require("./art/frozonefronttwalk.gif"));
const playerBack = loadImage(require("./art/frozoneback.png"));
const playerRightWalking = loadImage(require("./art/frorightwalk.gif"));
const playerLeftWalking = loadImage(require("./art/froleftwalk.gif"));

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
    this.punchCoolDown = PUNCH_COOL_DOWN;
    this.texture = playerFront;

    this.keydown = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: false
    };
  }

  draw() {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
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
        if (obs.open && isCollidingRectEntities(this, obs)) {
          game.currentLevel++;
          if (game.currentLevel > game.levels.length - 1) {
            win = true;
            return;
          }
          game.newObstacles(game.levels[game.currentLevel]);
          this.respawn();
          return;
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
      if (!(obs instanceof Trapdoor) && isCollidingRectEntities(this, obs)) {
        this.x -= this.vx;
        this.vx = 0;
      }
    }

    this.y += this.vy;

    for (const obs of game.obstacles) {
      if (!(obs instanceof Trapdoor) && isCollidingRectEntities(this, obs)) {
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
    this.texture = playerLeftWalking;
  }

  right() {
    if (this.vx < this.maxSpeed) {
      this.vx += 1;
    } else {
      this.vx = this.maxSpeed;
    }
    this.texture = playerRightWalking;
  }

  up() {
    if (this.vy > -this.maxSpeed) {
      this.vy -= 1;
    } else {
      this.vy = -this.maxSpeed;
    }
    this.texture = playerBack;
  }

  down() {
    if (this.vy < this.maxSpeed) {
      this.vy += 1;
    } else {
      this.vy = this.maxSpeed;
    }
    this.texture = playerFrontWalking;
  }

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
  if (game.player.weapon === "fist") {
    if (game.player.punchCoolDown > PUNCH_COOL_DOWN) {
      game.player.punch();
      game.player.punchCoolDown = 0;
    }
  } else {
    const [playerX, playerY] = entityCenter(game.player);
    const vector = calculateVector(playerX, playerY, e.offsetX, e.offsetY);
    game.player.shoot(vector);
  }
});

document.addEventListener("keydown", function(e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      game.player.keydown.LEFT = true;
      break;

    case "KeyW":
    case "ArrowUp":
      game.player.keydown.UP = true;
      break;

    case "KeyD":
    case "ArrowRight":
      game.player.keydown.RIGHT = true;
      break;

    case "KeyS":
    case "ArrowDown":
      game.player.keydown.DOWN = true;
      break;

    default:
      return;
  }
});

document.addEventListener("keyup", function(e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      game.player.keydown.LEFT = false;
      break;

    case "KeyW":
    case "ArrowUp":
      game.player.keydown.UP = false;
      break;

    case "KeyD":
    case "ArrowRight":
      game.player.keydown.RIGHT = false;
      break;

    case "KeyS":
    case "ArrowDown":
      game.player.keydown.DOWN = false;
      break;

    default:
  }
});

let cursorX = 0;
let cursorY = 0;

function calculateCursorCoords() {
  if (game.player.weapon === "fist") {
    const [playerX, playerY] = entityCenter(game.player);
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

const fist = loadImage(require("./art/itsafist.png"));
const gun = loadImage(require("./art/itsthegun.png"));
/** @param {CanvasRenderingContext2D} c */
function drawCursor(c) {
  if (game.player.weapon === "fist") {
    c.drawImage(fist, cursorX - 6, cursorY - 6, 12, 12);
    if (game.player.punchCoolDown < PUNCH_COOL_DOWN) {
      c.fillStyle = "rgba(0, 0, 0, .5)";
      c.fillRect(cursorX - 6, cursorY - 6, 12, 12);
    }
  } else {
    c.drawImage(gun, cursorX - 8, cursorY - 2, 16, 4);
  }
}

const endscreenImage = loadImage(require("./art/endscreen.jpg"));

function draw() {
  if (win) {
    c.drawImage(endscreenImage, 0, 0, canvas.width, canvas.height);
    return;
  }

  game.player.update();

  const prespeed =
    Math.sqrt(
      game.player.vx * game.player.vx + game.player.vy * game.player.vy
    ) + 0.5;

  game.speed = 120 / prespeed;

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

  game.player.draw(c);

  if (game.player.weapon === "fist") {
    c.beginPath();
    c.fillStyle = "darkred";
    c.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
    c.fill();
  }

  drawCursor(c);

  requestAnimationFrame(draw);
}

class Gamestate {
  constructor() {
    this.player = new Player();
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
      row.forEach(([type, entity], x) => {
        switch (type) {
          case "noop":
            break;
          case "entrance":
            this.entranceX = x * TILE_SIZE;
            this.entranceY = y * TILE_SIZE;
            break;
          case "enemy":
            this.enemies.push(new entity(x * TILE_SIZE, y * TILE_SIZE));
            break;
          case "obstacle":
            this.obstacles.push(new entity(x * TILE_SIZE, y * TILE_SIZE));
            break;
          default:
            console.error("unknown map entity type:", type);
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
      if (entity.update) entity.update(game);
    }
  }
  loop() {
    if (win) return;
    game.update();
    setTimeout(game.loop, game.speed);
  }
}

const game = new Gamestate();

window.game = game;

game.weapons.push(new Weapon(64, 64, true));

{
  // new scope so we don't accidentally use these one-off variables
  const _ = ["noop"];
  const e = ["entrance"];
  const c = ["obstacle", Crate];
  const b = ["obstacle", Bookshelf];
  const f = ["obstacle", FireBarrel];
  const w = ["obstacle", Wall];
  const t = ["obstacle", Trapdoor];
  const h = ["enemy", Crachead];
  const g = ["enemy", GuyThatShootsYou];

  game.levels.push(
    [
      [h, _, _, _, w, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, e, _, _, _, _, _, _, _],
      [c, _, _, _, _, _, f, _, _, _, t, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, b, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _]
    ],

    [
      [_, _, _, _, w, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, g, _, _],
      [_, _, f, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, w, _, c, _, _, _, _, _],
      [e, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, t],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, w, _, h, g, _, f, _, _],
      [_, _, h, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _]
    ],

    [
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, g, _, _, _, _, _, _, _, _, g, _],
      [_, _, c, _, _, _, _, c, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [t, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, h, h, _, _, _, _, _],
      [_, _, _, _, _, h, h, _, _, _, _, _],
      [_, _, c, _, _, _, _, c, _, _, _, e],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, g, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _]
    ],

    [
      [_, _, _, _, f, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, g, _, _],
      [_, _, _, w, b, _, _, _, _, _, _, _],
      [_, _, h, _, _, _, _, _, _, _, _, _],
      [e, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, w, _, _, _, h, _, _, g, _],
      [_, _, h, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, f, _, t],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, f, _, _, _, _, _, g, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _]
    ],

    [
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, h, h, h, h, h, h, _, _, _],
      [t, _, _, h, _, _, _, _, h, _, _, _],
      [_, _, _, h, _, f, f, _, h, _, _, _],
      [_, _, _, h, _, f, f, _, h, _, _, _],
      [_, _, _, h, _, _, _, _, h, _, _, e],
      [_, _, _, h, h, h, h, h, h, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _]
    ],

    [
      [c, _, _, c, _, _, c, _, _, c, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [b, _, _, _, b, _, _, _, b, _, _, _],
      [e, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, h, h, h, h, h, _, g, _],
      [_, _, _, _, h, h, h, h, h, g, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, t],
      [b, _, _, _, b, _, _, _, b, _, _, _],
      [c, _, _, c, _, _, c, _, _, c, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _, _, _, _]
    ]
  );
}

const titleImage = loadImageNow(require("./art/title.jpg"));
const explainImage = loadImageNow(require("./art/explain.jpg"));

titleImage.then(titleImgLoaded => {
  let startImage = "title";
  c.drawImage(titleImgLoaded, 0, 0, canvas.width, canvas.height);

  canvas.addEventListener("click", async function listener() {
    switch (startImage) {
      case "title":
        startImage = "explain";
        const explainImgLoaded = await explainImage;
        c.drawImage(explainImgLoaded, 0, 0, canvas.width, canvas.height);
        break;
      case "explain":
        canvas.removeEventListener("click", listener);
        await startGame();
        break;
    }
  });
});

async function startGame() {
  await Promise.all(images);
  requestAnimationFrame(draw);
  game.loop();
  game.player.respawn();
}
