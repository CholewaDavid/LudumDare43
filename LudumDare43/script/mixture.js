function Mixture(){
	this.mix = 0;
	this.elements = [];
}

Mixture.prototype.addMixture = function(mixture){
	for(var i = 0; i < mixture.elements.length; i++)
		this.elements.push(mixture.elements[i]);
	this.mix = 0;
}

Mixture.prototype.getString = function(){
	var output = "Mixture: mix - " + this.mix + ", element - ";
	var found_elements = [];
	for(var i = 0; i < this.elements.length; i++){
		var cur_element = this.elements[i];
		var found = false;
		
		for(var j = 0; j < found_elements.length; j++){
			if(found_elements[j][0] == cur_element){
				found = true;
				found_elements[j][1]++;
				break;
			}
		}
		
		if(!found){
			found_elements.push([cur_element, 1]);
		}
	}
	
	for(var k = 0; k < found_elements.length; k++){
		output += found_elements[k][0] + ": " + found_elements[k][1];
		if(k != found_elements.length - 1)
			output += ", ";
	}
	return output;
}

Mixture.prototype.compare = function(mixture){
	if(this.mix != mixture.mix)
		return false;
	
	var found_elements_this = [];
	for(var i = 0; i < this.elements.length; i++){
		var cur_element = this.elements[i];
		var found = false;
		
		for(var j = 0; j < found_elements_this.length; j++){
			if(found_elements_this[j][0] == cur_element){
				found = true;
				found_elements_this[j][1]++;
				break;
			}
		}
		
		if(!found){
			found_elements_this.push([cur_element, 1]);
		}
	}
	
	var found_elements_other = [];
	for(var i = 0; i < mixture.elements.length; i++){
		var cur_element = mixture.elements[i];
		var found = false;
		
		for(var j = 0; j < found_elements_other.length; j++){
			if(found_elements_other[j][0] == cur_element){
				found = true;
				found_elements_other[j][1]++;
				break;
			}
		}
		
		if(!found){
			found_elements_other.push([cur_element, 1]);
		}
	}
	
	if(found_elements_this.length != found_elements_other)
		return false;
	
	for(var i = 0; i < found_elements_this.length; i++){
		var found = false;
		for(var j = 0; j < found_elements_other.length; j++){
			if(found_elements_this[i][0] == found_elements_other[j][0]){
				if(found_elements_this[i][1] != found_elements_other[j][1])
					return false;
				found = true;
			}
		}
		if(!found)
			return false;
	}
	
	return true;
}