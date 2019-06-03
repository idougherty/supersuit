import { TILE_SIZE } from "./constants.js";
import { loadImage } from "./img.js";

const crateTexture = loadImage("art/crate.png");

export class Crate {
  constructor(x, y) {
    this.width = 3 * TILE_SIZE;
    this.height = 3 * TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = crateTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
  }
}
