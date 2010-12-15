var http = require("http");
var sys = require("sys");
var RDF = require("../vendor/rdf-parser/parser").RDF;
var fs = require("fs");

function generateFlatRDFJSONString(triples){
	var rdfjson = "";
	for(var i = 0; i < triples.length; i++){
//		sys.puts(sys.inspect(triples[i]));
		rdfjson += "{";
		var subject = triples[i].subject.toString();
//		sys.puts("subject: " + subject);
		var predicate = triples[i].predicate.toString();
		var object = triples[i].object == undefined ? undefined:triples[i].object.toString();
		var lang = triples[i].lang? triples[i].lang.toString() : "";
		var datatype = triples[i].datatype? triples[i].datatype.toString() : "";
		if(triples[i].type == "resource"){
			rdfjson += "\"s\" : { \"type\" : \"uri\", \"uri\" : \"" + subject + "\" },";
			rdfjson += "\"p\" : \"" + predicate + "\",";
			rdfjson += "\"o\" : { \"type\" : \"uri\", \"uri\" : \"" + object + "\" }";
		}
		else{
			rdfjson += "\"s\" : { \"type\" : \"uri\", \"uri\" : \"" + subject + "\" },";
			rdfjson += "\"p\" : \"" + predicate + "\",";
			rdfjson += "\"o\" : { \"type\" : \"literal\", \"val\" : \"" + object + "\" , \"lang\" : \"" + lang + "\", \"datatype\" : \"" + datatype + "\"}";
		}
		if(i != (triples.length - 1)){
			rdfjson += "},";
		}
		else{
			rdfjson += "}";
		}
	}
	return rdfjson;
}

function _toRDFJSON(rdf, type, callback){
	var rdfjson = "";
	if(type.toLowerCase() == "flat"){
		var triples = rdf.Match(null, null, null, null);
		rdfjson += "{ \"data\" : [";
		rdfjson += generateFlatRDFJSONString(triples);
		rdfjson += "]}";
//		sys.puts(rdfjson);
	}
	else if(type.toLowerCase() == "sparql"){
		var triples = rdf.Match(null, null, null, null);
		rdfjson += "{ \"head\" : { \"vars\" : [\"s\", \"p\", \"o\"]},";
		rdfjson += "\"results\" : { \"bindings\" : [";
		rdfjson += generateFlatRDFJSONString(triples);
		rdfjson += "]}}";
//		sys.puts(rdfjson);
	} 
//	else if(type.toLowerCase() == "rdfj"){
//		to be supported ...
//	}
//	else if(type.toLowerCase() == "jdil"){
//		to be supported ...
//	}
	else if(type.toLowerCase() == "talis"){
	//	sys.debug("here");
		var triples = rdf.Match(null, null, null, null);
		//TODO the parsing result is not correct.
		sys.puts(sys.inspect(triples));
		var subjects = new Array();
		for(var i = 0; i < triples.length; i++){
	//		sys.puts("bbb");
			if(subjects.indexOf(triples[i].subject) != -1 ){
				continue;
			}
			else{
				subjects.push(triples[i].subject);
			}		
		}
//		sys.debug(sys.inspect(subjects));
		rdfjson += "{";
		for(var i = 0; i < subjects.length; i++){
	//		sys.puts("aaa");
			rdfjson += " \""+subjects[i]+"\" : {";
			var groupSubjects = rdf.Match(null, subjects[i], null, null);
			var predicates = new Array();
			for(var j = 0; j < groupSubjects.length; j++){
				if(predicates.indexOf(groupSubjects[j].predicate) != -1){
					continue;
				}
				else{
					predicates.push(groupSubjects[j].predicate);
				}
			}
			for(var j = 0; j < predicates.length; j++){
				rdfjson += "\""+predicates[j]+"\" : [";
				groupObjects = rdf.Match(null, subjects[i], predicates[j], null);
				for(var k = 0; k < groupObjects.length; k++){
	//				sys.debug("len: "+groupObjects.length);
	//				sys.debug(sys.inspect(groupObjects[k]));
					var object = groupObjects[k].object;
	//				sys.debug(groupObjects[k].type);
					if(!groupObjects[k].type) continue;//TODO If the parsing result is correct, each statement should always have this type info.
					if(groupObjects[k].type.toString() == "literal"){
	//					sys.debug("literal");
						rdfjson += "{ \"value\" : \""+object.toString()+"\", \"type\" : \"uri\"";
						if(groupObjects[k].datatype){
							rdfjson += ", \"datatype\" : \""+groupObjects[k].datatype.toString() +"\"";
						}
						if(groupObjects[k].lang){
							rdfjson += ", \"lang\" : \""+groupObjects[k].lang.toString() + "\"";
						}
						rdfjson += "}";
					}
					else if(groupObjects[k].type.toString() == "resource"){
	//					sys.debug("resource");
						if(object.toString().substr(0, 2) == "_:n"){
							rdfjson += "{ \"value\" : \"" + object.toString() + "\", \"type\" : \"bnode\"}"; 
						}
						else{
							rdfjson += "{ \"value\" : \""+ object.toString() + "\", \"type\" : \"uri\"}";
						}
					}
					if(k < groupObjects.length - 1){
						rdfjson += ",";
					}
				}
				rdfjson += "]";
				if(j < predicates.length - 1)
					rdfjson += ",";
			}
			rdfjson += "}";
			if(i < subjects.length - 1)
				rdfjson += ",";
		}
		rdfjson += "}";
//		sys.puts(rdfjson);
	}
//	sys.debug("node-rdf " + rdfjson);
	callback(null, rdfjson);
}

exports.convertStringIntoRDFJSON = function(rdfxml, type, callback){
	var rdf = new RDF();
	rdf.loadRDFXML(rdfxml);
//	sys.debug(rdf.Match(null, null, null, null));	
	_toRDFJSON(rdf, type, function(err, rdfjson){
		callback(null, rdfjson);
	});
};

exports.convertFileIntoRDFJSON = function(filepath, type, callback){
//	sys.debug("herehere");
	var self = this;
	var rdf = new RDF();
	fs.readFile(filepath, function(err, data){
		self.convertStringIntoRDFJSON(data, type, function(err, rdfjson){
//			sys.puts(rdfjson);
			callback(null, rdfjson);
		});
	});
};

exports.convertURLIntoRDFJSON = function(url, type, callback){
	var rdf = new RDF();
//	sys.puts("here");
	rdf.getRDFURL(url, function(){
//		sys.debug(sys.inspect(rdf.Match(null, null, null, null)));
		_toRDFJSON(rdf, type, function(err, rdfjson){
			callback(null, rdfjson);
		});
	});
};