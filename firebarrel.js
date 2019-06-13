import { TILE_SIZE } from "./constants.js";
import { loadImage } from "./img.js";

const barrelTexture = loadImage(require("./art/barrel.png"));

export class FireBarrel {
  constructor(x, y) {
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = barrelTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
    //c.fillStyle = "orange";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }
}
