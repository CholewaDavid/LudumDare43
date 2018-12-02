function TerminalGroupOutput(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	
	this.OutputEnum = Object.freeze({"A": 1, "B": 2, "C": 3, "del": 0})
	
	this.btn_output_A = new TerminalElementButton(document.getElementById("terminal_output_btn_1"), "Sends mixture on current position to output 'A'. Output 'A' takes 7 seconds to empty. Error when there is no mixture to be moved, output 'A' is not ready or the given mixture is not requested by any job.");
	this.btn_output_B = new TerminalElementButton(document.getElementById("terminal_output_btn_2"), "Sends mixture on current position to output 'B'. Output 'B' takes 15 seconds to empty. Error when there is no mixture to be moved, output 'B' is not ready or the given mixture is not requested by any job.");
	this.btn_output_C = new TerminalElementButton(document.getElementById("terminal_output_btn_3"), "Sends mixture on current position to output 'C'. Output 'C' takes 30 seconds to empty. Error when there is no mixture to be moved, output 'C' is not ready or the given mixture is not requested by any job.");
	this.btn_output_delete = new TerminalElementButton(document.getElementById("terminal_output_btn_4"), "Sends mixture on current position to be destroyed. Small disturbance when it's used. Error when there is no mixture to be moved.");
	
	this.light_output_A = new TerminalElementLight(document.getElementById("terminal_output_btn_light_1"), "green", "Indicates, if output 'A' is ready [green] or not [red]");
	this.light_output_B = new TerminalElementLight(document.getElementById("terminal_output_btn_light_2"), "green", "Indicates, if output 'B' is ready [green] or not [red]");
	this.light_output_C = new TerminalElementLight(document.getElementById("terminal_output_btn_light_3"), "green", "Indicates, if output 'C' is ready [green] or not [red]");
	
	this.controls.push(this.btn_output_A, this.btn_output_B, this.btn_output_C, this.btn_output_delete, this.light_output_A, this.light_output_B, this.light_output_C);
	
	this.outputs = new Array(3);
	for(var i = 0; i < 3; i++)
		this.outputs[i] = false;
	
	this.setEvents();
}

TerminalGroupOutput.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupOutput.prototype.sendOutput = function(output_enum){
	if(this.playing_area.claw_held_mixture == null){
		this.breakSomething(4);
		return;
	}
	
	switch(output_enum){
		case this.OutputEnum.A:
			if(this.outputs[0])
				this.breakSomething(5);
			else{
				if(!this.game.job_manager.checkFinished(this.game.job_manager.JobTypeEnum.output, "A")){
					this.breakSomething(10);
					return;
				}
				this.outputs[0] = true;
				this.light_output_A.setColor("red");
				setTimeout(function(){game.terminal_group_output.emptyOutput(game.terminal_group_output.OutputEnum.A);}, 7000);
				this.playing_area.claw_held_mixture = null;
				this.game.terminal_group_claw.grab_light.setColor("red");
			}
			break;
		case this.OutputEnum.B:
			if(this.outputs[1])
				this.breakSomething(5);
			else{
				if(!this.game.job_manager.checkFinished(this.game.job_manager.JobTypeEnum.output, "B")){
					this.breakSomething(10);
					return;
				}
				this.outputs[1] = true;
				this.light_output_B.setColor("red");
				setTimeout(function(){game.terminal_group_output.emptyOutput(game.terminal_group_output.OutputEnum.B);}, 15000);
				this.playing_area.claw_held_mixture = null;
				this.game.terminal_group_claw.grab_light.setColor("red");
			}
			break;
		case this.OutputEnum.C:
			if(this.outputs[2])
				this.breakSomething(5);
			else{
				if(!this.game.job_manager.checkFinished(this.game.job_manager.JobTypeEnum.output, "C")){
					this.breakSomething(10);
					return;
				}
				this.outputs[2] = true;
				this.light_output_C.setColor("red");
				setTimeout(function(){game.terminal_group_output.emptyOutput(game.terminal_group_output.OutputEnum.C);}, 30000);
				this.playing_area.claw_held_mixture = null;
				this.game.terminal_group_claw.grab_light.setColor("red");
			}
			break;
		case this.OutputEnum.del:
			this.playing_area.claw_held_mixture = null;
			this.game.terminal_group_claw.grab_light.setColor("red");
			this.breakSomething(5);
	}
}

TerminalGroupOutput.prototype.emptyOutput = function(output_enum){
	switch(output_enum){
		case this.OutputEnum.A:
			this.outputs[0] = false;
			this.light_output_A.setColor("green");
			break;
		case this.OutputEnum.B:
			this.outputs[1] = false;
			this.light_output_B.setColor("green");
			break;
		case this.OutputEnum.C:
			this.outputs[2] = false;
			this.light_output_C.setColor("green");
			break;
	}
}

TerminalGroupOutput.prototype.checkTutorialMixture = function(){
	var mixture = this.playing_area.claw_held_mixture;
	if(mixture == null){
		game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.A);
		game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.B);
		game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.C);
		return;
	}
	if(mixture)
		game.tutorial.continueTutorial(true);
	game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.A);
	game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.B);
	game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.C);
}

TerminalGroupOutput.prototype.setEvents = function(){
	this.btn_output_A.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_output.btn_output_A.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.start){
				game.tutorial.continueTutorial(true);
				return;
			}
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.help){
				game.tutorial.continueTutorial(true);
				return;
			}
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.mixture){
				game.terminal_group_output.checkTutorialMixture();
				return;
			}
		}
		if(game.terminal_group_output.btn_output_A.eventHelpState())
			return;
		game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.A);
	};
	
	this.btn_output_B.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_output.btn_output_B.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.start){
				game.tutorial.continueTutorial(false);
				return;
			}
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.help){
				game.tutorial.continueTutorial(false);
				return;
			}
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.mixture){
				game.terminal_group_output.checkTutorialMixture();
				return;
			}
		}
		if(game.terminal_group_output.btn_output_B.eventHelpState())
			return;
		game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.B);
	};
	
	this.btn_output_C.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_output.btn_output_C.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
			if(game.tutorial.current_tutorial_phase == game.tutorial.TutorialPhaseEnum.mixture){
				game.terminal_group_output.checkTutorialMixture();
				return;
			}
		}
		if(game.terminal_group_output.btn_output_C.eventHelpState())
			return;
		game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.C);
	};
	
	this.btn_output_delete.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_output.btn_output_delete.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_output.btn_output_delete.eventHelpState())
			return;
		game.terminal_group_output.sendOutput(game.terminal_group_output.OutputEnum.del);
	};
	
	this.light_output_A.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_output.light_output_A.lowerHealth(game.control_use_damage);
		game.terminal_group_output.light_output_A.eventHelpState();
	};
	
	this.light_output_B.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_output.light_output_B.lowerHealth(game.control_use_damage);
		game.terminal_group_output.light_output_B.eventHelpState();
	};
	
	this.light_output_C.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_output.light_output_C.lowerHealth(game.control_use_damage);
		game.terminal_group_output.light_output_C.eventHelpState();
	};
}