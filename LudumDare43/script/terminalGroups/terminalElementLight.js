function TerminalElementLight(element, color, help_text){
	TerminalElement.call(this, element, help_text);
	
	this.setColor(color);
}

TerminalElementLight.prototype = Object.create(TerminalElement.prototype);

TerminalElementLight.prototype.setColor = function(color){
	this.element.style.backgroundColor = color;
}