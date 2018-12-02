function TerminalElementLight(element, color, help_text){
	TerminalElement.call(this, element, help_text);
	
	this.setColor(color);
}

TerminalElementLight.prototype = Object.create(TerminalElement.prototype);

TerminalElementLight.prototype.setColor = function(color){
	var output = !this.element.classList.contains(color);
	
	
	this.element.classList.remove("red");
	this.element.classList.remove("green");
	this.element.classList.remove("yellow");
	this.element.classList.remove("grey");
	this.element.classList.remove("black");
	
	this.element.classList.add(color);
	
	return output;
}

TerminalElementLight.prototype.destroyLight = function(){
	this.setColor("black");
}