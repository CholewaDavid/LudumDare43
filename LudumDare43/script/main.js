var game = null;


window.onload = function(){
	game = new Game();
	game.loadElements();
	game.display_monitor.clear();
	game.tutorial = new Tutorial(game);
	game.startTutorial();
}