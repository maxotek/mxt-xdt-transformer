"use strict";

var fs = require("fs");
var program = require("commander");
var logger = require("mx-color-logger");
var T = require("xdt-transform");

logger.init();

var packageFile = "./package.json";

if (!fs.existsSync(packageFile)) {
    console.error("package.json missing");
    process.exit(-1);
}

var pkg = JSON.parse(fs.readFileSync(packageFile));
var version = pkg.version;

program
    .version(version)
    .option("-s, --source <value>", "The source XML file to transform")
    .option("-t, --transform <value>", "The transform XML file")
    .option("-d, --destination <value>", "The destination XML file")
    .parse(process.argv);

console.info("Maxotek XDT Transformer v " + version);

var source = program.source;
var transform = program.transform;
var destination = program.destination;

if (!source) {
    console.error("Source XML was not specified");
    program.outputHelp();
    process.exit(-3);
}

if (!transform) {
    console.error("Transform XML was not specified");
    program.outputHelp();
    process.exit(-3);
}

if (!destination) {
    console.error("Destination XML was not specified");
    program.outputHelp();
    process.exit(-3);
}

console.info("Transforming " + source + " via " + transform);

var transformer = new T();
transformer.transform(source, transform, destination);

console.info("Saved to: " + destination);