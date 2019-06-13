import { Bullet } from "./bullet.js";
import { Trapdoor } from "./trapdoor.js";
import {
  isCollidingRectEntities,
  entityCenter,
  isCollidingCircleEntities
} from "./util.js";
import { Weapon } from "./weapon.js";
import { Particle } from "./particle.js";
import { loadImage } from "./img.js";

export class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.radius = 16;
    this.texture = null;
  }

  update(_game) {}

  kill(game) {
    const [centerX, centerY] = entityCenter(this);
    const particle = () => {
      game.particles.push(
        new Particle(
          centerX + (Math.random() - 1) * this.width,
          centerY + (Math.random() - 1) * this.height
        )
      );
    };
    particle();
    particle();
    particle();
    particle();
    particle();
    particle();
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
    //c.fillStyle = "brown";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }

  calculateCollisions() {
    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }
    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.vy = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.vx = 0;
    }
  }
}

const cracheadTexture = loadImage(require("./art/crackhead.png"));

export class Crachead extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.texture = cracheadTexture;
  }

  update(game) {
    var dist = Math.sqrt(
      (game.player.x - this.x) ** 2 + (game.player.y - this.y) ** 2
    );
    var direction_vector = [
      (game.player.x - this.x) / dist,
      (game.player.y - this.y) / dist
    ];

    this.x += direction_vector[0] * 4;

    for (const obs of game.obstacles) {
      if (!(obs instanceof Trapdoor) && isCollidingRectEntities(this, obs)) {
        this.x -= direction_vector[0] * 4;
        this.vx = 0;
      }
    }

    this.y += direction_vector[1] * 4;

    for (const obs of game.obstacles) {
      if (!(obs instanceof Trapdoor) && isCollidingRectEntities(this, obs)) {
        this.y -= direction_vector[1] * 4;
        this.vy = 0;
      }
    }

    if (isCollidingCircleEntities(this, game.player)) {
      game.player.respawn();
    }
  }
}

const gunguyTexture = loadImage(require("./art/gunguy.png"));

export class GuyThatShootsYou extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.texture = gunguyTexture;
    this.reload = 10;
  }

  kill(game) {
    const [centerX, centerY] = entityCenter(this);
    game.weapons.push(
      new Weapon(centerX - this.width / 4, centerY - this.height / 4, true)
    );
    super.kill(game);
  }

  update(game) {
    this.reload -= 1;
    var dist = Math.sqrt(
      (game.player.x - this.x) ** 2 + (game.player.y - this.y) ** 2
    );
    var direction_vector = [
      (game.player.x - this.x) / dist,
      (game.player.y - this.y) / dist
    ];
    if (this.reload <= 0) {
      game.bullets.push(
        new Bullet(
          this.x + this.width / 2,
          this.y + this.height / 2,
          direction_vector,
          "enemy"
        )
      );
      this.reload = 25;
    }
  }
}
