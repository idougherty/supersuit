class Bookshelf extends Obstacle{
	constructor(xPos, yPos){
		this.width = 192;
		this.height = 64;
		this.xPos = xPos;
		this.yPos = yPos;
		this.texture = "";
	}
	
	draw(){
		c.fillStyle = "brown"
		c.fillRect(this.xPos, this.yPos, this.width, this.height);
	}
}