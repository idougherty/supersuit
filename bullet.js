import {
  isCollidingCircleEntities,
  removeIf,
  isCollidingRectEntities
} from "./util.js";

export class Bullet {
  constructor(x, y, vector, tag) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.width = 4;
    this.height = 4;
    this.vector = vector;
    this.speed = 3;
    this.tag = tag;
  }

  removeSelf(game) {
    removeIf(game.bullets, bullet => bullet === this);
  }

  update(player, game) {
    this.x += this.vector[0] * this.speed;
    this.y += this.vector[1] * this.speed;
    for (const obstacle of game.obstacles) {
      if (isCollidingRectEntities(this, obstacle)) {
        this.removeSelf(game);
        return;
      }
    }
    
    if (this.tag == "enemy"){
        if (isCollidingCircleEntities(this, player)) {
            alert(
                "bad"
            );
        }
    }
    if (this.tag == "player") {
        removeIf(game.enemies, enemy => {
            const isColliding = isCollidingCircleEntities(this, enemy);
            if (isColliding) {
                this.removeSelf(game);
                return isColliding;
            }
        });
    }
    
  }

  draw(c) {
    c.fillStyle = "grey";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
