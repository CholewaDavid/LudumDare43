function TerminalGroupMovement(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	this.btn_left_v = new TerminalElement(document.getElementById("terminal_movement_btn_left_1"), "Moves claw up one step. Goes to the far bottom if it's already on the top-most position.");
	this.btn_right_v = new TerminalElement(document.getElementById("terminal_movement_btn_right_1"), "Moves claw down one step. Goes to the far up if it's already on the bottom-most position.");
	this.btn_left_h = new TerminalElement(document.getElementById("terminal_movement_btn_left_2"), "Moves claw left one step. Goes to the far right if it's already on the left-most position.");
	this.btn_right_h = new TerminalElement(document.getElementById("terminal_movement_btn_right_2"), "Moves claw right one step. Goes to the far left if it's already on the right-most position.");
	this.display_v = document.getElementById("terminal_movement_display_1");
	this.display_h = document.getElementById("terminal_movement_display_2");
	
	this.controls.push(this.btn_left_v, this.btn_right_v, this.btn_left_h, this.btn_right_h);
	
	this.setEvents();
	this.updateDisplays();
}

TerminalGroupMovement.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupMovement.prototype.moveVertical = function(up){
	if(up){
		if(this.playing_area.claw_position[0] == 0)
			this.playing_area.claw_position[0] = this.playing_area.size[0] - 1;
		else
			this.playing_area.claw_position[0] -= 1;
	}
	else{
		if(this.playing_area.claw_position[0] == this.playing_area.size[0] - 1)
			this.playing_area.claw_position[0] = 0;
		else
			this.playing_area.claw_position[0] += 1;
	}
	
	this.updateDisplays();
}

TerminalGroupMovement.prototype.moveHorizontal = function(left){
	if(left){
		if(this.playing_area.claw_position[1] == 0)
			this.playing_area.claw_position[1] = this.playing_area.size[1] - 1;
		else
			this.playing_area.claw_position[1] -= 1;
	}
	else{
		if(this.playing_area.claw_position[1] == this.playing_area.size[1] - 1)
			this.playing_area.claw_position[1] = 0;
		else
			this.playing_area.claw_position[1] += 1;
	}
	this.updateDisplays();
}

TerminalGroupMovement.prototype.setEvents = function(){
	this.btn_left_v.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_movement.btn_left_v.lowerHealth(game.control_use_damage);
		if(game.terminal_group_movement.btn_left_v.eventHelpState())
			return;
		game.terminal_group_movement.moveVertical(true);
		if(game.tutorial_on){
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.movement){
				if(game.terminal_group_movement.checkTutorialPosition())
					return;
			}
		}
	};
	this.btn_right_v.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_movement.btn_right_v.lowerHealth(game.control_use_damage);
		if(game.terminal_group_movement.btn_right_v.eventHelpState())
			return;
		game.terminal_group_movement.moveVertical(false);
		if(game.tutorial_on){
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.movement){
				if(game.terminal_group_movement.checkTutorialPosition())
					return;
			}
		}
	};
	this.btn_left_h.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_movement.btn_left_h.lowerHealth(game.control_use_damage);
		if(game.terminal_group_movement.btn_left_h.eventHelpState())
			return;
		game.terminal_group_movement.moveHorizontal(true);
		if(game.tutorial_on){
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.movement){
				if(game.terminal_group_movement.checkTutorialPosition())
					return;
			}
		}
	};
	this.btn_right_h.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_movement.btn_right_h.lowerHealth(game.control_use_damage);
		if(game.terminal_group_movement.btn_right_h.eventHelpState())
			return;
		game.terminal_group_movement.moveHorizontal(false);
		if(game.tutorial_on){
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.movement){
				if(game.terminal_group_movement.checkTutorialPosition())
					return;
			}
		}
	};
}

TerminalGroupMovement.prototype.checkTutorialPosition = function(){
	if(this.playing_area.claw_position[0] == 1 && this.playing_area.claw_position[1] == 3){
		this.game.tutorial.continueTutorial(true);
		return true;
	}
	return false;
}

TerminalGroupMovement.prototype.updateDisplays = function(){
	this.display_v.innerHTML = this.playing_area.claw_position[0] + 1;
	this.display_h.innerHTML = this.playing_area.claw_position[1] + 1;

	if(this.game.terminal_group_reports != null){
		this.game.terminal_group_reports.checkLights(true);
	}
}