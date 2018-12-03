function TerminalGroupDisplay(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	
	this.btn_line = new TerminalElementButton(document.getElementById("terminal_display_group_1"), "Writes a seperating line on the monitor");
	this.btn_clear = new TerminalElementButton(document.getElementById("terminal_display_group_3"), "Removes all text from the monitor");
	this.btn_hello = new TerminalElementButton(document.getElementById("terminal_display_group_5"), "Writes a nice text on the monitor");
	this.btn_up = new TerminalElementButton(document.getElementById("terminal_display_group_2"), "Moves all text down one line");
	this.btn_down = new TerminalElementButton(document.getElementById("terminal_display_group_4"), "Moves all text up one line");
	
	this.controls.push(this.btn_line, this.btn_clear, this.btn_hello, this.btn_up, this.btn_down);
	
	this.setEvents();
}

TerminalGroupDisplay.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupDisplay.prototype.writeLine = function(){
	this.game.display_monitor.addText("---------------");
}

TerminalGroupDisplay.prototype.clearMonitor = function(){
	this.game.display_monitor.clear();
}

TerminalGroupDisplay.prototype.hello = function(){
	this.game.display_monitor.addText("Heyoo! :)\n");
	this.game.display_monitor.addText("     __//");
	this.game.display_monitor.addText("    /.__.\\");
	this.game.display_monitor.addText("    \\ \\/ /");
	this.game.display_monitor.addText(" '__/    \\");
	this.game.display_monitor.addText("  \\-      )");
	this.game.display_monitor.addText("   \\_____/");
	this.game.display_monitor.addText("_____|_|____");
	this.game.display_monitor.addText("     \" \"");
}

TerminalGroupDisplay.prototype.up = function(){
	this.game.display_monitor.textbox.scrollTop -= 18;
}

TerminalGroupDisplay.prototype.down = function(){
	this.game.display_monitor.textbox.scrollTop += 18;
}

TerminalGroupDisplay.prototype.setEvents = function(){
	this.btn_line.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_display.btn_line.eventHelpState())
			return;
		game.terminal_group_display.writeLine();
	};
	this.btn_clear.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_display.btn_clear.eventHelpState())
			return;
		game.terminal_group_display.clearMonitor();
	};
	this.btn_hello.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_display.btn_hello.eventHelpState())
			return;
		game.terminal_group_display.hello();
	};
	this.btn_up.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_display.btn_up.eventHelpState())
			return;
		game.terminal_group_display.up();
	};
	this.btn_down.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_display.btn_down.eventHelpState())
			return;
		game.terminal_group_display.down();
	};
}