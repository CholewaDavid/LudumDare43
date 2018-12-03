function TerminalGroupClaw(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	
	this.btn_grab = new TerminalElementButton(document.getElementById("terminal_claw_btn_grab"), "Grabs mixture on current position. Error when already holding a mixture or there is no mixture to be grabbed.");
	this.btn_drop = new TerminalElementButton(document.getElementById("terminal_claw_btn_drop"), "Drops held mixture on current position. Error when the position is occupied or when the claw doesn't hold a mixture.");
	this.grab_light = new TerminalElementLight(document.getElementById("terminal_claw_btn_light_detected"), "red", "Signals whether claw holds a mixture [green] or not [red]");
	
	this.controls.push(this.btn_grab, this.btn_drop, this.grab_light);
		
	this.setEvents();
}

TerminalGroupClaw.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupClaw.prototype.grab = function(){
	if(this.playing_area.getMixture() == null || this.playing_area.claw_held_mixture != null){
		this.breakSomething(5);
		return;
	}
	
	this.playing_area.grabMixture();
	this.checkLights(true);
	this.game.terminal_group_reports.checkLights(true);
}

TerminalGroupClaw.prototype.drop = function(){
	if(this.playing_area.claw_held_mixture == null){
		this.breakSomething(10);
		return;
	}
	
	this.playing_area.dropMixture();
	this.checkLights(true);
	this.game.terminal_group_reports.checkLights(true);
	this.game.job_manager.checkFinished(this.game.job_manager.JobTypeEnum.water, null);
}

TerminalGroupClaw.prototype.checkLights = function(damage){
	if(this.grab_light.isDestroyed())
		return;
	var change = false;
	if(this.playing_area.claw_held_mixture != null)
		change = this.grab_light.setColor("green");
	else
		change = this.grab_light.setColor("red");
	if(damage && change)
		this.grab_light.lowerHealth(this.game.control_use_damage);
}

TerminalGroupClaw.prototype.setEvents = function(){
	this.btn_grab.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_claw.btn_grab.eventHelpState())
			return;
		game.terminal_group_claw.grab();
	};
	this.btn_drop.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_claw.btn_drop.eventHelpState())
			return;
		game.terminal_group_claw.drop();
	};
	this.grab_light.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_claw.grab_light.eventHelpState();
		game.terminal_group_claw.checkLights(false);
	};
}