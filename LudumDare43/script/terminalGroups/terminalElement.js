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

TerminalElement.prototype.lowerHealth = function(amount){
	if(this.health <= 0)
		return;
	this.health -= amount;
	if(this.health <= 0)
		this.element.className += " destroyed";
	else if(this.health <= 33)
		this.setDamageClass(2);
	else if(this.health <= 66)
		this.setDamageClass(1);
}

TerminalElement.prototype.setDamageClass = function(tier){
	this.element.classList.remove("damaged_1");
	this.element.classList.remove("damaged_2");
	
	switch(tier){
		case 1:
			this.element.classList.add("damaged_1");
			break;
		case 2:
			this.element.classList.add("damaged_2");
			break;
	}
}