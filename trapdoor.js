import { TILE_SIZE } from "./constants.js";
import { loadImage } from "./img.js";

const openTexture = loadImage(require("./art/trapdooropen.png"));
const closedTexture = loadImage(require("./art/trapdoorclosed.png"));

export class Trapdoor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = TILE_SIZE;
    this.width = TILE_SIZE;
    this.open = false;
  }

  draw(c) {
    if (this.open) {
      c.drawImage(openTexture, this.x, this.y, this.height, this.width);
    } else {
      c.drawImage(closedTexture, this.x, this.y, this.height, this.width);
    }
  }
}
