#node-rdf2json

node-rdf2json can help users in transforming RDF/XML (resource centric) into JSON (key-value centric).

#Usage:

Add node-rdf2json module to your require path:

	var rdf2json = require("rdf2json");

Generate JSON based on a URL:

	rdf2json.rdf2json.convertURLIntoRDFJSON(url, format, function(err, json){
		...
	});

Generate JSON from an RDF file:

	rdf2json.convertFileIntoRDFJSON(filepath, format, function(err, json){
		...
	});

Generate JSON from a RDF string:

	rdf2json.convertStringIntoRDFJSON(str, format, function(err, json){
		...
	});

#Supported RDF/JSON formats

As the time of the last release, there is no "standard" mapping between RDF and JSON and node-rdf2json supports the following RDF/JSON formats (will be extended continuously):

[1] "flat": Flat RDF/JSON format.

example: 	
	
	rdf2json.convertFileIntoRDFJSON("../wine.rdf", "flat", function(err, rdfjson){
		// do something with rdfjson
	});

[2] "sparql": SPARQL RDF/JSON format.

example: 	
	
	rdf2json.convertURLIntoRDFJSON("http://www.w3.org/TR/owl-guide/wine.rdf", "sparql", function(err, rdfjson){
		// do something with rdfjson
	});

[3] "talis": Talis RDF/JSON format.

exmaple: 	
	
	rdf2json.convertStringIntoRDFJSON("" +
		"<?xml version=\"1.0\"?>" +
		"	<!DOCTYPE rdf:RDF [" +
		"		<!ENTITY vin  \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\" >" +
	   	"		<!ENTITY food \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#\" >" +
	   	"		<!ENTITY owl  \"http://www.w3.org/2002/07/owl#\" >" +
	   	"		<!ENTITY xsd  \"http://www.w3.org/2001/XMLSchema#\" >" +
	   	"]>" +
		"..." +
		"</rdf:RDF>", "talis", function(err, rdfjson){
		// do something with rdfjson
	});
	