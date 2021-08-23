const dotenv = require('dotenv');
dotenv.config();

const textApi = {
    application_key: process.env.API_KEY
};


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')
const http = require('http');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/test', bodyParser.json(), function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/analysis',bodyParser.json(), function (req, res) {
    console.log(req.body)
    analyse(req.body.url, res);
   
})

function analyse(link, res) {
               
    let path = "/sentiment-2.1?key=" + textApi.application_key + "&of=json&url=" + link + "&lang=en";
    console.log(path);

    var options = {
        host: "api.meaningcloud.com",
        path: path,
        method: 'POST'
    };

    callback = function(response) {
        let dataStream = '';

        //another stream of data has been received, so append it to `dataStream`
        response.on('data', function (stream) {
            dataStream += stream;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            // here response from meaningcloud
            res.send(dataStream)
        });
    }

    http.request(options, callback).end();
}