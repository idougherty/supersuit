import { TILE_SIZE } from "./constants.js";

export class Crate {
  constructor(x, y) {
    this.width = 3 * TILE_SIZE;
    this.height = 3 * TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = "";
  }

  draw(c) {
    c.fillStyle = "#bd9647";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
