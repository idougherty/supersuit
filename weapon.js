class Weapon{
  constructor(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.height = 16;
    this.width = 16;
  }
  
  draw() {
    c.fillStyle = "blue";
    c.fillOval(this.x, this.y, this.width, this.height);
  }
}