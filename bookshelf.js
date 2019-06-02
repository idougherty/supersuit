import { TILE_SIZE } from "./constants.js";

export class Bookshelf {
  constructor(x, y) {
    this.width = 4 * TILE_SIZE;
    this.height = TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = "";
  }

  draw(c) {
    c.fillStyle = "brown";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
