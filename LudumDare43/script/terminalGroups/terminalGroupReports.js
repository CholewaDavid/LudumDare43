function TerminalGroupReports(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	
	this.btn_help = new TerminalElementButton(document.getElementById("terminal_report_btn_help"), "Allows to get help text about any button or light. Click desired control after clicking 'Help' button to get information.");
	this.btn_state = new TerminalElementButton(document.getElementById("terminal_report_btn_state"), "Informs about state of button or light. Every control starts at 100% durability, which is lowered by usage, disturbances and errors. Control is destroyed when durability reaches 0%.");
	this.btn_jobs = new TerminalElementButton(document.getElementById("terminal_report_btn_jobs"), "Writes full list of objectives. Each objective has its severity. When severity of all jobs reaches 100%, facility enters rapid deconstruction mode.");
	this.btn_scan = new TerminalElementButton(document.getElementById("terminal_report_btn_scan"), "Writes information about the mixture on current position. Error when there is no mixture.");
	
	this.light_help = new TerminalElementLight(document.getElementById("terminal_report_btn_light_help"), "red", "Indicates whether next button or light press will write 'Help' text [green] or not [red].");
	this.light_state = new TerminalElementLight(document.getElementById("terminal_report_btn_light_state"), "red", "Indicates whether next button or light press will write 'State' text [green] or not [red].");
	this.light_jobs = new TerminalElementLight(document.getElementById("terminal_report_btn_light_jobs"), "red", "Indicates whether there is new unseen job [green] or not [red].");
	this.light_scan = new TerminalElementLight(document.getElementById("terminal_report_btn_light_scan"), "red", "Indicates whether there is a mixture on current position [green] or not [red].");
	
	this.controls.push(this.btn_help, this.btn_state, this.btn_jobs, this.btn_scan, this.light_help, this.light_state, this.light_jobs, this.light_scan);
	
	this.active_help = false;
	this.active_state = false;
	
	this.setEvents();
}

TerminalGroupReports.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupReports.prototype.help = function(){
	if(!this.active_help){
		this.active_help = true;
		this.checkLights(true);
		return;
	}
	this.writeHelp(this.btn_help.help_text);
}

TerminalGroupReports.prototype.state = function(){
	if(!this.active_state){
		this.active_state = true
		this.checkLights(true);
		return;
	}
	this.writeState(this.btn_state.state);
}

TerminalGroupReports.prototype.jobs = function(){
	this.game.job_manager.writeJobs();
	this.checkLights(true);
}

TerminalGroupReports.prototype.scan = function(){
	var mixture = this.playing_area.getMixture();
	if(mixture == null){
		this.breakSomething(6);
		return;
	}
	
	this.game.display_monitor.addText(mixture.getString());
}

TerminalGroupReports.prototype.writeHelp = function(text){
	this.game.display_monitor.addText(text);
	this.active_help = false;
	this.checkLights(true);
}

TerminalGroupReports.prototype.writeState = function(val){
	this.game.display_monitor.addText("State: " + val + "%");
	this.active_state = false;
	this.checkLights(true);
}

TerminalGroupReports.prototype.checkLights = function(damage){
	if(!this.light_help.isDestroyed()){
		var change = false;
		if(this.active_help)
			change = this.light_help.setColor("green");
		else
			change = this.light_help.setColor("red");
		if(damage && change)
			this.light_help.lowerHealth(this.game.control_use_damage);
	}
	
	if(!this.light_state.isDestroyed()){
		var change = false;
		if(this.active_state)
			change = this.light_state.setColor("green");
		else
			change = this.light_state.setColor("red");
		if(damage && change)
			this.light_state.lowerHealth(this.game.control_use_damage);
	}
	
	if(!this.light_jobs.isDestroyed()){
		var change = false;
		if(this.game.job_manager.new_jobs)
			change = this.light_jobs.setColor("green");
		else
			change = this.light_jobs.setColor("red");
		if(damage && change)
			this.light_jobs.lowerHealth(this.game.control_use_damage);
	}
	
	if(!this.light_scan.isDestroyed()){
		var change = false;
		if(this.playing_area.getMixture() != null)
			change = this.light_scan.setColor("green");
		else
			change = this.light_scan.setColor("red");
		if(damage && change)
			this.light_scan.lowerHealth(this.game.control_use_damage);
	}
}

TerminalGroupReports.prototype.setEvents = function(){
	this.btn_help.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.btn_help.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_help.eventHelpState())
			return;
		game.terminal_group_reports.help();
	};
	
	this.btn_state.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.btn_state.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_state.eventHelpState())
			return;
		game.terminal_group_reports.state();
	};
	
	this.btn_jobs.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.btn_jobs.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_jobs.eventHelpState())
			return;
		game.terminal_group_reports.jobs();
	}
	
	this.btn_scan.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.btn_scan.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_scan.eventHelpState())
			return;
		game.terminal_group_reports.scan();
	}
	
	this.light_help.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.light_help.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.light_help.eventHelpState();
		game.terminal_group_reports.checkLights(false);
	};
	
	this.light_state.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.light_state.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.light_state.eventHelpState();
		game.terminal_group_reports.checkLights(false);
	};
	
	this.light_jobs.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.light_jobs.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.light_jobs.eventHelpState();
		game.terminal_group_reports.checkLights(false);
	};
	
	this.light_scan.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_reports.light_scan.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.light_scan.eventHelpState();
		game.terminal_group_reports.checkLights(false);
	};
}