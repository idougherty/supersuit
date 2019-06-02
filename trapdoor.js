import { TILE_SIZE } from "./constants.js";

export class Trapdoor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = TILE_SIZE;
    this.width = TILE_SIZE;
    this.open = false;
    this.texture1 = document.getElement("trapdoorO");
    this.texture2 = document.getElement("trapdoorC");
  }

  draw(c) {
    if(open) {
      c.drawImage(this.texture1, this.x, this.y, this.height, this.width);
    }
    else {
      c.drawImage(this.texture2, this.x, this.y, this.height, this.width);
    }
    //c.fillStyle = "green";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }
}
