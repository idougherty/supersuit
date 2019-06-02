import { TILE_SIZE } from "./constants.js";

export class FireBarrel {
  constructor(x, y) {
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = document.getElementById("barrel");
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
    //c.fillStyle = "orange";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }
}
