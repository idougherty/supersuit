import {
  isCollidingCircleEntities,
  removeIf,
  isCollidingRectEntities,
  removeIfEq
} from "./util.js";

import { Trapdoor } from "./trapdoor.js";

export class Bullet {
  constructor(x, y, vector, tag) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.width = 4;
    this.height = 4;
    this.vector = vector;
    this.speed = 10;
    this.tag = tag;
  }

  update(player, game) {
    this.x += this.vector[0] * this.speed;
    this.y += this.vector[1] * this.speed;
    for (const obstacle of game.obstacles) {
      if (
        obstacle instanceof Trapdoor &&
        isCollidingRectEntities(this, obstacle)
      ) {
        removeIfEq(game.bullets, this);
        return;
      }
    }

    if (this.tag == "enemy") {
      if (isCollidingCircleEntities(this, player)) {
        player.respawn();
      }
    }
    if (this.tag == "player") {
      removeIf(game.enemies, enemy => {
        const isColliding = isCollidingCircleEntities(this, enemy);
        if (isColliding) {
          enemy.kill(game);
          removeIfEq(game.bullets, this);
        }
        return isColliding;
      });
    }
  }

  draw(c) {
    c.fillStyle = "grey";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
