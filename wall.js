class Wall extends Obstacle{
	constructor(xPos, yPos){
		this.width = 64;
		this.height = 192;
		this.xPos = xPos;
		this.yPos = yPos;
		this.texture = "";
	}
	
	draw(){
		c.fillStyle "#999"
		c.fillRect(this.xPos, this.yPos, this.width, this.height);
	}
}