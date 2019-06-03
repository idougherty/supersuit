import { TILE_SIZE } from "./constants.js";
import { loadImage } from "./img.js";

const wallTexture = loadImage("art/wall.png");

export class Wall {
  constructor(x, y) {
    this.width = TILE_SIZE;
    this.height = 3 * TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = wallTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
    //c.fillStyle = "#999";
    ///c.fillRect(this.x, this.y, this.width, this.height);
  }
}
