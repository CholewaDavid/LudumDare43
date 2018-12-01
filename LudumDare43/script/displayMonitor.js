function DisplayMonitor(textbox){
	this.textbox = textbox;
}

DisplayMonitor.prototype.addText = function(new_text){
	this.textbox.value += new_text + "\n";
	this.textbox.scrollTop = this.textbox.scrollHeight
}

DisplayMonitor.prototype.clear = function(){
	this.textbox.value = "";
}