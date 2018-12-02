function TerminalGroupMixer(game){
	TerminalGroup.call(this, game);
	
	this.playing_area = this.game.playing_area;
	this.btn_mix_1 = new TerminalElementButton(document.getElementById("terminal_btn_mix_1"), "Mixes mixture on current position with power '1'. Error when there is no mixture or the mixture has only 1 element.");
	this.btn_mix_2 = new TerminalElementButton(document.getElementById("terminal_btn_mix_2"), "Mixes mixture on current position with power '2'. Error when there is no mixture or the mixture has only 1 element.");
	this.btn_mix_3 = new TerminalElementButton(document.getElementById("terminal_btn_mix_3"), "Mixes mixture on current position with power '5'. Error when there is no mixture or the mixture has only 1 element.");
	
	this.controls.push(this.btn_mix_1, this.btn_mix_2, this.btn_mix_3);
	
	this.setEvents();
}

TerminalGroupMixer.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupMixer.prototype.mix = function(amount){
	var mixture = this.playing_area.getMixture();
	if(mixture == null || mixture.elements.length <= 1){
		this.breakSomething(7);
		return;
	}
	
	mixture.mix += amount;
}

TerminalGroupMixer.prototype.setEvents = function(){
	this.btn_mix_1.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_mixer.btn_mix_1.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_mixer.btn_mix_1.eventHelpState())
			return;
		game.terminal_group_mixer.mix(1);
	};
	this.btn_mix_2.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_mixer.btn_mix_2.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_mixer.btn_mix_2.eventHelpState())
			return;
		game.terminal_group_mixer.mix(2);
	};
	this.btn_mix_3.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_mixer.btn_mix_3.lowerHealth(game.control_use_damage);
		if(game.tutorial_on){
			
		}
		if(game.terminal_group_mixer.btn_mix_3.eventHelpState())
			return;
		game.terminal_group_mixer.mix(5);
	};
}