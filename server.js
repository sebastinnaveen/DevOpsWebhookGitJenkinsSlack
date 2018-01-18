var express = require('express');
var bodyParser = require('body-parser');
var Slack = require('slack-node');
var jenkinsapi = require('jenkins-api');
 
 

// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', function(req, res){
console.log("Get testing");
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.post('/reviewgithubhook/',function(req,res,next){

console.log("Post hook",req);
	 var sys  = require('util'),
        exec = require('child_process').exec,
        child;

    child = exec('sh gitscript.sh', function (error, stdout, stderr) 
    {
        if (error) // There was an error executing our script
        {
            return next(error);
        }

        return res.status(200).send(stdout); // Show output in this case the success message
    });

console.log("Posted to reviewhook");

});

app.post('/slack/',function(req,res,next){

console.log("Post hook from slack");

console.log("req from slack",req)

//  Jenkins trigger 
	TriggerJenkins()

//Send message back to slack
	SendSlackMessage();

});

function SendSlackMessage()
{
	webhookUri = "https://hooks.slack.com/services/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";
 
slack = new Slack();
slack.setWebhook(webhookUri);
 
slack.webhook({
  channel: "#qa-approval",
  username: "webhookbot",
  text: "Prod Pipeline started !!! Thank you."
}, function(err, response) {
  console.log(response);
});

console.log("Posted back to slack");

}

function TriggerJenkins()
{
	var jenkins = jenkinsapi.init("http://sizzlers-devops.dlinkddns.com:8080/");

	jenkins.build('jenkins.test',{token: 'uat'}, function(err, data) {
	 if (err){ 
		  return console.log(err); }
		console.log(data)
});

}

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});



 