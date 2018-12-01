function PlayingArea(size){
	this.size = size.slice();

	this.area = new Array(size[0]);
	for(var i = 0; i < size[0]; i++)
		this.area[i] = new Array(size[1]);
	
	this.claw_position = [0,0];
	this.claw_held_mixture = null;
}

PlayingArea.prototype.getMixture = function(){
	return this.area[this.claw_position[0]][this.claw_position[1]];
}

PlayingArea.prototype.grabMixture = function(){
	if(this.claw_held_mixture != null)
		return;
	
	var mixture = this.getMixture();
	if(mixture == null)
		return;
	
	this.claw_held_mixture = this.getMixture();
	this.area[this.claw_position[0]][this.claw_position[1]] = null;
}

PlayingArea.prototype.dropMixture = function(){
	if(this.claw_held_mixture == null)
		return;
	
	var currentMixture = this.getMixture();
	if(currentMixture == null)
		this.area[this.claw_position[0]][this.claw_position[1]] = this.claw_held_mixture;
	else
		this.area[this.claw_position[0]][this.claw_position[1]].addMixture(this.claw_held_mixture);
	
	this.claw_held_mixture = null;
}

PlayingArea.prototype.createMixture = function(mixture){
	if(this.getMixture() != null)
		return;
	
	this.area[this.claw_position[0]][this.claw_position[1]] = mixture;
}