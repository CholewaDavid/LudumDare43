function Job(severity, game){
	this.severity = severity;
	this.game = game;
}

Job.prototype.getString = function(){
	return "";
}

Job.prototype.getSeverityText = function(){
	return "Severity: " + this.severity + "% - ";
}