/*var Client = require('node-rest-client').Client;
 
var client = new Client();
 
client.registerMethod("jsonMethod", "https://api.github.com/repos/sebastinnaveen/Ashraf-Devops", "GET");
 
var req2 = client.methods.jsonMethod(function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});*/

var https = require('https')
var optionsget = {
    host : 'api.github.com', // here only the domain name
    // (no http/https !)
    port : 443,
    path : '/repos/sebastinnaveen/Ashraf-Devops', // the rest of the url with parameters if needed
    method : 'GET',
	headers: {
    'User-Agent': 'request'
  }
	// do GET
};
 
console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');
 
// do the GET request
var reqGet = https.request(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);
 
 
    res.on('data', function(d) {
        console.info('GET result:\n');
        //process.stdout.write(d);
		console.log(d);
        console.info('\n\nCall completed');
    });
 
});
 
reqGet.end();
reqGet.on('error', function(e) {
    console.error(e);
});