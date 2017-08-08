var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    request.post('http://23.97.209.121:3000/_api/data/items', {form:{body: session.message.text, source:'Email', tags:'Best', from:'mail test'}}, function (err, httpResponse, body) 
    {
        console.log(err, httpResponse, body)
    })
    session.send("You said: %s", session.message.text);
});