import { Bullet } from "./bullet";

export class Enemy {
  constructor(x, y) {
    this.health = 1;
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.radius = 16;
    this.texture = "";
  }

  update(_player, _game) {}

  draw(c) {
    c.fillStyle = "brown";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Crachead extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.texture = "";
  }

  update(player, game) {
    var dist = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
    var direction_vector = [
      (player.x - this.x) / dist,
      (player.y - this.y) / dist
    ];
    this.x += direction_vector[0] * 4;
    this.y += direction_vector[1] * 4;
  }
}

export class GuyThatShootsYou extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.texture = "";
  }

  update(player, game) {
    var dist = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
    var direction_vector = [
      (player.x - this.x) / dist,
      (player.y - this.y) / dist
    ];
    game.bullets.push(new Bullet(this.x, this.y, direction_vector, "enemy"));
  }
}
