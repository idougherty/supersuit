import { TILE_SIZE } from "./constants.js";

export class Wall {
  constructor(x, y) {
    this.width = TILE_SIZE;
    this.height = 3 * TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = "";
  }

  draw(c) {
    c.fillStyle = "#999";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}