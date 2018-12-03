function ToolPliers(){
	Tool.call(this, 1);
	
	this.active = false;
	this.element = null;
	
	this.setEvents();
	document.getElementById("toolbox_btn_pliers").classList.add("inactive");
}

ToolPliers.prototype = Object.create(Tool.prototype);

ToolPliers.prototype.activate = function(){
	this.active = !this.active;
	if(!this.active)
		this.element = null;
	if(this.active){
		document.getElementById("toolbox_btn_pliers").classList.add("active");
		document.getElementById("toolbox_btn_pliers").classList.remove("inactive");
	}
	else{
		document.getElementById("toolbox_btn_pliers").classList.add("inactive");
		document.getElementById("toolbox_btn_pliers").classList.remove("active");
	}
}

ToolPliers.prototype.use = function(element){
	if(this.element == null){
		this.element = element;
		return;
	}
	
	if(this.element.isDestroyed()){
		this.activate();
		return;
	}
	
	if(!element.isDestroyed())
		return;
	
	if((this.element instanceof TerminalElementButton && element instanceof TerminalElementLight) || (this.element instanceof TerminalElementLight && element instanceof TerminalElementButton))
		return;
	
	if(this.element.is_rubber){
		game.tool_manager.tool_rubber_button.use(element);
		this.element.removeRubber();
	}
	else if(this.element.is_lightbulb){
		this.element.removeLightbulb();
		game.tool_manager.tool_light_bulb.use(element);
	}
	element.repairDestroyed();
	element.health = 0;
	element.lowerHealth(-this.element.health + 10);
	element.element.innerHTML = this.element.element.innerHTML;
	this.element.lowerHealth(this.element.health);
	
	this.activate();
}

ToolPliers.prototype.setEvents = function(){
	document.getElementById("toolbox_btn_pliers").onclick = function(){
		game.tool_manager.tool_pliers.activate();
	}
}

ToolPliers.prototype.setLight = function(light){
	if(light)
		document.getElementById("toolbox_btn_pliers").classList.remove("darkness");
	else
		document.getElementById("toolbox_btn_pliers").classList.add("darkness");
}