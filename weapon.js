export class Weapon {
  constructor(x, y, loaded, weapon = "gun") {
    this.x = x;
    this.y = y;
    this.loaded = loaded;
    this.height = 4;
    this.width = 16;
    this.radius = 8;
    this.texture = document.getElementById("gun");
    this.weapon = weapon;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
    if(this.loaded) {
      c.fillStyle = "rgba(0, 0, 0, .5)";
      c.fillRect(this.x-6, this.y-6, 12, 12);
    }
  }
}
