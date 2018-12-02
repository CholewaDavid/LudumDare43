function Tool(amount){
	this.amount = amount;
}

Tool.prototype.addTool = function(){
	this.amount += 1;
}

Tool.prototype.removeTool = function(){
	this.amount -= 1;
}