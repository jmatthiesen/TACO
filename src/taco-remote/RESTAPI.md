﻿# REST API
Refer to test/selftest.js for a working example of how a client interacts with the server from build submission all the way through to downloading and deleting a completed build.
The following URL's assume server is running on localhost port 3000, mounted in remotebuild at path mountLocation

## POST http://localhost:3000/mountLocation/build/tasks?vcordova=&lt;cordova_version_of_app&gt;&cfg=&lt;build_configuration&gt;&command=&lt;build_command>

Submits a new build task. Request data is the Cordova app to be built, archived and compressed in .tgz format.

Request parameters:

* command - the build command to execute. Currently, only build is supported. Will support emulate later.
* vcordova - the version of cordova the app is based on. If this is incompatible with the server's version the build will be rejected.
* cfg - the build configuration, debug|release

Response is JSON format with build information including the unique 'buildNumber' of the build

### GET http://localhost:3000/mountLocation/build/tasks/&lt;buildNumber>
Returns JSON format information about the &lt;buildNumber&gt;, includes it's status. Used by client for polling on completion of build.

### GET http://localhost:3000/mountLocation/build/&lt;buildNumber>
Returns JSON format information about the &lt;buildNumber&gt;, includes it's status.

### GET http://localhost:3000/mountLocation/build/&lt;buildNumber&gt;/download
Downloads build results back through the response in zip format, includes the signed .ipa file and an enterprise (Intune-ready) .plist file

### GET http://localhost:3000/mountLocation/build/tasks
Returns JSON format information about all builds known to the build server, the current build, and any queued-up builds.

### GET http://localhost:3000/mountLocation/build/tasks/&lt;buildNumber&gt;/log?offset=&lt;offset>
Returns plain text response with the build log for the &lt;buildNumber&gt;. If log is no longer available, an empty response. If offset is specified, then returns the log starting at the specified byte

### GET http://localhost:3000/mountLocation/build/&lt;buildNumber&gt;/emulate
Emulates the &lt;buildNumber&gt; and returns JSON format information with updated status.

### GET http://localhost:3000/mountLocation/build/&lt;buildNumber&gt;/deploy
Deploys the &lt;buildNumber&gt; to an attached device and returns JSON format information with updated status.

### GET http://localhost:3000/mountLocation/build/&lt;buildNumber&gt;/run
Launches the &lt;buildNumber&gt; on an attached device and returns JSON format information with updated status.

### GET http://localhost:3000/mountLocation/build/&lt;buildNumber&gt;/debug
Prepares the debugger for &lt;buildNumber&gt; and returns JSON format information with updated status.

### Example JSON format for a single build
<pre>
{
  "buildNumber": 73586,
  "status": "downloaded",
  "message": "Build completed and downloaded.",
  "cordovaVersion": "4.1.2",
  "buildCommand": "build",
  "configuration": "release",
  "options": "--device",
  "buildDir": "/Users/joel/build_server/pauldev/builds/73586",
  "submissionTime": "2014-04-22T20:32:22.701Z",
  "tgzFilePath": "/Users/joel/build_server/pauldev/builds/73586/upload_73586.tgz",
  "statusTime": "2014-04-22T20:32:45.267Z",
  "appDir": "/Users/joel/build_server/pauldev/builds/73586/cordovaApp",
  "appName": "HelloCordova"
}
</pre>
