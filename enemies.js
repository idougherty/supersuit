import { Bullet } from "./bullet.js";

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
  
  calculateCollisions() {
   if(this.y < 0){
      this.y = 0;
      this.vy = 0;
    }
    if(this.y + this.height > canvas.height){
      this.y = canvas.height - this.height;
      this.vy = 0;
    }
    if(this.x < 0){
      this.x = 0;
      this.vx = 0;
    }
    if(this.x + this.width > canvas.width){
      this.x = canvas.width - this.width;
      this.vx = 0;
    }
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
    this.reload = 10
  }

  update(player, game) {
    this.reload -= 1;
    var dist = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
    var direction_vector = [
      (player.x - this.x) / dist,
      (player.y - this.y) / dist
    ];
    if (this.reload <= 0) {
      game.bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height / 2, direction_vector, "enemy"));
      this.reload = 25
    }
  }
}
