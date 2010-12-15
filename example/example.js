var rdf2json = require("../lib/rdf2json");
var sys = require("sys");
rdf2json.convertFileIntoRDFJSON("../myfoaf.rdf", "talis", function(err, rdfjson){
//	sys.puts(rdfjson);
//	var jsonobj = eval("("+ rdfjson +")");
//	sys.puts(JSON.stringify(jsonobj));
});
//rdf2json.convertURLIntoRDFJSON("http://www.w3.org/TR/owl-guide/wine.rdf", "talis", function(err, rdfjson){
//	sys.debug("result: " + rdfjson);
//});