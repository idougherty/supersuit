export class Weapon {
  constructor(x, y, loaded, weapon = "gun") {
    this.x = x;
    this.y = y;
    this.loaded = loaded;
    this.height = 16;
    this.width = 16;
    this.radius = 8;
    this.weapon = weapon;
  }

  draw(c) {
    if(this.loaded) {
      c.globalAlpha = 1;
    } else {
      c.globalAlpha = 0.4;
    }
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
    c.globalAlpha = 1;
  }
}
