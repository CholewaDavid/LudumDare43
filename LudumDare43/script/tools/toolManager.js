function ToolManager(){
	this.tool_pliers = new ToolPliers();
	this.tool_rubber_button = new ToolRubberButton(3);
	this.tool_light_bulb = new ToolLightBulb(3);
	this.tool_repair_kit = new ToolRepairKit(3);
}

ToolManager.prototype.setLight = function(light){
	this.tool_pliers.setLight(light);
	this.tool_rubber_button.setLight(light);
	this.tool_light_bulb.setLight(light);
	this.tool_repair_kit.setLight(light);
	
	if(light)
		document.getElementById("toolbox").classList.remove("darkness");
	else
		document.getElementById("toolbox").classList.add("darkness");
}