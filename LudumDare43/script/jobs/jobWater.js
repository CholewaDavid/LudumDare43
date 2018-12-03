function JobWater(severity, game){
	Job.call(this, severity, game);
	
	this.position = [Math.floor(Math.random()*this.game.playing_area.size[0]), Math.floor(Math.random()*this.game.playing_area.size[1])];
}

JobWater.prototype = Object.create(Job.prototype);

JobWater.prototype.isFinished = function(){
	var mixture = this.game.playing_area.area[this.position[0]][this.position[1]];
	
	if(mixture == null)
		return false;
	
	var water_mixture = new Mixture();
	water_mixture.mix = mixture.mix;
	water_mixture.elements.push("H", "H", "O")
	
	return water_mixture.compare(mixture);
}

JobWater.prototype.getString = function(){
	return this.getSeverityText() + "Put H2O on position [" + (this.position[0]+1) + "," + (this.position[1]+1) + "]";
}