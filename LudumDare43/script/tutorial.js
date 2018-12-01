function Tutorial(game){
	this.game = game;
	this.TutorialPhaseEnum = Object.freeze({"start": 1, "help": 2, "movement": 3, "mixture": 4});
	
	this.current_tutorial_phase = this.TutorialPhaseEnum.start;
}

Tutorial.prototype.startTutorial = function(){
	this.game.display_monitor.addText("Greetings. I would like to congratulate you for your new position as the 'Smelly Corp. Facility B Operator'.\nYour job will be mixing elements and taking care of other things as needed.\n\nDo you need some help? [Output A - Yes/Output B - No]\n");
}

Tutorial.prototype.continueTutorial = function(yes){
	if(!yes){
		this.game.display_monitor.addText("Well then... Good luck!\n");
		this.game.endTutorial();
		return;
	}
	switch(this.current_tutorial_phase){
		case this.TutorialPhaseEnum.start:
			this.game.display_monitor.addText("\nExcellent\nAs you can see, there are a lot of buttons and lights. Don't worry, there are many buttons, that only make things easier, you actually need only a few of them.\n'Help' button let's you find out what are these buttons and lights about. Try it.\nOnce you are done experimenting, continue with [Output A] or end with [Output B]\n");
			this.current_tutorial_phase = this.TutorialPhaseEnum.help;
			break;
		case this.TutorialPhaseEnum.help:
			this.game.display_monitor.addText("\nLet's get to work. Your main goal will be creating chemical mixtures. Once outside of training, you will be completing jobs, which you can see using the 'Jobs' button.\nYou have a 5x5 working area, where you are moving with a 'Claw'. You can change and read its position on the bottom center of the terminal. Now, move your claw to position [2,4].");
			this.current_tutorial_phase = this.TutorialPhaseEnum.movement;
			break;
		case this.TutorialPhaseEnum.movement:
			this.game.display_monitor.addText("\nWe are running out of time. Don't worry, nothing to worry about. Let's just speed it up a bit...\nYou can put new elements on claw position with a Loader (not if there is already something).\nUse 'Grab' and 'Drop' to move mixtures to other places. You can put them together this way.\nUse mixer to mix elements in mixture to desired value.\nUse 'Scan' if you are not sure, what you did. Light next to 'Scan' tells you that there is a mixture on claw position.\nUse output to send held mixture outside.\nMake H2O, 3x mixed and put it to any output (except for destruction). No rush...");
			this.current_tutorial_phase = this.TutorialPhaseEnum.mixture;
			break;
		case this.TutorialPhaseEnum.mixture:
	this.game.display_monitor.addText("\nThank god. OK, quick info about the hardware: buttons, lights and even the monitor get worn out with repetitive usage.\nUse 'State' to find out how worn out is something. You can use repair kits to fix it, but you will not have enought of those.\nRubber buttons are without text and can fall, light bulbs cannot be clicked. Still, better than nothing.\nOr use pliers to move buttons or lights from place to place. Moved controls will lose some durability doing so, so think before doing.\nChoose, what you need and what you can ignore. Find various ways of doing the same thing.\n\nDON'T LET THE JOB SEVERITY REACH 100%\n\nOK, have to go, bye!");
			this.game.endTutorial();
	}
}