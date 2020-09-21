/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const {HelloRequest, HelloReply} = require('./helloworld_pb.js');
const {GreeterClient} = require('./helloworld_grpc_web_pb.js');

var url = 'https://grpc-hello.g.rochacon.me';
var client = new GreeterClient(url, null, null);
console.log("connecting to "+ url);

setInterval(function() {
  var output = document.querySelector("body>pre>code");
  var request = new HelloRequest();
  request.setName('grpc-web');
  client.sayHello(request, {}, (err, response) => {
    if (err) {
      output.innerText += (`unexpected error for sayHello: code = ${err.code} message = "${err.message}"`);
    } else {
      var now = new Date().toISOString();
      output.innerText += (now +": "+ response.getMessage());
    }
    output.innerText += "\n";
  });
}, 1000);
