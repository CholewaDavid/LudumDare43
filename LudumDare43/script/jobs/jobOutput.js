function JobOutput(severity, game){
	Job.call(this, severity, game);
	
	var output_variants = ["A", "B", "C", "none"];
	this.output = output_variants[Math.floor(Math.random()*4)];
	
	var element_variants = ["H", "C", "O", "Xe", "U"];
	var element_count = Math.floor(Math.random()*4 + 1);
	var elements = [];
	for(var i = 0; i < element_count; i++)
		elements.push(element_variants[Math.floor(Math.random()*5)]);
	
	this.mixture = new Mixture();
	this.mixture.elements = elements.slice();
	if(elements.length != 1)
		this.mixture.mix = Math.floor(Math.random()*11);
}

JobOutput.prototype = Object.create(Job.prototype);

JobOutput.prototype.isFinished = function(data){
	if(this.output != "none" && data != this.output)
		return false;
	
	if(this.mixture.compare(this.game.playing_area.claw_held_mixture))
		return true;
	
	return false;
}

JobOutput.prototype.getString = function(){
	var output = this.getSeverityText() + "Send " + this.mixture.getString();
	if(this.output == "none")
		output += " to any output.";
	else
		output += " to output '" + this.output + "'.";
	
	return output;
}