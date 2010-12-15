node-rdf2json

node-rdf2json can help users in transforming RDF/XML (resource centric) into JSON (key-value centric).

Usage:

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

exports.convertStringIntoRDFJSON(str, format, function(err, json){
	...
});

As the time of the last release, there is no "standard" mapping between RDF and JSON and node-rdf2json supports the following RDF/JSON formats (will be extended continuously):

[1] "flat": Flat RDF/JSON format.

	example: TBW ...

[2] "sparql": SPARQL RDF/JSON format.

	example: TBW ...

[3] "talis": Talis RDF/JSON format.

	exmaple: TBW ...
	