function ToolRepairKit(amount){
	Tool.call(this, amount);
	
	this.btn_repair_kit = document.getElementById("toolbox_btn_repair_kit");
	this.txt_repair_kit_amount = document.getElementById("toolbox_span_repair_kit");
	
	this.active = false;
	this.btn_repair_kit.classList.add("inactive");
	
	this.updateText();
	this.setEvents();
}

ToolRepairKit.prototype = Object.create(Tool.prototype);

ToolRepairKit.prototype.activate = function(){
	this.setActive(!this.active);
}

ToolRepairKit.prototype.setActive = function(active){
	this.active = active;
	if(active){
		this.btn_repair_kit.classList.add("active");
		this.btn_repair_kit.classList.remove("inactive");
	}
	else{
		this.btn_repair_kit.classList.add("inactive");
		this.btn_repair_kit.classList.remove("active");
	}
}

ToolRepairKit.prototype.updateText = function(){
	this.txt_repair_kit_amount.innerHTML = this.amount;
}

ToolRepairKit.prototype.use = function(element){
	if(element.isDestroyed() || element.is_rubber || element.is_lightbulb)
		return;
	
	element.lowerHealth(-(100-element.health));
	
	this.amount--;
	if(this.amount <= 0)
		this.btn_repair_kit.disabled = true;
	this.setActive(false);
	this.updateText();
}

ToolRepairKit.prototype.setEvents = function(){
	this.btn_repair_kit.onclick = function(){
		game.tool_manager.tool_repair_kit.activate();
	};
}