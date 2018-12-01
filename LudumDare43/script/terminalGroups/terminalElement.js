function TerminalElement(element, help_text){
	this.element = element;
	this.health = 100;
	this.help_text = help_text;
}

TerminalElement.prototype.eventHelpState = function(){
	if(game.terminal_group_reports.active_help){
		game.terminal_group_reports.writeHelp(this.help_text);
		return true;
	}
	if(game.terminal_group_reports.active_state){
		game.terminal_group_reports.writeState(this.health);
		return true;
	}
	return false;
}