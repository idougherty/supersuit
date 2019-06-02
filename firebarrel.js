export class FireBarrel {
  constructor(xPos, yPos) {
    this.width = 64;
    this.height = 64;
    this.xPos = xPos;
    this.yPos = yPos;
    this.texture = "";
  }

  draw(c) {
    c.fillStyle = "orange";
    c.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
