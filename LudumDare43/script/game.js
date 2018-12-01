function Game(){
	this.playing_area = new PlayingArea([5,5]);
	this.tutorial_on = true;
	this.jobs = [];
}

Game.prototype.loadElements = function(){
	this.display_monitor = new DisplayMonitor(document.getElementById("display_monitor"));
	this.terminal_group_movement = new TerminalGroupMovement(this);
	this.terminal_group_output = new TerminalGroupOutput(this);
	this.terminal_group_claw = new TerminalGroupClaw(this);
	this.terminal_group_mixer = new TerminalGroupMixer(this);
	this.terminal_group_loader = new TerminalGroupLoader(this);
	this.terminal_group_reports = new TerminalGroupReports(this);
	this.terminal_group_light = new TerminalGroupLight(this);
}

Game.prototype.startTutorial = function(){
	this.tutorial.startTutorial();
}

Game.prototype.endTutorial = function(){
	this.tutorial_on = false;
	this.startGame();
}

Game.prototype.startGame = function(){
	
}

Game.prototype.addJob = function(){
	this.jobs.push(new Job());
}