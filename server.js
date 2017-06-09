const express = require("express");
const app = express();
const ffmpeg = require("ffmpeg.js");
console.log('hi')


var fs = require("fs");
var testData = new Uint8Array(fs.readFileSync("test.webm"));
// Encode test video to VP8. 
var result = ffmpeg({
  MEMFS: [{name: "test.webm", data: testData}],
   arguments: ["-i", "test.webm", "-c:v", "libvpx", "-an", "out.webm"],
//    arguments: ["-i", "video.mp4", "-c:v", "libvpx", "-an", "video.avi"],
// arguments: ["-i", "video.mp4", "video.avi"],

  // Ignore stdin read requests. 
  stdin: function() {},
});
// Write out.webm to disk. 
var out = result.MEMFS[0];
fs.writeFileSync(out.name, Buffer(out.data));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});