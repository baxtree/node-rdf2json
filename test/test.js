var rdf2json = require("../lib/rdf2json");
var jsunit = require("mjsunit");

function testConvertStringIntoRDFJSON(){
	rdf2json.convertStringIntoRDFJSON("" +
			"<?xml version=\"1.0\"?>" +
			"	<!DOCTYPE rdf:RDF [" +
			"		<!ENTITY vin  \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\" >" +
     		"		<!ENTITY food \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#\" >" +
     		"		<!ENTITY owl  \"http://www.w3.org/2002/07/owl#\" >" +
     		"		<!ENTITY xsd  \"http://www.w3.org/2001/XMLSchema#\" >" +
     		"]>" +
			"<rdf:RDF" +
			"	xmlns     = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xmlns:vin = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xml:base  = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xmlns:food= \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#\"" +
			"	xmlns:owl = \"http://www.w3.org/2002/07/owl#\"" +
			"	xmlns:rdf = \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"" +
			"	xmlns:rdfs= \"http://www.w3.org/2000/01/rdf-schema#\"" +
			"	xmlns:xsd = \"http://www.w3.org/2001/XMLSchema#\">" +
			"" +
			"	<owl:Ontology rdf:about=\"\">" +
			"		<rdfs:comment>An example OWL ontology</rdfs:comment>" +
			" 		<owl:priorVersion>" +
			"			<owl:Ontology rdf:about=\"http://www.w3.org/TR/2003/CR-owl-guide-20030818/wine\"/>" +
			"		</owl:priorVersion>" +
			"		<owl:imports rdf:resource=\"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food\"/>" +
			"		<rdfs:comment>Derived from the DAML Wine ontology at " +
			"			http://ontolingua.stanford.edu/doc/chimaera/ontologies/wines.daml" +
			"			Substantially changed, in particular the Region based relations." +
			"		</rdfs:comment>" +
			"		<rdfs:label>Wine Ontology</rdfs:label>" +
			"	</owl:Ontology>" +
			"</rdf:RDF>", "flat", function(err, rdfjson){
		jsunit.assertNotNull("The generated flat RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The flat RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertFileIntoRDFJSON(){
	rdf2json.convertFileIntoRDFJSON("../wine.rdf", "flat", function(err, rdfjson){
		jsunit.assertNotNull("The generated flat RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The flat RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertURLIntoRDFJSON(){
	rdf2json.convertURLIntoRDFJSON("http://www.w3.org/TR/owl-guide/wine.rdf", "flat", function(err, rdfjson){
		jsunit.assertNotNull("The generated flat RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The flat RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertStringIntoRDFJSON(){
	rdf2json.convertStringIntoRDFJSON("" +
			"<?xml version=\"1.0\"?>" +
			"	<!DOCTYPE rdf:RDF [" +
			"		<!ENTITY vin  \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\" >" +
     		"		<!ENTITY food \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#\" >" +
     		"		<!ENTITY owl  \"http://www.w3.org/2002/07/owl#\" >" +
     		"		<!ENTITY xsd  \"http://www.w3.org/2001/XMLSchema#\" >" +
     		"]>" +
			"<rdf:RDF" +
			"	xmlns     = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xmlns:vin = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xml:base  = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xmlns:food= \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#\"" +
			"	xmlns:owl = \"http://www.w3.org/2002/07/owl#\"" +
			"	xmlns:rdf = \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"" +
			"	xmlns:rdfs= \"http://www.w3.org/2000/01/rdf-schema#\"" +
			"	xmlns:xsd = \"http://www.w3.org/2001/XMLSchema#\">" +
			"" +
			"	<owl:Ontology rdf:about=\"\">" +
			"		<rdfs:comment>An example OWL ontology</rdfs:comment>" +
			" 		<owl:priorVersion>" +
			"			<owl:Ontology rdf:about=\"http://www.w3.org/TR/2003/CR-owl-guide-20030818/wine\"/>" +
			"		</owl:priorVersion>" +
			"		<owl:imports rdf:resource=\"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food\"/>" +
			"		<rdfs:comment>Derived from the DAML Wine ontology at " +
			"			http://ontolingua.stanford.edu/doc/chimaera/ontologies/wines.daml" +
			"			Substantially changed, in particular the Region based relations." +
			"		</rdfs:comment>" +
			"		<rdfs:label>Wine Ontology</rdfs:label>" +
			"	</owl:Ontology>" +
			"</rdf:RDF>", "sparql", function(err, rdfjson){
		jsunit.assertNotNull("The generated SPARQL RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The SPARQL RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertFileIntoRDFJSON(){
	rdf2json.convertFileIntoRDFJSON("../wine.rdf", "sparql", function(err, rdfjson){
		jsunit.assertNotNull("The generated SPARQL RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The SPARQL RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertURLIntoRDFJSON(){
	rdf2json.convertURLIntoRDFJSON("http://www.w3.org/TR/owl-guide/wine.rdf", "sparql", function(err, rdfjson){
		jsunit.assertNotNull("The generated SPARQL RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The SPARQL RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertStringIntoRDFJSON(){
	rdf2json.convertStringIntoRDFJSON("" +
			"<?xml version=\"1.0\"?>" +
			"	<!DOCTYPE rdf:RDF [" +
			"		<!ENTITY vin  \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\" >" +
     		"		<!ENTITY food \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#\" >" +
     		"		<!ENTITY owl  \"http://www.w3.org/2002/07/owl#\" >" +
     		"		<!ENTITY xsd  \"http://www.w3.org/2001/XMLSchema#\" >" +
     		"]>" +
			"<rdf:RDF" +
			"	xmlns     = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xmlns:vin = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xml:base  = \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#\"" +
			"	xmlns:food= \"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#\"" +
			"	xmlns:owl = \"http://www.w3.org/2002/07/owl#\"" +
			"	xmlns:rdf = \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"" +
			"	xmlns:rdfs= \"http://www.w3.org/2000/01/rdf-schema#\"" +
			"	xmlns:xsd = \"http://www.w3.org/2001/XMLSchema#\">" +
			"" +
			"	<owl:Ontology rdf:about=\"\">" +
			"		<rdfs:comment>An example OWL ontology</rdfs:comment>" +
			" 		<owl:priorVersion>" +
			"			<owl:Ontology rdf:about=\"http://www.w3.org/TR/2003/CR-owl-guide-20030818/wine\"/>" +
			"		</owl:priorVersion>" +
			"		<owl:imports rdf:resource=\"http://www.w3.org/TR/2003/PR-owl-guide-20031209/food\"/>" +
			"		<rdfs:comment>Derived from the DAML Wine ontology at " +
			"			http://ontolingua.stanford.edu/doc/chimaera/ontologies/wines.daml" +
			"			Substantially changed, in particular the Region based relations." +
			"		</rdfs:comment>" +
			"		<rdfs:label>Wine Ontology</rdfs:label>" +
			"	</owl:Ontology>" +
			"</rdf:RDF>", "talis", function(err, rdfjson){
		jsunit.assertNotNull("The generated Talis RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The Talis RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertFileIntoRDFJSON(){
	rdf2json.convertFileIntoRDFJSON("../wine.rdf", "talis", function(err, rdfjson){
		jsunit.assertNotNull("The generated Talis RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The Talis RDF/JSON object should not be null", jsonobj);
	});
}

function testConvertURLIntoRDFJSON(){
	rdf2json.convertURLIntoRDFJSON("http://www.w3.org/TR/owl-guide/wine.rdf", "talis", function(err, rdfjson){
		jsunit.assertNotNull("The generated Talis RDF/JSON string should not be null", rdfjson);
		var jsonobj = eval("("+ rdfjson +")");
		jsunit.assertNotNull("The Talis RDF/JSON object should not be null", jsonobj);
	});
}