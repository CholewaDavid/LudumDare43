function Game(){
	this.playing_area = new PlayingArea([5,5]);
	this.job_manager = new JobManager(this);
	this.tool_manager = new ToolManager();
	this.tutorial_on = true;
	this.game_on = true;
	this.timeout;
	this.new_job_time = 20000;
	this.control_use_damage = 5;
	this.control_groups = [];
	
	this.computer_hum = new Audio("sounds/computer_hum.ogg");
	this.computer_hum.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);
	this.computer_hum.play();
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
	this.terminal_group_display = new TerminalGroupDisplay(this);
	
	this.control_groups.push(this.terminal_group_movement, this.terminal_group_output, this.terminal_group_claw, this.terminal_group_mixer, this.terminal_group_loader, this.terminal_group_reports, this.terminal_group_light, this.terminal_group_display);
}

Game.prototype.startTutorial = function(){
	this.tutorial.startTutorial();
}

Game.prototype.endTutorial = function(){
	this.tutorial_on = false;
	this.startGame();
}

Game.prototype.startGame = function(){
	this.gameLoop();
}

Game.prototype.endGame = function(){
	clearTimeout(this.timeout);
	var audio = new Audio("sounds/explosion.wav");
	audio.play();
	this.game_on = false;
	this.display_monitor.clear();
	this.display_monitor.addText("JOB SEVERITY REACHED 100%\n\nINITIATING RAPID DISASSEMBLY\n\n\nJob severity solved: " + this.job_manager.points + "%\n\n\nThank You for Your collaboration.\nTo continue working, please create an alternate reality or turn back time.");
}

Game.prototype.gameLoop = function(){
	this.job_manager.addJob();
	this.new_job_time -= 500;
	this.timeout = setTimeout(function(){game.gameLoop();}, this.new_job_time);
}

Game.prototype.breakSomething = function(max_amount){
	for(var i = 0; i < this.control_groups.length; i++){
		if(Math.floor(Math.random() * 2) == 1)
			this.control_groups[i].breakSomething(Math.floor(Math.random() * max_amount + 1));
	}
}

Game.prototype.setLight = function(light){
	if(this.terminal_group_light.light_on == light)
		return;
	var audio = new Audio("sounds/light_switch.ogg");
	audio.play();
	for(var i = 0; i < this.control_groups.length; i++){
		this.control_groups[i].setLight(light);
	}
	this.tool_manager.setLight(light);
	if(light){
		document.getElementsByTagName("body")[0].classList.remove("darkness");
		document.getElementById("display_monitor").classList.remove("darkness");
		document.getElementById("terminal").classList.remove("darkness");
	}
	else{
		document.getElementsByTagName("body")[0].classList.add("darkness");
		document.getElementById("display_monitor").classList.add("darkness");
		document.getElementById("terminal").classList.add("darkness");
	}
}