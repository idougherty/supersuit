import { Obstacle } from "./obstacle.js";

export class FireBarrel extends Obstacle {
  constructor(xPos, yPos) {
    this.width = 64;
    this.height = 64;
    this.xPos = xPos;
    this.yPos = yPos;
    this.texture = "";
  }

  draw() {
    c.fillStyle = "orange";
    c.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
