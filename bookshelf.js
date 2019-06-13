import { TILE_SIZE } from "./constants.js";
import { loadImage } from "./img.js";

const bookshelfTexture = loadImage(require("./art/bookshelf.png"));

export class Bookshelf {
  constructor(x, y) {
    this.width = 4 * TILE_SIZE;
    this.height = TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = bookshelfTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
    //c.fillStyle = "brown";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }
}
