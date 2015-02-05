/// <reference path="../../typings/taco-utils.d.ts" />
/// <reference path="../../typings/node.d.ts" />

import tacoUtility = require("taco-utils");
import cordovaCommand = require("./cordova");

class Create extends cordovaCommand{
    run() {
        console.log("Create!!!");
        console.log("args:  " + this.info.args.length);
        console.log("options:  " + this.info.args.length);
        super.run();
    }
}

export = Create;