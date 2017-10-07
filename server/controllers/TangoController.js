const request = require('request');

var open = {
    url: 'http://localhost:3000/open/test/courselab/',
    method: 'GET'
}

export function openTango(req, res) {
    request(open, function (error, response, body) {
        res.send(JSON.parse(body));
    });
}

var upload = {
    url: 'http://localhost:3000/upload/test/courselab/',
    method: 'POST'
}

export function uploadTango(req, res) {
    request(upload, function(err,response,body){
        console.log("Got here!");
        res.send(body)
    })
}