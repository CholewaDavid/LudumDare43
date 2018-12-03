function TerminalGroupLoader(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	
	this.btn_element_1 = new TerminalElementButton(document.getElementById("terminal_loader_btn_1"), "Places 'H' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_2 = new TerminalElementButton(document.getElementById("terminal_loader_btn_2"), "Places 'C' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_3 = new TerminalElementButton(document.getElementById("terminal_loader_btn_3"), "Places 'O' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_4 = new TerminalElementButton(document.getElementById("terminal_loader_btn_4"), "Places 'Xe' element on current position. Error when there is a mixture on current position already.");
	this.btn_element_5 = new TerminalElementButton(document.getElementById("terminal_loader_btn_5"), "Places 'U' element on current position. Error when there is a mixture on current position already.");
	this.btn_h2o = new TerminalElementButton(document.getElementById("terminal_loader_btn_h2o"), "Places 'H2O' mixture, 0 mixed on current position. Error when there is a mixture on current position already.");
	this.btn_selector_left = new TerminalElementButton(document.getElementById("terminal_loader_btn_selector_left"), "Selects left element from the list in the element selector."); 
	this.btn_selector_right = new TerminalElementButton(document.getElementById("terminal_loader_btn_selector_right"), "Selects right element from the list in the element selector."); 
	this.btn_selector_load = new TerminalElementButton(document.getElementById("terminal_loader_btn_selector_load"), "Places element chosen in the selector on current position. Error when there is a mixture on current position already.");
	this.txt_selector = document.getElementById("terminal_loader_span_selector");
	
	this.selector_elements = ["H", "C", "O", "Xe", "U"];
	this.selector_id = 0;
	
	this.controls.push(this.btn_element_1, this.btn_element_2, this.btn_element_3, this.btn_element_4, this.btn_element_5, this.btn_h2o, this.btn_selector_left, this.btn_selector_right, this.btn_selector_load);
	
	this.setEvents();
	this.updateSelector();
}

TerminalGroupLoader.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupLoader.prototype.updateSelector = function(){
	this.txt_selector.innerHTML = this.selector_elements[this.selector_id];
}

TerminalGroupLoader.prototype.moveSelectorId = function(amount){
	this.selector_id += amount;
	if(this.selector_id < 0)
		this.selector_id = this.selector_elements.length - 1;
	else if(this.selector_id >= this.selector_elements.length)
		this.selector_id = 0;
	this.updateSelector();
}

TerminalGroupLoader.prototype.loadFromSelector = function(){
	this.createElement(this.selector_elements[this.selector_id]);
}

TerminalGroupLoader.prototype.createElement = function(element){
	if(this.playing_area.getMixture() != null){
		this.breakSomething(10);
		return;
	}
	
	var new_mixture = new Mixture();
	if(element == "H2O")
		new_mixture.elements.push("H", "H", "O");
	else
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
	this.btn_h2o.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_loader.btn_h2o.eventHelpState())
			return;
		game.terminal_group_loader.createElement("H2O");
	};
	this.btn_selector_left.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_loader.btn_selector_left.eventHelpState())
			return;
		game.terminal_group_loader.moveSelectorId(-1);
	};
	this.btn_selector_right.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_loader.btn_selector_right.eventHelpState())
			return;
		game.terminal_group_loader.moveSelectorId(1);
	};
	this.btn_selector_load.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_loader.btn_selector_load.eventHelpState())
			return;
		game.terminal_group_loader.loadFromSelector();
	};
}