function JobManager(game){
	this.JobTypeEnum = Object.freeze({"output": 1});
	
	this.game = game;
	this.jobs = [];
	this.total_severity = 0;
	this.points = 0;
}

JobManager.prototype.writeJobs = function(){
	for(var i = 0; i < this.jobs.length; i++){
		game.display_monitor.addText(this.jobs[i].getString());
	}
	
	game.display_monitor.addText("Total severity: " + this.total_severity + "%");
}

JobManager.prototype.addJob = function(){
	var job_variant = Math.floor(Math.random() * 1+1);
	var severity;
	switch(job_variant){
		case 1:
			severity = 10;
			this.jobs.push(new JobOutput(severity, this.game));
			break;
	}
	
	this.total_severity += severity;
	this.game.terminal_group_reports.light_jobs.setColor("green");
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
	
	return found;
}