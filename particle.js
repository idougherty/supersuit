import { removeIfEq } from "./util.js";

export class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vy = 2.5;
    this.vx = 0;
    this.size = 5;
    this.color =
      "rgba(" + (Math.floor(Math.random() * 100) + 155) + ", 50, 30, 1)";
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
  }
  update(game) {
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() + 2;
    this.size -= Math.random() / 5;

    if (this.size <= 0) {
      removeIfEq(game.particles, this);
      return;
    }

    this.x += this.vx;
    this.y += this.vy;
  }
}
