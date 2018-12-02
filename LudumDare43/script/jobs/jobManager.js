function JobManager(game){
	this.JobTypeEnum = Object.freeze({"output": 1});
	
	this.game = game;
	this.jobs = [];
	this.total_severity = 0;
	this.points = 0;
	this.new_jobs = false;
	this.timeout = null;;
}

JobManager.prototype.writeJobs = function(){
	for(var i = 0; i < this.jobs.length; i++){
		game.display_monitor.addText(this.jobs[i].getString());
	}
	
	game.display_monitor.addText("Total severity: " + this.total_severity + "%");
	this.new_jobs = false;
}

JobManager.prototype.addJob = function(){
	if(!game.game_on)
			return;
	var job_variant = Math.floor(Math.random() * 1+1);
	var severity;
	switch(job_variant){
		case 1:
			severity = 10;
			this.jobs.push(new JobOutput(severity, this.game));
			break;
	}
	
	this.total_severity += severity;
	if(this.total_severity >= 100)
		game.endGame();
	
	this.new_jobs = true;
	this.game.terminal_group_reports.checkLights(true);
	
	this.checkRedAlert();
}

JobManager.prototype.checkFinished = function(job_type, data){
	var found = false;
	
	for(var i = 0; i < this.jobs.length; i++){
		switch(job_type){
			case this.JobTypeEnum.output:
				if(!(this.jobs[i] instanceof JobOutput))
					continue;
				if(this.jobs[i].isFinished(data)){
					this.total_severity -= this.jobs[i].severity;
					this.points += this.jobs[i].severity;
					this.jobs.splice(i, 1);
					i--;
					found = true;
				}
				break;
		}
	}
	
	this.checkRedAlert();
	
	return found;
}

JobManager.prototype.checkRedAlert = function(){
	if(this.total_severity >= 70 && this.timeout == null)
		this.redAlertOn();
	else if(this.total_severity < 70 && this.timeout != null)
		this.stopRedAlert();
}

JobManager.prototype.stopRedAlert = function(){
	clearTimeout(this.timeout);
	this.timeout = null;
}

JobManager.prototype.redAlertOn = function(){
	document.getElementById("red_alert").style.visibility = "visible";
	this.timeout = setTimeout(function(){game.job_manager.redAlertOff();}, 1000);
}

JobManager.prototype.redAlertOff = function(){
	document.getElementById("red_alert").style.visibility = "hidden";
	this.timeout = setTimeout(function(){game.job_manager.redAlertOff();}, 3000);
}