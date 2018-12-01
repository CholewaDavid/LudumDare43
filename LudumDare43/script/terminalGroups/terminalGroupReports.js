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
	
	this.active_help = false;
	this.active_state = false;
	
	this.setEvents();
}

TerminalGroupReports.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupReports.prototype.help = function(){
	if(!this.active_help){
		this.activateHelp(true);
		return;
	}
	this.writeHelp(this.btn_help.help_text);
}

TerminalGroupReports.prototype.state = function(){
	if(!this.active_state){
		this.activateState(true);
		return;
	}
	this.writeState(this.btn_state.state);
}

TerminalGroupReports.prototype.jobs = function(){
	for(var i = 0; i < this.game.jobs.length; i++){
		this.game.display_monitor.addText(this.game.jobs[i].getString());
	}
}

TerminalGroupReports.prototype.scan = function(){
	var mixture = this.playing_area.getMixture();
	if(mixture == null){
		this.breakSomething();
		return;
	}
	
	this.game.display_monitor.addText(mixture.getString());
}

TerminalGroupReports.prototype.writeHelp = function(text){
	this.game.display_monitor.addText(text);
	this.activateHelp(false);
}

TerminalGroupReports.prototype.writeState = function(val){
	this.game.display_monitor.addText("State: " + val + "%");
	this.activateState(false);
}

TerminalGroupReports.prototype.activateHelp = function(activate){
	if(activate){
		this.active_help = true;
		this.light_help.setColor("green");
	}
	else{
		this.active_help = false;
		this.light_help.setColor("red");
	}
}

TerminalGroupReports.prototype.activateState = function(activate){
	if(activate){
		this.active_state = true;
		this.light_state.setColor("green");
	}
	else{
		this.active_state = false;
		this.light_state.setColor("red");
	}
}

TerminalGroupReports.prototype.activateScanLight = function(activate){
	if(activate)
		this.light_scan.setColor("green");
	else
		this.light_scan.setColor("red");
}

TerminalGroupReports.prototype.setEvents = function(){
	this.btn_help.element.onclick = function(){
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_help.eventHelpState())
			return;
		game.terminal_group_reports.help();
	};
	this.btn_state.element.onclick = function(){
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_state.eventHelpState())
			return;
		game.terminal_group_reports.state();
	};
	this.btn_jobs.element.onclick = function(){
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_jobs.eventHelpState())
			return;
		game.terminal_group_reports.jobs();
	}
	this.btn_scan.element.onclick = function(){
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_reports.btn_scan.eventHelpState())
			return;
		game.terminal_group_reports.scan();
	}
	this.light_help.element.onclick = function(){
		game.terminal_group_reports.light_help.eventHelpState();
	};
	this.light_state.element.onclick = function(){
		game.terminal_group_reports.light_state.eventHelpState();
	};
	this.light_jobs.element.onclick = function(){
		game.terminal_group_reports.light_jobs.eventHelpState();
	};
	this.light_scan.element.onclick = function(){
		game.terminal_group_reports.light_scan.eventHelpState();
	};
}