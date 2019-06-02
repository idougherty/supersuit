class Bullet{
  constructor(xPos, yPos, vector){
    this.x = xPos;
    this.y = yPos;
    this.vector = vector;
    this.speed = 3;
    this.size = 4;
  }
  
  update() {
    this.x += this.vector[0]*this.speed;
    this.y += this.vector[1]*this.speed;
  }
  
  draw() {
    c.fillStyle = "grey";
    c.fillRect(this.x, this.y, this.size);
  }
}