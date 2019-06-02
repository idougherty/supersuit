export class Weapon {
  constructor(xPos, yPos, loaded, weapon = "gun") {
    this.x = xPos;
    this.y = yPos;
    this.loaded = true;
    this.height = 16;
    this.width = 16;
    this.radius = 8;
    this.weapon = weapon;
  }

  draw(c) {
    c.fillStyle = "blue";
    c.beginPath();
    c.arc(
      this.x + this.width / 2,
      this.y + this.width / 2,
      this.radius,
      0,
      2 * Math.PI
    );
    c.fill();
  }
}
