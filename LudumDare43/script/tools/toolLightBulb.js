function ToolLightBulb(amount){
	Tool.call(this, amount)
	
	this.btn_lightbulb = document.getElementById("toolbox_btn_lightbulb");
	this.txt_lightbulb_amount = document.getElementById("toolbox_span_lightbulb");
	
	this.active = false;
	this.btn_lightbulb.classList.add("inactive");
	
	this.updateText();
	this.setEvents();
}

ToolLightBulb.prototype = Object.create(Tool.prototype);

ToolLightBulb.prototype.activate = function(){
	this.setActive(!this.active);
}

ToolLightBulb.prototype.setActive = function(active){
	this.active = active;
	if(active){
		this.btn_lightbulb.classList.add("active");
		this.btn_lightbulb.classList.remove("inactive");
	}
	else{
		this.btn_lightbulb.classList.add("inactive");
		this.btn_lightbulb.classList.remove("active");
	}
}

ToolLightBulb.prototype.updateText = function(){
	this.txt_lightbulb_amount.innerHTML = this.amount;
}

ToolLightBulb.prototype.use = function(element){
	if(!element.isDestroyed() || !(element instanceof TerminalElementLight))
		return;
	
	element.repairDestroyed();
	element.health = 100;
	element.is_lightbulb = true;
	element.element.classList.add("lightbulb");
	
	this.amount--;
	if(this.amount <= 0)
		this.btn_lightbulb.disabled = true;
	this.setActive(false);
	this.updateText();
	
	for(var i = 0; i < game.control_groups.length; i++){
		game.control_groups[i].checkLights(false);
	}
}

ToolLightBulb.prototype.setEvents = function(){
	this.btn_lightbulb.onclick = function(){
		game.tool_manager.tool_light_bulb.activate();
	};
}