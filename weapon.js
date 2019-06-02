export class Weapon{
  constructor(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.height = 16;
    this.width = 16;
  }
  
  draw(c) {
    c.fillStyle = "blue";
    c.beginPath();
    c.arc(this.x + this.width/2, this.y + this.width/2, this.width/2, 0, 2*Math.PI);
    c.fill();
  }
}