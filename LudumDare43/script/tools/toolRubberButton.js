function ToolRubberButton(amount){
	Tool.call(this, amount);
	
	this.btn_rubber_button = document.getElementById("toolbox_btn_rubber_button");
	this.txt_rubber_button_amount = document.getElementById("toolbox_span_rubber_button");
	
	this.active = false;
	this.btn_rubber_button.classList.add("inactive");
	
	this.updateText();
	this.setEvents();
}

ToolRubberButton.prototype = Object.create(Tool.prototype);

ToolRubberButton.prototype.addButton = function(){
	this.amount++;
	this.btn_rubber_button.disabled = false;
	this.updateText();
}

ToolRubberButton.prototype.updateText = function(){
	this.txt_rubber_button_amount.innerHTML = this.amount;
}

ToolRubberButton.prototype.activate = function(){
	this.setActive(!this.active);
}

ToolRubberButton.prototype.setActive = function(active){
	this.active = active;
	if(active){
		this.btn_rubber_button.classList.add("active");
		this.btn_rubber_button.classList.remove("inactive");
	}
	else{
		this.btn_rubber_button.classList.add("inactive");
		this.btn_rubber_button.classList.remove("active");
	}
}

ToolRubberButton.prototype.use = function(element){
	if(!element.isDestroyed() || !(element instanceof TerminalElementButton) || this.amount <= 0)
		return;
	
	element.repairDestroyed();
	element.health = 100;
	element.is_rubber = true;
	element.element.classList.add("rubber_button");
	
	this.amount--;
	if(this.amount <= 0)
		this.btn_rubber_button.disabled = true;
	this.setActive(false);
	this.updateText();
}

ToolRubberButton.prototype.setEvents = function(){
	this.btn_rubber_button.onclick = function(){
		game.tool_manager.tool_rubber_button.activate();
	}
}

ToolRubberButton.prototype.setLight = function(light){
	if(light){
		this.btn_rubber_button.classList.remove("darkness");
		this.txt_rubber_button_amount.classList.remove("darkness");
	}
	else{
		this.btn_rubber_button.classList.add("darkness");
		this.txt_rubber_button_amount.classList.add("darkness");
	}
}