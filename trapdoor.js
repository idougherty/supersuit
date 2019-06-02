import { TILE_SIZE } from "./constants.js";

class Trapdoor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = TILE_SIZE;
    this.width = TILE_SIZE;
    this.open = false;
  }

  draw() {
    c.fillStyle = "green";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
