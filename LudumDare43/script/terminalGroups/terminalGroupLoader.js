function TerminalGroupLoader(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	
	this.btn_element_1 = new TerminalElementButton(document.getElementById("terminal_loader_btn_1"), "Places 'H' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_2 = new TerminalElementButton(document.getElementById("terminal_loader_btn_2"), "Places 'C' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_3 = new TerminalElementButton(document.getElementById("terminal_loader_btn_3"), "Places 'O' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_4 = new TerminalElementButton(document.getElementById("terminal_loader_btn_4"), "Places 'Xe' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_5 = new TerminalElementButton(document.getElementById("terminal_loader_btn_5"), "Places 'U' element on current position. Error when there is a mixture on current position already.");
	
	this.controls.push(this.btn_element_1, this.btn_element_2, this.btn_element_3, this.btn_element_4, this.btn_element_5);
	
	this.setEvents();
}

TerminalGroupLoader.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupLoader.prototype.createElement = function(element){
	if(this.playing_area.getMixture() != null){
		this.breakSomething(10);
		return;
	}
	
	var new_mixture = new Mixture();
	new_mixture.elements.push(element);
	this.playing_area.createMixture(new_mixture);
	
	this.game.terminal_group_reports.checkLights(true);
}

TerminalGroupLoader.prototype.setEvents = function(){
	this.btn_element_1.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_loader.btn_element_1.eventHelpState())
			return;
		game.terminal_group_loader.createElement("H");
	};
	this.btn_element_2.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_loader.btn_element_2.eventHelpState())
			return;
		game.terminal_group_loader.createElement("C");
	};
	this.btn_element_3.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_loader.btn_element_3.eventHelpState())
			return;
		game.terminal_group_loader.createElement("O");
	};
	this.btn_element_4.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_loader.btn_element_4.eventHelpState())
			return;
		game.terminal_group_loader.createElement("Xe");
	};
	this.btn_element_5.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_loader.btn_element_5.eventHelpState())
			return;
		game.terminal_group_loader.createElement("U");
	};
}